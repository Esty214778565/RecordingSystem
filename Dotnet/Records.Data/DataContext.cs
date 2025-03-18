using Humanizer;
using Microsoft.EntityFrameworkCore;
using Records.Core.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Records.Data
{
    public class DataContext : DbContext
    {
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<RecordEntity> Records { get; set; }
        public DbSet<TagEntity> Tags { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            //replace between the two connection strings
            // var connectionString = "server=b8jvuypcczfucowkes2u-mysql.services.clever-cloud.com;user=uqitu6fvq4ovwvks;password=3szKAbc6Bcm4woxsAye9;database=b8jvuypcczfucowkes2u";
            var connectionString = "";
            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
           
            // optionsBuilder.UseSqlServer("server=b8jvuypcczfucowkes2u-mysql.services.clever-cloud.com;user=uqitu6fvq4ovwvks;password=3szKAbc6Bcm4woxsAye9;database=b8jvuypcczfucowkes2u");
            optionsBuilder.LogTo(Message => Debug.WriteLine(Message));
        }
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    base.OnConfiguring(optionsBuilder);

        //    if (!optionsBuilder.IsConfigured)
        //    {
        //        optionsBuilder.UseSqlServer("server=b8jvuypcczfucowkes2u-mysql.services.clever-cloud.com;user=uqitu6fvq4ovwvks;password=3szKAbc6Bcm4woxsAye9;database=b8jvuypcczfucowkes2u");
        //    }

        //    optionsBuilder.LogTo(Message => Debug.WriteLine(Message));
        //}

    }
}
