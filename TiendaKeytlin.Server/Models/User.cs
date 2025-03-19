using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TiendaKeytlin.Server.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Required]
        [Column("Username")]
        public string Username { get; set; } = string.Empty;

        [Required]
        [Column("Password")]
        public string Password { get; set; } = string.Empty;

        [Required]
        [Column("Name")]
        public string Name { get; set; } = string.Empty;
    }
}