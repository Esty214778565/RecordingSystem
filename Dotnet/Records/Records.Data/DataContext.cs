using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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
        private readonly IConfiguration _configuration;

        public DataContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public DbSet<UserEntity> Users { get; set; }
        public DbSet<RecordEntity> Records { get; set; }
        public DbSet<FolderEntity> Folders { get; set; }

        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            // Retrieve the connection string from the environment variable
            var connectionString = Environment.GetEnvironmentVariable("DBRECORDS") +
                          ";Pooling=true;MaximumPoolSize=3;ConnectionIdleTimeout=30;";

            // Check if the connection string is null or empty
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException("Connection string not found in environment variables.");
            }

            // Use the connection string from the environment variable
            optionsBuilder.UseMySql(connectionString,

                ServerVersion.AutoDetect(connectionString));

            optionsBuilder.LogTo(Message => Debug.WriteLine(Message));
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure FolderEntity
            modelBuilder.Entity<FolderEntity>()
                .HasKey(f => f.Id);

            modelBuilder.Entity<FolderEntity>()
                .HasMany(f => f.Records)
                .WithOne()
                .HasForeignKey(r => r.FolderId)
                .OnDelete(DeleteBehavior.Cascade); // If a folder is deleted, delete the records in it

            modelBuilder.Entity<FolderEntity>()
                .HasOne(f => f.ParentFolder)
                .WithMany()
                .HasForeignKey(f => f.ParentFolderId)
                .OnDelete(DeleteBehavior.SetNull); // Allow null ParentFolderId

            modelBuilder.Entity<FolderEntity>()
                .HasOne(f => f.User)
                .WithMany(u => u.Folders)
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.SetNull); // Allow null UserId

            // Configure RecordEntity
            modelBuilder.Entity<RecordEntity>()
                .HasKey(r => r.Id);

            //modelBuilder.Entity<RecordEntity>()
            //    .HasOne<FolderEntity>() // Assuming each record belongs to one folder
            //    .WithMany(f => f.Records)
            //    .HasForeignKey(r => r.FolderId)
            //    .OnDelete(DeleteBehavior.Cascade); // If a folder is deleted, delete its records
            modelBuilder.Entity<RecordEntity>()
    .HasOne(r => r.Folder)
    .WithMany(f => f.Records)
    .HasForeignKey(r => r.FolderId)
    .OnDelete(DeleteBehavior.Cascade);
            // Configure UserEntity
            modelBuilder.Entity<UserEntity>()
                .HasKey(u => u.Id);

            modelBuilder.Entity<UserEntity>()
                .HasMany(u => u.Folders)
                .WithOne(f => f.User)
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.SetNull); // Allow null UserId
            modelBuilder.Entity<Question>()
    .HasOne(q => q.Record)
    .WithMany(r => r.Questions)
    .HasForeignKey(q => q.RecordEntityId)
    .OnDelete(DeleteBehavior.Cascade);
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
