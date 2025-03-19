using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TiendaKeytlin.Server.Data;
using TiendaKeytlin.Server.Models;
using TiendaKeytlin.Server.Services;
using Microsoft.Extensions.Logging;

namespace TiendaKeytlin.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly JwtService _jwtService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(AppDbContext context, JwtService jwtService, ILogger<AuthController> logger)
        {
            _context = context;
            _jwtService = jwtService;
            _logger = logger;
        }

        // Endpoint para comprobar la conexión con la base de datos
        [HttpGet("check-db-connection")]
        public async Task<ActionResult<string>> CheckDbConnection()
        {
            try
            {
                _logger.LogInformation("Iniciando comprobación de conexión con la base de datos...");
                // Hacemos una consulta simple para verificar la conexión
                await _context.Database.ExecuteSqlRawAsync("SELECT 1");
                _logger.LogInformation("Conexión con la base de datos exitosa.");

                return Ok("Conexión con la base de datos exitosa.");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al conectar con la base de datos: {ex.Message}");
                return StatusCode(500, $"Error al conectar con la base de datos: {ex.Message}");
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login(LoginModel loginModel)
        {
            try
            {
                _logger.LogInformation($"Intentando iniciar sesión para el usuario: {loginModel.Username}");

                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("El modelo de datos no es válido.");
                    return BadRequest(ModelState);
                }

                // Buscar el usuario por nombre de usuario
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Username == loginModel.Username);

                if (user == null)
                {
                    _logger.LogWarning($"Usuario no encontrado: {loginModel.Username}");
                    return Unauthorized("Usuario o contraseña incorrectos");
                }

                _logger.LogInformation($"Usuario encontrado: {loginModel.Username}, verificando la contraseña...");

                // Verificar la contraseña directamente (sin hashing)
                if (user.Password != loginModel.Password)
                {
                    _logger.LogWarning($"Contraseña incorrecta para el usuario: {loginModel.Username}");
                    return Unauthorized("Usuario o contraseña incorrectos");
                }

                _logger.LogInformation($"Contraseña verificada correctamente para el usuario: {loginModel.Username}");

                // Generar el token JWT
                var response = _jwtService.GenerateToken(user);

                _logger.LogInformation($"Token generado para el usuario: {loginModel.Username}");

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest("error interno");
            }
        }
    }
}
