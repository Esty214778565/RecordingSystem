//using AutoMapper;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Http.HttpResults;
//using Microsoft.AspNetCore.Mvc;
//using Records.Api.Models;
//using Records.Core.DTOs;
//using Records.Core.Entities;
//using Records.Core.Iservices;
//using Records.Service;
//using System.Net.Http.Headers;
//using System.Text.Json;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace Records.Api.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    [Authorize]
//    public class TranscriptionController : ControllerBase
//    {
//        private readonly HttpClient _httpClient;

//        public TranscriptionController(IHttpClientFactory httpClientFactory)
//        {
//            _httpClient = httpClientFactory.CreateClient();
//        }

//        // POST: api/transcription
//        [HttpPost]
//        [Route("transcribe")]
//        public async Task<IActionResult> Transcribe([FromForm] TranscriptionRequest request)
//        {
//            if (request.AudioFile == null || request.AudioFile.Length == 0)
//            {
//                return BadRequest("Audio file is required.");
//            }

//            // Validate file type (only allow MP3)
//            if (Path.GetExtension(request.AudioFile.FileName).ToLower() != ".mp3")
//            {
//                return BadRequest("Only MP3 files are supported.");
//            }

//            try
//            {
//                // Save the uploaded audio file temporarily
//                var tempFilePath = Path.GetTempFileName();
//                using (var stream = new FileStream(tempFilePath, FileMode.Create))
//                {
//                    await request.AudioFile.CopyToAsync(stream);
//                }

//                // Call OpenAI Whisper API for transcription
//                string transcription = await CallOpenAIWhisper(tempFilePath);

//                // Delete the temporary file
//                if (System.IO.File.Exists(tempFilePath))
//                {
//                    System.IO.File.Delete(tempFilePath);
//                }

//                // Return the transcription result
//                return Ok(new { transcription });
//            }
//            catch (System.Exception ex)
//            {
//                return StatusCode(500, $"Internal server error: {ex.Message}");
//            }
//        }

//        private async Task<string> CallOpenAIWhisper(string audioFilePath)
//        {
//             string apiUrl = "https://api.openai.com/v1/audio/transcriptions";

//            // Retrieve the API key at runtime instead of declaring it as a constant  
//            string apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
//            if (string.IsNullOrEmpty(apiKey))
//            {
//                throw new InvalidOperationException("OpenAI API key is not set in the environment variables.");
//            }

//            // Prepare the HTTP request  
//            using (var form = new MultipartFormDataContent())
//            {
//                // Add the audio file  
//                var fileStream = new FileStream(audioFilePath, FileMode.Open, FileAccess.Read);
//                var fileContent = new StreamContent(fileStream);
//                fileContent.Headers.ContentType = new MediaTypeHeaderValue("audio/mpeg");
//                form.Add(fileContent, "file", Path.GetFileName(audioFilePath));

//                // Add the model parameter (OpenAI Whisper model)  
//                form.Add(new StringContent("whisper-1"), "model");

//                // Set up the HTTP client  
//                var request = new HttpRequestMessage(HttpMethod.Post, apiUrl)
//                {
//                    Content = form
//                };
//                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

//                // Send the request and process the response  
//                var response = await _httpClient.SendAsync(request);
//                if (!response.IsSuccessStatusCode)
//                {
//                    var errorResponse = await response.Content.ReadAsStringAsync();
//                    throw new System.Exception($"OpenAI API error: {errorResponse}");
//                }

//                var jsonResponse = await response.Content.ReadAsStringAsync();
//                var transcriptionResult = JsonSerializer.Deserialize<OpenAITranscriptionResponse>(jsonResponse);
//                return transcriptionResult?.Text ?? "Transcription failed.";
//            }
//        }
//    }

//    public class TranscriptionRequest
//    {
//        public IFormFile AudioFile { get; set; }
//    }

//    public class OpenAITranscriptionResponse
//    {
//        public string Text { get; set; }
//    }
//}

