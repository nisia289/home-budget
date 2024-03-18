using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BudzetDomowy.Models;

namespace BudzetDomowy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserBudgetsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserBudgetsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/UserBudgets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserBudget>>> GetUserBudgets()
        {
            return await _context.UserBudgets.ToListAsync();
        }

        // GET: api/UserBudgets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserBudget>> GetUserBudget(int id)
        {
            var userBudget = await _context.UserBudgets.FindAsync(id);

            if (userBudget == null)
            {
                return NotFound();
            }

            return userBudget;
        }

        // PUT: api/UserBudgets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserBudget(int id, UserBudget userBudget)
        {
            if (id != userBudget.UserBudgetId)
            {
                return BadRequest();
            }

            _context.Entry(userBudget).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserBudgetExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UserBudgets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserBudget>> PostUserBudget(UserBudget userBudget)
        {
            _context.UserBudgets.Add(userBudget);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserBudget", new { id = userBudget.UserBudgetId }, userBudget);
        }

        // DELETE: api/UserBudgets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserBudget(int id)
        {
            var userBudget = await _context.UserBudgets.FindAsync(id);
            if (userBudget == null)
            {
                return NotFound();
            }

            _context.UserBudgets.Remove(userBudget);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserBudgetExists(int id)
        {
            return _context.UserBudgets.Any(e => e.UserBudgetId == id);
        }
    }
}
