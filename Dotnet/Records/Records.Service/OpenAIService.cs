using Amazon.S3.Model;
using Amazon.S3;
using Records.Core.Iservices;
using System.Net.Http.Headers;
using System.Text;
using Records.Core.IRepositories;

namespace Records.Service
{
    public class TranscriptionService : ITranscriptionService
    {
        private readonly ITranscriptionRepository _repository;
        private readonly HttpClient _httpClient;
        private readonly IAmazonS3 _s3Client;

        public TranscriptionService(ITranscriptionRepository repository, HttpClient httpClient, IAmazonS3 s3Client)
        {
            _repository = repository;
            _httpClient = httpClient;
            _s3Client = s3Client;
        }

        private (string contentType, string fileName) GetContentTypeAndFileName(string s3Url)
        {
            if (s3Url.EndsWith(".mp3", StringComparison.OrdinalIgnoreCase))
                return ("audio/mpeg", "audio.mp3");
            if (s3Url.EndsWith(".mp4", StringComparison.OrdinalIgnoreCase))
                return ("video/mp4", "video.mp4");

            throw new ArgumentException("Unsupported file type. Only .mp3 and .mp4 are supported.");
        }

        public async Task<(string vttKey, string textKey, string text)> TranscribeFromS3Async(string s3Url, int recordId)
        {
            if (string.IsNullOrEmpty(s3Url))
                throw new ArgumentException("S3 URL is required.");

            var apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
            if (string.IsNullOrEmpty(apiKey))
                throw new Exception("OpenAI API key is missing.");

            var record = await _repository.GetRecordByIdAsync(recordId);
            if (record == null)
                throw new ArgumentException($"Record with ID {recordId} not found.");

            byte[] fileBytes;
            using (var client = new HttpClient())
            {
               
                fileBytes = await client.GetByteArrayAsync(s3Url);
            }

            var (contentType, fileName) = GetContentTypeAndFileName(s3Url);

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            // === Request for VTT ===
            using var vttContent = new MultipartFormDataContent();
            var fileContentVtt = new ByteArrayContent(fileBytes);
            fileContentVtt.Headers.ContentType = new MediaTypeHeaderValue(contentType);
            vttContent.Add(fileContentVtt, "file", fileName);
            vttContent.Add(new StringContent("whisper-1"), "model");
            vttContent.Add(new StringContent("vtt"), "response_format");

            var vttResponse = await _httpClient.PostAsync("https://api.openai.com/v1/audio/transcriptions", vttContent);
            if (!vttResponse.IsSuccessStatusCode)
            {
                var error = await vttResponse.Content.ReadAsStringAsync();
                throw new Exception($"Whisper API VTT error: {error}");
            }
            var vttResult = await vttResponse.Content.ReadAsStringAsync();

            // === Request for Text ===
            using var textContent = new MultipartFormDataContent();
            var fileContentText = new ByteArrayContent(fileBytes);
            fileContentText.Headers.ContentType = new MediaTypeHeaderValue(contentType);
            textContent.Add(fileContentText, "file", fileName);
            textContent.Add(new StringContent("whisper-1"), "model");
            textContent.Add(new StringContent("text"), "response_format");

            var textResponse = await _httpClient.PostAsync("https://api.openai.com/v1/audio/transcriptions", textContent);
            if (!textResponse.IsSuccessStatusCode)
            {
                var error = await textResponse.Content.ReadAsStringAsync();
                throw new Exception($"Whisper API text error: {error}");
            }
            var textResult = await textResponse.Content.ReadAsStringAsync();

            // === Upload to S3 ===
            var s3BucketLink = "https://s3.us-east-1.amazonaws.com/my-first-records-bucket.testpnoren/";

            var transcriptionVttKey = $"{s3BucketLink}transcriptions/{Guid.NewGuid()}.vtt";



            var uriFile = new Uri(transcriptionVttKey);
            string fileKey = Path.GetFileName(uriFile.AbsolutePath);
            var encodedFileName = Uri.EscapeDataString(fileKey); // מקודד כמו שצריך
            transcriptionVttKey = encodedFileName;



            
            var transcriptionTextKey = $"{s3BucketLink}transcriptions/{Guid.NewGuid()}.txt";

            await _s3Client.PutObjectAsync(new PutObjectRequest
            {
                BucketName = "my-first-records-bucket.testpnoren",
                Key = transcriptionVttKey,
                InputStream = new MemoryStream(Encoding.UTF8.GetBytes(vttResult)),
                ContentType = "text/vtt"
            });

            await _s3Client.PutObjectAsync(new PutObjectRequest
            {
                BucketName = "my-first-records-bucket.testpnoren",
                Key = transcriptionTextKey,
                InputStream = new MemoryStream(Encoding.UTF8.GetBytes(textResult)),
                ContentType = "text/plain"
            });

            // === Update record ===
            record.TranscriptionS3Key = transcriptionVttKey;
            
            record.UpdateDate = DateTime.UtcNow;
            await _repository.UpdateRecordAsync(record);

            return (transcriptionVttKey, transcriptionTextKey, textResult);
        }
    }



}
