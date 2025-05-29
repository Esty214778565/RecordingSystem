using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Records.Core.Iservices
{
    public interface ITranscriptionService
    {
        Task<(string vttKey, string textKey, string text)> TranscribeFromS3Async(string s3Url, int recordId);
    }
}
