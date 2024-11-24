using Microsoft.AspNetCore.Mvc;
using BookHaven.API.Database;
using BookHaven.API.Core.Interfaces;
using BookHaven.API.Core.Models;
using BookHaven.API.Core.Models.RequestObjs;
using System.Linq;
using System.Text.RegularExpressions;
using Ganss.Xss;
using BookHaven.API.Helpers;
namespace BookHaven.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly iLog _log;
        private readonly HtmlSanitizer _sanitizer;

        public BookController(ApplicationDbContext context, iLog log)
        {
            _context = context;
            _log = log;
            _sanitizer = new HtmlSanitizer();
        }

        [HttpPost("search")]
        public ActionResult<List<DtoBook>> GetItemsByTitle([FromBody] SearchRequest request)
        {
            try
            {
                request.SanitizeObject();
                var dbBooks = _context.Books.Where(b => b.Title.Contains(sanitizedInput)).Take(10).ToList();
                var dtoBooks = MapperHelper.MapToDtoList(dbBooks);
                return Ok(dtoBooks);
            }
            catch (Exception ex)
            {
                _log.Log(new DtoLog { Message = ex.Message, SourceSystem = "BookHaven.API", Timestamp = DateTime.Now, DateLogged = DateTime.Now });
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public ActionResult<DtoBook> AddBook([FromBody] DtoBook book)
        {
            try
            {
                book.SanitizeObject(); 
                if(string.IsNullOrEmpty(book.Title))
                {
                    return BadRequest("Title is required");
                }

                if(string.IsNullOrEmpty(book.Author))
                {
                    return BadRequest("Author is required");
                }

                var dbBook = MapperHelper.MapToEntity(book);
                _context.Books.Add(dbBook);
                _context.SaveChanges();
                return Ok(MapperHelper.MapToDto(dbBook));
            }
            catch (Exception ex)
            {
                _log.Log(new DtoLog { Message = ex.Message, SourceSystem = "BookHaven.API", Timestamp = DateTime.Now, DateLogged = DateTime.Now });
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{page}/{count}")]
        public ActionResult<List<DtoBook>> GetItemsPaged(int page, int count)
        {
            try
            {
                var dbBooks = _context.Books.Skip((page - 1) * count).Take(count).ToList();
                var dtoBooks = MapperHelper.MapToDtoList(dbBooks);
                return Ok(dtoBooks);
            }
            catch (Exception ex)
            {
                _log.Log(new DtoLog { Message = ex.Message, SourceSystem = "BookHaven.API", Timestamp = DateTime.Now, DateLogged = DateTime.Now });
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
