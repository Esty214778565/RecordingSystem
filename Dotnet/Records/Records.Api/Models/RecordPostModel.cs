using Records.Core.Entities;

namespace Records.Api.Models
{
    public class RecordPostModel
    {
        public string FileName { get; set; }
        public string Description { get; set; }
        //public string FileUrl { get; set; }
        public string S3Key { get; set; }
        public string FileType { get; set; }
        public double Size { get; set; }
        public int FolderId { get; set; }
        public List<QuestionPostModel> Questions { get; set; }


        public class QuestionPostModel
        {
            public string Text { get; set; }

            public List<AnswerPostModel> Answers { get; set; } = new();
        }

        public class AnswerPostModel
        {
            public string Text { get; set; }
        }

    }
}
