using BookHaven.API.Core.Models;
using RabbitMQ.Client;
using System.Text;
using System.Text.Json;
using BookHaven.API.Core.Interfaces;
using Microsoft.Extensions.Options;


namespace BookHaven.API.Apis.LoggingSystems;

public class RabbitMq : iLog
{
    private readonly RabbitMqConfig _config;

    public RabbitMq(IOptions<RabbitMqConfig> config)
    {
        _config = config.Value;
    }

    public async Task Log(DtoLog log)
    {

        try
        {
            var factory = new ConnectionFactory { 
                HostName = _config.HostName,
                UserName = _config.UserName,
                Password = _config.Password
            };

            using var connection = await factory.CreateConnectionAsync();
            using var channel = await connection.CreateChannelAsync();

            var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(log));
            await channel.BasicPublishAsync(exchange: "error_logs.fanout", routingKey: string.Empty, body: body);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
    }
}