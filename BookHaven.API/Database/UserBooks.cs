using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookHaven.API.Database;


[Table("UserBooks")]
public class UserBook
{
    public int UserId { get; set; }
    public int BookId { get; set; }
    public int Rating { get; set; }
    public string Status { get; set; }
    public string Review { get; set; }
    public DateTime DateAdded { get; set; }
    public DateTime CompletedDate { get; set; }

}