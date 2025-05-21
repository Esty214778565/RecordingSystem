using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

        public List<Question>? Questions { get; set; }
    }

    public class Question
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int RecordEntityId { get; set; }
        public RecordEntity? Record { get; set; }

        // Normalize the Answers property into a separate entity  
        public List<Answer> Answers { get; set; }
    }

    public class Answer
    {
        [Key]
        public int Id { get; set; }
        public string Text { get; set; }

        // Foreign key to Question  
        public int? QuestionId { get; set; }
        public Question? Question { get; set; }
    }
}
