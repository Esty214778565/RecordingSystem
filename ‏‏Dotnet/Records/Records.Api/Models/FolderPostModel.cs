using Records.Core.Entities;

namespace Records.Api.Models
{
    public class FolderPostModel
    {
        public string Name { get; set; }//קשר בין תגיות להקלטות עם מפתח זר
        public int? ParentFolderId { get; set; }
        public int UserId { get; set; }
    }
}
