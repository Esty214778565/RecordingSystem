

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

namespace Records.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TranscriptionController : ControllerBase
    {
        private readonly ITranscriptionService _transcriptionService;

        public TranscriptionController(ITranscriptionService transcriptionService)
        {
            _transcriptionService = transcriptionService;
        }

        [HttpPost("transcribe")]
        public async Task<IActionResult> TranscribeFromS3([FromQuery] string s3Url, [FromQuery] int recordId)
        {
            try
            {
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
    }


}

