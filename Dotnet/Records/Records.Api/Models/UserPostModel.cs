using Records.Core.Entities;

namespace Records.Api.Models
{
    public class UserPostModel
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        //public DateTime CreateDate { get; set; }
        //public DateTime UpdateDate { get; set; }
        //public List<RecordEntity> Records { get; set; }
        //check 
    }
}
