using Records.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Records.Core.DTOs
{
    public class TagDto
    {
        public int Id { get; set; }
        public string Name { get; set; }//קשר בין תגיות להקלטות עם מפתח זר
        public List<RecordEntity> Records { get; set; }
    }
}
