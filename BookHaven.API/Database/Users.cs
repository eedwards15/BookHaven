using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace BookHaven.API.Database;


//This needs to be updated
//The password needs to be hashed
//The username needs to be unique

[Table("Users")]
public class User
{


    [Key]
    public int Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
}