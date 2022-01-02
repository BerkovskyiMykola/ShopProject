using ShopProject.Services.Authorization.Models;

namespace ShopProject.Sevices.Authorization
{
    public interface IJwtService
    {
        public string GetToken(JwtUser user);
    }
}
