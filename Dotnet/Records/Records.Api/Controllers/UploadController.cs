using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Records.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;

        public UploadController(IAmazonS3 s3Client)
        {
            _s3Client = s3Client;
        }
        

        private static string RemoveInvisibleChars(string input)
        {
            // Remove common invisible Unicode characters (like RLM, LRM)
            return new string(input.Where(c =>
                c != '\u200E' && // LRM
                c != '\u200F' && // RLM
                c != '\u202A' && // LRE
                c != '\u202B' && // RLE
                c != '\u202C' && // PDF
                c != '\u202D' && // LRO
                c != '\u202E'    // RLO
            ).ToArray());
        }
        [HttpGet("presigned-url-up")]
        public async Task<IActionResult> GetPresignedUrlUp([FromQuery] string fileName, [FromQuery] string fileType)
        {

            //string contentType = fileType.ToLower() switch
            //{
            //    "mp3" => "audio/mpeg",
            //    "txt" => "text/plain",
            //    _ => throw new ArgumentException("Unsupported file type")
            //};
            fileName = RemoveInvisibleChars(fileName);
            var request = new GetPreSignedUrlRequest
            {
                BucketName = "my-first-records-bucket.testpnoren",
                Key = fileName,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(5),
                ContentType = fileType
            };

            string url = await _s3Client.GetPreSignedURLAsync(request);
            return Ok(new { url });
        }
        [HttpGet("presigned-url-down")]
        public async Task<IActionResult> GetPresignedUrlDown(string fileName)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = "my-first-records-bucket.testpnoren",
                Key = fileName,
                Verb=HttpVerb.GET,
                Expires = DateTime.UtcNow.AddMinutes(15) // URL valid for 15 minutes
            };

            string url = await _s3Client.GetPreSignedURLAsync(request);
            return Ok(new { url });
        }
    }
}
