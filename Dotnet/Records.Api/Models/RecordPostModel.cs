using Records.Core.Entities;

namespace Records.Api.Models
{
    public class RecordPostModel
    {
        public int UserId { get; set; }
        //public UserEntity User { get; set; }//for foreign key
        public string FileName { get; set; }
        public string FileUrl { get; set; }
        public string S3Key { get; set; }
        public string FileType { get; set; }
        public double size { get; set; }
        //public DateTime CreateDate { get; set; }
        //public DateTime UpdateDate { get; set; }
        //public List<TagEntity> Tags { get; set; }
        //check
    }
}
