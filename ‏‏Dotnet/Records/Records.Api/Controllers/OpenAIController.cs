using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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

        [HttpGet]
        public string Get()
        {
            string s = Environment.GetEnvironmentVariable("DBRECORDS");
            int y = 8;
            return s;
            

        }


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
                using var content = new MultipartFormDataContent();
                using var fileStream = file.OpenReadStream();
                var fileContent = new StreamContent(fileStream);
                fileContent.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);
                content.Add(fileContent, "file", file.FileName);
                content.Add(new StringContent("whisper-1"), "model");

                var response = await _httpClient.PostAsync("audio/transcriptions", content);

                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    return StatusCode((int)response.StatusCode, error);
                }

                var result = await response.Content.ReadAsStringAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Consider using a logging framework here
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }
        //[HttpPost("transcribe")]
        //public async Task<IActionResult> Transcribe()
        //{
        //    if (Request.Body == null || Request.ContentLength == 0)
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
        //        using var content = new MultipartFormDataContent();

        //        // Read the file from the request body stream
        //        using var fileStream = new MemoryStream();
        //        await Request.Body.CopyToAsync(fileStream);
        //        fileStream.Position = 0; // Reset the stream position to the beginning

        //        var fileContent = new StreamContent(fileStream);
        //        fileContent.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream"); // Adjust based on your needs
        //        content.Add(fileContent, "file", "uploadedFile"); // Use a default file name or extract from headers if available
        //        content.Add(new StringContent("whisper-1"), "model");

        //        var response = await _httpClient.PostAsync("audio/transcriptions", content);

        //        if (!response.IsSuccessStatusCode)
        //        {
        //            var error = await response.Content.ReadAsStringAsync();
        //            return StatusCode((int)response.StatusCode, error);
        //        }

        //        var result = await response.Content.ReadAsStringAsync();
        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Consider using a logging framework here
        //        return StatusCode(500, $"Internal server error: {ex.Message}");
        //    }
        //}



    }
}
