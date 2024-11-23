using Microsoft.AspNetCore.Mvc;
using BookHaven.API.Database;
using BookHaven.API.Core.Interfaces;
using BookHaven.API.Core.Models;


namespace BookHaven.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly iLog _log;

        public BookController(ApplicationDbContext context, iLog log)
        {
            _context = context;
            _log = log;
        }


        [HttpGet("{page}/{count}")]
        public ActionResult<object> GetItemsPaged(int page, int count)
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
