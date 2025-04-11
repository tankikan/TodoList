using Microsoft.EntityFrameworkCore;
using WebApplication2.Domain.Entities;

namespace WebApplication2.Infrastructure.Data;

public class TodoDbContext : DbContext
{
    public DbSet<TodoItem> TodoItems => Set<TodoItem>();

    public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options) { }
}