﻿using Microsoft.EntityFrameworkCore;

namespace ShopProject.Models
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Shop> Shops { get; set; }
        public DbSet<ShopItem> ShopItems { get; set; }
        public DbSet<History> Histories { get; set; }
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }
    }
}
