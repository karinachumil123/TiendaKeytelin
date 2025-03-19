using System.ComponentModel.DataAnnotations;

namespace TiendaKeytlin.Server.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage = "El nombre de usuario es requerido")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "La contraseña es requerida")]
        public string Password { get; set; } = string.Empty;
    }

    public class LoginResponse
    {
        public string Token { get; set; } = string.Empty;
        public DateTime Expiration { get; set; }
        public string Name { get; set; } = string.Empty;
        public int UserId { get; set; }
    }
}