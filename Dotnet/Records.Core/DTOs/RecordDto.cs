using Records.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Records.Core.DTOs
{
    public class RecordDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public UserEntity User { get; set; }
        public string FileName { get; set; }//for foreign key
        public string FileType { get; set; }
        public string S3Key { get; set; }

        public double size { get; set; }
       
       
       // public bool IsDeleted { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public List<TagEntity> Tags { get; set; }
    }
}
