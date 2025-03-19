using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TiendaKeytlin.Server.Models;

namespace TiendaKeytlin.Server.Services
{
    public class JwtService
    {
        private readonly IConfiguration _configuration;

        public JwtService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public LoginResponse GenerateToken(User user)
        {
            // Obtener la clave secreta desde la configuración
            var secretKey = _configuration["JWT:SecretKey"] ?? throw new InvalidOperationException("JWT:SecretKey no está configurado");
            var key = Encoding.ASCII.GetBytes(secretKey);

            // Configurar los claims para el token
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim("FullName", user.Name)
            };

            // Configurar el token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(24), // El token expira en 24 horas
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return new LoginResponse
            {
                Token = tokenString,
                Expiration = tokenDescriptor.Expires.Value,
                Name = user.Name,
                UserId = user.Id
            };
        }
    }
}