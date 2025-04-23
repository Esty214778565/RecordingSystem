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
        //public int UserId { get; set; }
        //public UserEntity User { get; set; }//for foreign key
        public int FolderId { get; set; }
        public FolderEntity Folder { get; set; }//folder in folder list of records
        public string FileName { get; set; }
        public string Description { get; set; }
        public string S3Key { get; set; }
        public string FileType { get; set; }
        public double Size { get; set; }
        public bool IsDeleted { get; set; }//not must
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        //public List<FolderEntity> Folders { get; set; }
    }
}
