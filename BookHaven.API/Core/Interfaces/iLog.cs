using BookHaven.API.Core.Models;


namespace BookHaven.API.Core.Interfaces;

public interface iLog
{
    Task Log(DtoLog log);
}