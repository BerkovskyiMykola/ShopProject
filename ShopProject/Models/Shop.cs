using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ShopProject.Models
{
    public class Shop
    {
        public int ShopId { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Name { set; get; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Address { set; get; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Type { set; get; }

        public int UserId { get; set; }
        public User User { get; set; }

        public List<ShopItem> ShopItems { get; set; } = new List<ShopItem>();
        public List<History> Histories { get; set; } = new List<History>();
    }
}
