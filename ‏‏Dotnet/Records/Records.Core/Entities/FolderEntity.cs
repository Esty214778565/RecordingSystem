using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Records.Core.Entities
{
    public class FolderEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }//קשר בין תגיות להקלטות עם מפתח זר
        public int? ParentFolderId { get; set; }
        public FolderEntity ParentFolder { get; set; }
        public int? UserId { get; set; }
        public UserEntity User { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public bool IsDeleted { get; set; }
        public List<RecordEntity> Records { get; set; }
    }
}
