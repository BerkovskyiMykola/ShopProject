using System.ComponentModel.DataAnnotations;

namespace ShopProject.Models.Request
{
    public class AuthenticateRequest
    {
        [Required]
        [EmailAddress]
        public string Email { set; get; }
        [Required]
        [StringLength(18, MinimumLength = 8)]
        public string Password { set; get; }
    }
}
