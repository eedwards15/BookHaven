using BookHaven.API.Core.models;
using BookHaven.API.Database;

public static class MapperHelper
{
    public static DtoBook MapToDto(Book book)
    {
        return new DtoBook { 
            Id = book.Id, 
            Title = book.Title,
            Genre = book.Genre,
            Description = book.Description,
            Author = book.Author,
            CoverImage = book.CoverImage
        };
    }


    public static Book MapToEntity(DtoBook dtoBook)
    {
        return new Book { 
            Id = dtoBook.Id, 
            Title = dtoBook.Title,
            Genre = dtoBook.Genre,
            Author = dtoBook.Author,
            Description = dtoBook.Description,
            CoverImage = dtoBook.CoverImage
        };
    }


    public static List<DtoBook> MapToDtoList(List<Book> books)
    {
        return books.Select(MapToDto).ToList();
    }   

    public static List<Book> MapToEntityList(List<DtoBook> dtoBooks)
    {
        return dtoBooks.Select(MapToEntity).ToList();
    }








}