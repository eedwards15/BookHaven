using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.Extensions.Configuration;

namespace BookHaven.API.Database;

public class ApplicationDbContext : DbContext
{
    private readonly IConfiguration _configuration;

public ApplicationDbContext(
    DbContextOptions<ApplicationDbContext> options,
    IConfiguration configuration)
    : base(options)
{
    _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
}

    public DbSet<UserBook> UserBooks { get; set; }
    public DbSet<Book> Books { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
        }
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserBook>()
            .HasKey(ub => new { ub.UserId, ub.BookId });
    }
}