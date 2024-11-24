using BookHaven.API.Core.Models;
using Ganss.Xss;
using System;
using System.Linq;

namespace BookHaven.API.Helpers;

public static class Sanitizer
{

    private static string Sanitize(string input)
    {
        return input == null ? string.Empty : new HtmlSanitizer().Sanitize(input);
    }


    /// <summary>
    /// Sanitizes all string properties of an object
    /// This method is used to prevent XSS attacks
    /// Note: This method only sanitizes string properties
    /// Other property types are not sanitized. 
    /// </summary>
    /// <typeparam name="T">The type of the object to sanitize</typeparam>
    /// <param name="obj">The object to sanitize</param>
    public static void SanitizeObject<T>(this T obj)
    {
        if (obj == null) throw new ArgumentNullException(nameof(obj));

        var properties = typeof(T).GetProperties()
                .Where(p => p.PropertyType == typeof(string) && p.CanWrite);

        foreach (var property in properties)
        {
            var value = property.GetValue(obj) as string;
            property.SetValue(obj, Sanitize(value));
        }
    }



    public static void Sanitize(this DtoBook book)
    {
        book.Title = Sanitize(book.Title);
        book.Author = Sanitize(book.Author);
        book.Genre = Sanitize(book.Genre);
        book.Description = Sanitize(book.Description);
    }

}