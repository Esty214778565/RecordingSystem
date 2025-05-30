

//using Amazon.S3.Model;
//using Amazon.S3;
//using Humanizer;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using System.Net.Http.Headers;
//using System.Text;
//using System.Text.Json.Nodes;

//namespace Records.Api.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class OpenAIController : ControllerBase
//    {
//        private readonly HttpClient _httpClient;

//        public OpenAIController(HttpClient httpClient)
//        {
//            _httpClient = httpClient;
//            _httpClient.BaseAddress = new Uri("https://api.openai.com/v1/");
//        }
//        //without write to a file
//        [HttpPost("transcribe")]
//        public async Task<IActionResult> Transcribe(IFormFile file)
//        {
//            if (file == null || file.Length == 0)
//            {
//                return BadRequest("No file uploaded.");
//            }

//            string apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
//            if (string.IsNullOrEmpty(apiKey))
//            {
//                return StatusCode(500, "API key is not configured.");
//            }

//            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

//            try
//            {
//                // Prepare the request for the Whisper model  
//                using var content = new MultipartFormDataContent();
//                using var fileStream = file.OpenReadStream();
//                var fileContent = new StreamContent(fileStream);
//                fileContent.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);
//                content.Add(fileContent, "file", file.FileName);
//                content.Add(new StringContent("whisper-1"), "model");

//                // Call the Whisper API  
//                var response = await _httpClient.PostAsync("audio/transcriptions", content);

//                if (!response.IsSuccessStatusCode)
//                {
//                    var error = await response.Content.ReadAsStringAsync();
//                    return StatusCode((int)response.StatusCode, error);
//                }

//                // Parse the transcription result  
//                var transcriptionResult = await response.Content.ReadAsStringAsync();

//                return Ok(new { Transcription = transcriptionResult });
//            }
//            catch (Exception ex)
//            {
//                // Consider using a logging framework here  
//                return StatusCode(500, $"Internal server error: {ex.Message}");
//            }
//        }

//        [HttpPost("transcribe-from-s3")]
//    public async Task<IActionResult> TranscribeFromS3([FromQuery] string s3Url, [FromQuery] int recordId)
//    {
//        try
//        {
//            var (vttKey, textKey, text) = await _transcriptionService.TranscribeFromS3Async(s3Url, recordId);

//            return Ok(new
//            {
//                Message = "Transcription uploaded and record updated.",
//                TranscriptionVttKey = vttKey,
//                TranscriptionTextKey = textKey,
//                Text = text
//            });
//        }
//        catch (ArgumentException ex)
//        {
//            return BadRequest(ex.Message);
//        }
//        catch (Exception ex)
//        {
//            return StatusCode(500, ex.Message);
//        }
//    }




//    }

//}


using Amazon.S3.Model;
using Amazon.S3;
using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json.Nodes;
using Records.Core.Iservices;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace Records.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize]
    public class TranscriptionController : ControllerBase
    {
        private readonly ITranscriptionService _transcriptionService;

        public TranscriptionController(ITranscriptionService transcriptionService)
        {
            _transcriptionService = transcriptionService;
        }

        public class TranscribeRequest
        {
            public string S3Url { get; set; }
        }

        [HttpPost("transcribe/{id}")]
        public async Task<IActionResult> TranscribeFromS3(int id, [FromBody] TranscribeRequest request)
        {
            string s3Url = request.S3Url;
            int recordId = id;
            try
            {
                //s3Url = "https://s3.amazonaws.com/my-first-records-bucket.testpnoren/%D7%9C%D7%97%D7%92%20%D7%94%D7%A9%D7%91%D7%95%D7%A2%D7%95%D7%AA.mp4";
                var uriFile = new Uri(s3Url);
                string fileKey = Path.GetFileName(uriFile.AbsolutePath);
                var encodedFileName = Uri.EscapeDataString(fileKey); // מקודד כמו שצריך
                s3Url = $"https://s3.amazonaws.com/my-first-records-bucket.testpnoren/{encodedFileName}";

                //var uriFile = new Uri(s3Url);
                //string decodedFileKey = WebUtility.UrlDecode(Path.GetFileName(uriFile.AbsolutePath));
                //string encodedFileName = Uri.EscapeDataString(decodedFileKey); // קידוד רק פעם אחת
                //s3Url = $"https://s3.amazonaws.com/my-first-records-bucket.testpnoren/{encodedFileName}";

                var (vttKey, textKey, text) = await _transcriptionService.TranscribeFromS3Async(s3Url, recordId);

                return Ok(new
                {
                    TranscriptionVttKey = vttKey,
                    TranscriptionTextKey = textKey
                    //text
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //[HttpGet("proxy-vtt")]
        //public async Task<IActionResult> ProxyVttFile([FromQuery] string url)
        //{
        //    if (string.IsNullOrEmpty(url) || !Uri.IsWellFormedUriString(url, UriKind.Absolute))
        //        return BadRequest("Invalid URL");

        //    using var client = new HttpClient();
        //    try
        //    {

        //        var uriFile = new Uri(url);
        //        string fileKey = Path.GetFileName(uriFile.AbsolutePath);
        //        var encodedFileName = Uri.EscapeDataString(fileKey); // מקודד כמו שצריך
        //        url = $"https://s3.us-east-1.amazonaws.com/my-first-records-bucket.testpnoren/transcriptions/{encodedFileName}";



        //        var response = await client.GetAsync(url);
        //        if (!response.IsSuccessStatusCode)
        //            return NotFound("File not found");

        //        var content = await response.Content.ReadAsStreamAsync();
        //        return File(content, "text/vtt; charset=utf-8");
        //    }
        //    catch
        //    {
        //        return StatusCode(500, "Failed to proxy file");
        //    }
        //}

        [HttpGet("vtt/{filename}")]
        public async Task<IActionResult> GetVttFile(string filename)
        {


            if (string.IsNullOrWhiteSpace(filename))
                return BadRequest("Missing file name");

            var url = "https://s3.amazonaws.com/my-first-records-bucket.testpnoren/transcriptions/"+filename;



            using var client = new HttpClient();
            client.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0");
            try
            {
                var response = await client.GetAsync(url);
            //    var response = await client.GetAsync(url);
            //    if (!response.IsSuccessStatusCode)
            //        return NotFound("File not found");

            var content = await response.Content.ReadAsStreamAsync();
            return File(content, "text/vtt");
            }
            catch
            {
                return StatusCode(500, "Failed to load file");
            }
        }
    }


}

