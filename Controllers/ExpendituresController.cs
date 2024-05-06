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
    public class ExpendituresController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ExpendituresController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Expenditures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Expenditure>>> GetExpenditures()
        {
            return await _context.Expenditures.ToListAsync();
        }

        // GET: api/Expenditures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Expenditure>> GetExpenditure(int id)
        {
            var expenditure = await _context.Expenditures.FindAsync(id);

            if (expenditure == null)
            {
                return NotFound();
            }

            return expenditure;
        }

        // GET: api/Expenditures/Budget/{budgetId}
        [HttpGet("Budget/{budgetId}")]
        public async Task<ActionResult<IEnumerable<Expenditure>>> GetExpenditureByBudget(int budgetId)
        {
            var expenditures = await _context.Expenditures
                .Where(i => i.BudgetId == budgetId)
                .ToListAsync();

            if (expenditures == null)
            {
                return NotFound();
            }

            return expenditures;
        }

        // PUT: api/Expenditures/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpenditure(int id, Expenditure expenditure)
        {
            if (id != expenditure.ExpenditureId)
            {
                return BadRequest();
            }

            _context.Entry(expenditure).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpenditureExists(id))
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

        // POST: api/Expenditures
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Expenditure>> PostExpenditure(Expenditure expenditure)
        {
            _context.Expenditures.Add(expenditure);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExpenditure", new { id = expenditure.ExpenditureId }, expenditure);
        }

        // DELETE: api/Expenditures/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpenditure(int id)
        {
            var expenditure = await _context.Expenditures.FindAsync(id);
            if (expenditure == null)
            {
                return NotFound();
            }

            _context.Expenditures.Remove(expenditure);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExpenditureExists(int id)
        {
            return _context.Expenditures.Any(e => e.ExpenditureId == id);
        }
    }
}
