
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Newtonsoft.Json;
//using System.Net.Http;
//using System.Text;
//using System.Threading.Tasks;

//namespace Records.Api.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class OpenAIController : ControllerBase
//    {
//        private readonly string OpenAI_API_URL = "https://api.openai.com/v1/completions"; // Using GPT model (text-davinci-003)
//        private readonly string OpenAI_API_KEY = Environment.GetEnvironmentVariable("OPENAI_API_KEY"); // Replace with your OpenAI API key

//        [HttpPost("transcribe")]
//        public async Task<IActionResult> Transcribe(IFormFile file)
//        {
//            if (file == null || file.Length == 0)
//            {
//                return BadRequest("No file uploaded.");
//            }

//            // Here, you'd convert the file to text using an external transcription service or process it manually

//            // Dummy transcription text (replace with actual transcription logic)
//            var transcribedText = "This is the transcribed text from the uploaded MP3 file.";

//            // Now we send the transcribed text to GPT model (text-davinci-003) for further processing, summarization, or anything else.
//            using var client = new HttpClient();
//            var requestPayload = new
//            {
//                model = "text-davinci-003",
//                prompt = $"Summarize the following text:\n\n{transcribedText}",
//                max_tokens = 100
//            };

//            var jsonPayload = JsonConvert.SerializeObject(requestPayload);
//            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

//            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {OpenAI_API_KEY}");

//            var response = await client.PostAsync(OpenAI_API_URL, content);

//            if (!response.IsSuccessStatusCode)
//            {
//                return StatusCode((int)response.StatusCode, "Error calling OpenAI API.");
//            }

//            var responseContent = await response.Content.ReadAsStringAsync();
//            var openAiResponse = JsonConvert.DeserializeObject<OpenAIResponse>(responseContent);

//            return Ok(new { SummarizedText = openAiResponse.Choices[0].Text });
//        }
//    }

//    public class OpenAIResponse
//    {
//        public Choice[] Choices { get; set; }
//    }

//    public class Choice
//    {
//        public string Text { get; set; }
//    }
//}
using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace Records.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpenAIController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public OpenAIController(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri("https://api.openai.com/v1/");
        }
        //without write to a file
        [HttpPost("transcribe")]
        public async Task<IActionResult> Transcribe(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            string apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
            if (string.IsNullOrEmpty(apiKey))
            {
                return StatusCode(500, "API key is not configured.");
            }

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            try
            {
                // Prepare the request for the Whisper model  
                using var content = new MultipartFormDataContent();
                using var fileStream = file.OpenReadStream();
                var fileContent = new StreamContent(fileStream);
                fileContent.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);
                content.Add(fileContent, "file", file.FileName);
                content.Add(new StringContent("whisper-1"), "model");

                // Call the Whisper API  
                var response = await _httpClient.PostAsync("audio/transcriptions", content);

                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    return StatusCode((int)response.StatusCode, error);
                }

                // Parse the transcription result  
                var transcriptionResult = await response.Content.ReadAsStringAsync();

                return Ok(new { Transcription = transcriptionResult });
            }
            catch (Exception ex)
            {
                // Consider using a logging framework here  
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        //try send to a file
        //[HttpPost("transcribe")]
        //public async Task<IActionResult> Transcribe(IFormFile file)
        //{
        //    if (file == null || file.Length == 0)
        //    {
        //        return BadRequest("No file uploaded.");
        //    }

        //    string apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
        //    if (string.IsNullOrEmpty(apiKey))
        //    {
        //        return StatusCode(500, "API key is not configured.");
        //    }

        //    _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

        //    try
        //    {
        //        // Prepare the request for the Whisper model  
        //        using var content = new MultipartFormDataContent();
        //        using var fileStream = file.OpenReadStream();
        //        var fileContent = new StreamContent(fileStream);
        //        fileContent.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);
        //        content.Add(fileContent, "file", file.FileName);
        //        content.Add(new StringContent("whisper-1"), "model");

        //        // Call the Whisper API  
        //        var response = await _httpClient.PostAsync("audio/transcriptions", content);

        //        if (!response.IsSuccessStatusCode)
        //        {
        //            var error = await response.Content.ReadAsStringAsync();
        //            return StatusCode((int)response.StatusCode, error);
        //        }

        //        // Parse the transcription result  
        //        var transcriptionResult = await response.Content.ReadAsStringAsync();

        //        // Save the transcription result to a temporary file  
        //        var tempFilePath = Path.Combine(Path.GetTempPath(), $"TranscriptionResult_{Guid.NewGuid()}.txt");
        //        await System.IO.File.WriteAllTextAsync(tempFilePath, transcriptionResult);

        //        // Get a pre-signed URL from the UploadController  
        //        var presignedUrl = Url.Action("GetPresignedUrlUp", "Upload", new { fileName = "TranscriptionResult.txt", fileType = "text/plain" }, Request.Scheme);
        //        if (string.IsNullOrEmpty(presignedUrl))
        //        {
        //            return StatusCode(500, "Failed to generate pre-signed URL.");
        //        }

        //        // Upload the file to the pre-signed URL  
        //        using var uploadClient = new HttpClient();
        //        using var fileStreamToUpload = System.IO.File.OpenRead(tempFilePath);
        //        var uploadContent = new StreamContent(fileStreamToUpload);
        //        uploadContent.Headers.ContentType = new MediaTypeHeaderValue("text/plain");

        //        var uploadResponse = await uploadClient.PutAsync(presignedUrl, uploadContent);
        //        if (!uploadResponse.IsSuccessStatusCode)
        //        {
        //            var error = await uploadResponse.Content.ReadAsStringAsync();
        //            return StatusCode((int)uploadResponse.StatusCode, $"Failed to upload file: {error}");
        //        }

        //        // Get file type and size  
        //        var fileInfo = new FileInfo(tempFilePath);
        //        var fileSize = fileInfo.Length;

        //        // Clean up the temporary file  
        //        System.IO.File.Delete(tempFilePath);

        //        return Ok(new { Message = "File uploaded successfully", PresignedUrl = presignedUrl, Size = fileSize });
        //    }
        //    catch (Exception ex)
        //    {
        //        // Consider using a logging framework here  
        //        return StatusCode(500, $"Internal server error: {ex.Message}");
        //    }
        //}



    }
    //public class OpenAIController : ControllerBase
    //{
    //    private readonly HttpClient _httpClient;

    //    public OpenAIController(HttpClient httpClient)
    //    {
    //        _httpClient = httpClient;
    //        _httpClient.BaseAddress = new Uri("https://api.openai.com/v1/");
    //    }

    //    [HttpPost("transcribe")]
    //    public async Task<IActionResult> Transcribe(IFormFile file)
    //    {
    //        if (file == null || file.Length == 0)
    //        {
    //            return BadRequest("No file uploaded.");
    //        }

    //        string apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
    //        if (string.IsNullOrEmpty(apiKey))
    //        {
    //            return StatusCode(500, "API key is not configured.");
    //        }

    //        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

    //        try
    //        {
    //            // Prepare the request for the Whisper model
    //            using var content = new MultipartFormDataContent();
    //            using var fileStream = file.OpenReadStream();
    //            var fileContent = new StreamContent(fileStream);
    //            fileContent.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);
    //            content.Add(fileContent, "file", file.FileName);
    //            content.Add(new StringContent("whisper-1"), "model");

    //            // Call the Whisper API
    //            var response = await _httpClient.PostAsync("audio/transcriptions", content);

    //            if (!response.IsSuccessStatusCode)
    //            {
    //                var error = await response.Content.ReadAsStringAsync();
    //                return StatusCode((int)response.StatusCode, error);
    //            }

    //            // Parse the transcription result
    //            var transcriptionResult = await response.Content.ReadAsStringAsync();

    //            //

    //            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "TranscriptionResult.txt");
    //            await System.IO.File.WriteAllTextAsync(filePath, transcriptionResult);
    //            return Ok(new { Transcription = transcriptionResult, FilePath = filePath });
    //            //  return Ok(new { Transcription = transcriptionResult });
    //        }
    //        catch (Exception ex)
    //        {
    //            // Consider using a logging framework here
    //            return StatusCode(500, $"Internal server error: {ex.Message}");
    //        }
    //    }
    //    //try send to a file
    //    //[HttpPost("transcribe")]
    //    //public async Task<IActionResult> Transcribe(IFormFile file)
    //    //{
    //    //    if (file == null || file.Length == 0)
    //    //    {
    //    //        return BadRequest("No file uploaded.");
    //    //    }

    //    //    string apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
    //    //    if (string.IsNullOrEmpty(apiKey))
    //    //    {
    //    //        return StatusCode(500, "API key is not configured.");
    //    //    }

    //    //    _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

    //    //    try
    //    //    {
    //    //        // Prepare the request for the Whisper model  
    //    //        using var content = new MultipartFormDataContent();
    //    //        using var fileStream = file.OpenReadStream();
    //    //        var fileContent = new StreamContent(fileStream);
    //    //        fileContent.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);
    //    //        content.Add(fileContent, "file", file.FileName);
    //    //        content.Add(new StringContent("whisper-1"), "model");

    //    //        // Call the Whisper API  
    //    //        var response = await _httpClient.PostAsync("audio/transcriptions", content);

    //    //        if (!response.IsSuccessStatusCode)
    //    //        {
    //    //            var error = await response.Content.ReadAsStringAsync();
    //    //            return StatusCode((int)response.StatusCode, error);
    //    //        }

    //    //        // Parse the transcription result  
    //    //        var transcriptionResult = await response.Content.ReadAsStringAsync();

    //    //        // Save the transcription result to a temporary file  
    //    //        var tempFilePath = Path.Combine(Path.GetTempPath(), $"TranscriptionResult_{Guid.NewGuid()}.txt");
    //    //        await System.IO.File.WriteAllTextAsync(tempFilePath, transcriptionResult);

    //    //        // Get a pre-signed URL from the UploadController  
    //    //        var presignedUrl = Url.Action("GetPresignedUrlUp", "Upload", new { fileName = "TranscriptionResult.txt", fileType = "text/plain" }, Request.Scheme);
    //    //        if (string.IsNullOrEmpty(presignedUrl))
    //    //        {
    //    //            return StatusCode(500, "Failed to generate pre-signed URL.");
    //    //        }

    //    //        // Upload the file to the pre-signed URL  
    //    //        using var uploadClient = new HttpClient();
    //    //        using var fileStreamToUpload = System.IO.File.OpenRead(tempFilePath);
    //    //        var uploadContent = new StreamContent(fileStreamToUpload);
    //    //        uploadContent.Headers.ContentType = new MediaTypeHeaderValue("text/plain");

    //    //        var uploadResponse = await uploadClient.PutAsync(presignedUrl, uploadContent);
    //    //        if (!uploadResponse.IsSuccessStatusCode)
    //    //        {
    //    //            var error = await uploadResponse.Content.ReadAsStringAsync();
    //    //            return StatusCode((int)uploadResponse.StatusCode, $"Failed to upload file: {error}");
    //    //        }

    //    //        // Get file type and size  
    //    //        var fileInfo = new FileInfo(tempFilePath);
    //    //        var fileSize = fileInfo.Length;

    //    //        // Clean up the temporary file  
    //    //        System.IO.File.Delete(tempFilePath);

    //    //        return Ok(new { Message = "File uploaded successfully", PresignedUrl = presignedUrl, Size = fileSize });
    //    //    }
    //    //    catch (Exception ex)
    //    //    {
    //    //        // Consider using a logging framework here  
    //    //        return StatusCode(500, $"Internal server error: {ex.Message}");
    //    //    }
    //    //}



    //}
}
