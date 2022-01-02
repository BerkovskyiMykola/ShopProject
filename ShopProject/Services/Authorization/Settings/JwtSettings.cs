﻿using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ShopProject.Services.Authorization.Settings
{
    public class JwtSettings
    {
        public const string ISSUER = "ShopProject";
        public const string AUDIENCE = "ShopProjectClient";
        private static readonly string KEY = RandomKey.CreateKey(30);
        public const int LIFETIME = 60;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
