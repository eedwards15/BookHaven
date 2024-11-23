using System;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace BookHaven.API.Core.Models;
public class DtoLog
{
    public string Message { get; set; }
    public string SourceSystem { get; set; }
    
    [JsonPropertyName("timestamp")]
    [JsonConverter(typeof(JsonDateTimeConverter))]
    public DateTime Timestamp { get; set; }
    
    [JsonPropertyName("dateLogged")]
    [JsonConverter(typeof(JsonDateTimeConverter))]
    public DateTime DateLogged { get; set; }
}

// Written by ChatGPT
// There could be Dragons here
public class JsonDateTimeConverter : JsonConverter<DateTime>
{
    private readonly bool _asUnixTimestamp;

    public JsonDateTimeConverter() : this(false) { }

    public JsonDateTimeConverter(bool asUnixTimestamp = false)
    {
        _asUnixTimestamp = asUnixTimestamp;
    }

    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        return DateTime.Parse(reader.GetString()!);
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        if (_asUnixTimestamp)
        {
            // Convert to Unix timestamp (seconds since epoch)
            var unixTime = ((DateTimeOffset)value).ToUnixTimeSeconds();
            writer.WriteNumberValue(unixTime);
        }
        else
        {
            // Write as ISO 8601 string
            writer.WriteStringValue(value.ToString("yyyy-MM-ddTHH:mm:ssZ"));
        }
    }
}