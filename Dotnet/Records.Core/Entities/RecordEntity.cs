using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Records.Core.Entities
{
    public class RecordEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public UserEntity User { get; set; }//for foreign key
        public string FileName { get; set; }
        public string S3Key { get; set; }
        public string FileType { get; set; }
        public double size { get; set; }
        public bool IsDeleted { get; set; }//not must
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public List<TagEntity> Tags { get; set; }
     


    }
}
