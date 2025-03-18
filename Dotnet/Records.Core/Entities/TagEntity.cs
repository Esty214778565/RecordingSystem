using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Records.Core.Entities
{
    public class TagEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }//קשר בין תגיות להקלטות עם מפתח זר
        public List<RecordEntity> Records { get; set; }
    }
}
