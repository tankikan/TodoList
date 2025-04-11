using Microsoft.EntityFrameworkCore;
using WebApplication2.Application.Interfaces;
using WebApplication2.Domain.Entities;
using WebApplication2.Infrastructure.Data;

namespace WebApplication2.Infrastructure.Services;

public class TodoService : ITodoService
{
    private readonly TodoDbContext _context;

    public TodoService(TodoDbContext context) => _context = context;

    public async Task<List<TodoItem>> GetAllAsync() => await _context.TodoItems.ToListAsync();

    public async Task<TodoItem?> GetByIdAsync(int id) => await _context.TodoItems.FindAsync(id);

    public async Task<TodoItem> CreateAsync(TodoItem item)
    {
        _context.TodoItems.Add(item);
        await _context.SaveChangesAsync();
        return item;
    }

    public async Task<bool> UpdateAsync(TodoItem item)
    {
        var existing = await _context.TodoItems.FindAsync(item.Id);
        if (existing == null) return false;

        existing.Title = item.Title;
        existing.IsCompleted = item.IsCompleted;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var item = await _context.TodoItems.FindAsync(id);
        if (item == null) return false;

        _context.TodoItems.Remove(item);
        await _context.SaveChangesAsync();
        return true;
    }
}