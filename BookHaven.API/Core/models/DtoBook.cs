
namespace BookHaven.API.Core.models;
public class DtoBook
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Genre { get; set; }
    public string Author { get; set; }
    public byte[] CoverImage { get; set; }
}