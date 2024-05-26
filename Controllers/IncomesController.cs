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
    public class IncomesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public IncomesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Incomes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Income>>> GetIncomes()
        {
            return await _context.Incomes.ToListAsync();
        }

        // GET: api/Incomes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Income>> GetIncome(int id)
        {
            var income = await _context.Incomes.FindAsync(id);

            if (income == null)
            {
                return NotFound();
            }

            return income;
        }

        // GET: api/Incomes/Budget/{budgetId}
        [HttpGet("Budget/{budgetId}")]
        public async Task<ActionResult<IEnumerable<Income>>> GetIncomesByBudget(int budgetId)
        {
            var incomes = await _context.Incomes
                .Where(i => i.BudgetId == budgetId)
                .ToListAsync();

            if (incomes == null)
            {
                return NotFound();
            }

            return incomes;
        }
    

    // PUT: api/Incomes/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
        public async Task<IActionResult> PutIncome(int id, Income income)
        {
            if (id != income.IncomeId)
            {
                return BadRequest();
            }

            _context.Entry(income).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IncomeExists(id))
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

        // POST: api/Incomes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Income>> PostIncome(Income income)
        {
            _context.Incomes.Add(income);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIncome", new { id = income.IncomeId }, income);
        }

        // DELETE: api/Incomes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncome(int id)
        {
            var income = await _context.Incomes.FindAsync(id);
            if (income == null)
            {
                return NotFound();
            }

            _context.Incomes.Remove(income);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("daily-summaries/{year}/{month}/{budgetId}")]
        public async Task<IActionResult> GetDailySummaries(int year, int month, int budgetId)
        {
            var incomes = await _context.Incomes
         .Where(i => i.Date.Year == year && i.Date.Month == month && i.BudgetId == budgetId)
         .GroupBy(i => i.Date.Date)
         .Select(g => new
         {
             Day = g.Key,
             TotalIncome = g.Sum(i => i.Amount),
             TotalExpenditure = 0M  // Wartość domyślna dla wydatków
         })
         .ToListAsync();

            var expenditures = await _context.Expenditures
                .Where(e => e.Date.Year == year && e.Date.Month == month && e.BudgetId == budgetId)
                .GroupBy(e => e.Date.Date)
                .Select(g => new
                {
                    Day = g.Key,
                    TotalIncome = 0M,  // Wartość domyślna dla przychodów
                    TotalExpenditure = g.Sum(e => e.Amount)
                })
                .ToListAsync();

            var results = incomes.Concat(expenditures)
                .GroupBy(x => x.Day)
                .Select(g => new
                {
                    Day = g.Key,
                    TotalIncome = g.Sum(x => x.TotalIncome),
                    TotalExpenditure = g.Sum(x => x.TotalExpenditure)
                })
                .OrderBy(x => x.Day)
                .ToList();


            return Ok(results);
        }

        [HttpGet("summary/{year}/{month}/{budgetId}")]
        public async Task<IActionResult> GetMonthlySummary(int year, int month, int budgetId)
        {
            var totalIncome = await _context.Incomes
                .Where(i => i.Date.Year == year && i.Date.Month == month && i.BudgetId == budgetId)
                .SumAsync(i => i.Amount);

            var totalExpenditure = await _context.Expenditures
                .Where(e => e.Date.Year == year && e.Date.Month == month && e.BudgetId == budgetId)
                .SumAsync(e => e.Amount);

            return Ok(new
            {
                TotalIncome = totalIncome,
                TotalExpenditure = totalExpenditure
            });
        }

        [HttpGet("user/{userId}/budget/{budgetId}")]
        public async Task<ActionResult<IEnumerable<Income>>> GetIncomesByUserAndBudget(int userId, int budgetId)
        {
            var incomes = await _context.Incomes
                .Where(p => p.UserId == userId && p.BudgetId == budgetId)
                .ToListAsync();

            if (incomes == null || !incomes.Any())
            {
                return NotFound();
            }

            return Ok(incomes);
        }

        private bool IncomeExists(int id)
        {
            return _context.Incomes.Any(e => e.IncomeId == id);
        }
    }
}
