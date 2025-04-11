using Microsoft.AspNetCore.Mvc;
using WebApplication2.Application.Interfaces;
using WebApplication2.Domain.Entities;

namespace WebApplication2.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly ITodoService _service;

    public TodoController(ITodoService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var todo = await _service.GetByIdAsync(id);
        return todo is null ? NotFound() : Ok(todo);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TodoItem item)
    {
        if (string.IsNullOrWhiteSpace(item.Title))
            return BadRequest("Title is required.");
        var created = await _service.CreateAsync(item);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] TodoItem item)
    {
        if (id != item.Id) return BadRequest("ID mismatch.");
        var success = await _service.UpdateAsync(item);
        return success ? NoContent() : NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _service.DeleteAsync(id);
        return success ? NoContent() : NotFound();
    }
}