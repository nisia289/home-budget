using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BudzetDomowy.Models;
using Microsoft.AspNetCore.Identity;

namespace BudzetDomowy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("username/{username}")]
        public ActionResult<int> GetUserIdByUsername(string username)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == username);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            return user.UserId;
        }

       

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            
            var hasher = new PasswordHasher<User>();

            
            user.Password = hasher.HashPassword(user, user.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        [HttpPost("checkUser")]
        public IActionResult CheckUser([FromBody] User loginUser)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == loginUser.Username);
            
            var hasher = new PasswordHasher<User>();

            if (user != null && hasher.VerifyHashedPassword(user, user.Password, loginUser.Password) == PasswordVerificationResult.Success)
            {
                return Ok(new { success = true, message = "User is valid" });
            }
            else
            {
                return Ok(new { success = false, message = "User is not valid" });
            }
        }

        private bool VerifyPassword(string inputPassword, string storedPassword, string storedHashedPassword)
        {

            
            var hasher = new PasswordHasher<User>();

            
            return hasher.VerifyHashedPassword(new User(), storedHashedPassword, inputPassword) == PasswordVerificationResult.Success;
        }


        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

        /////////////////////////////////// END POINT DO PRZESYŁANIA UAKTUALNIANIA ZDJĘCIA PROFILOWEGO
        
        [HttpPost("upload-image/{userId}")]
        public async Task<IActionResult> UploadUserImage(int userId, IFormFile image)
        {
            if (image == null || image.Length == 0)
            {
                return BadRequest("No image uploaded.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            using (var memoryStream = new MemoryStream())
            {
                await image.CopyToAsync(memoryStream);
                user.Image = memoryStream.ToArray();
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok("Image uploaded successfully.");
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///

        [HttpGet("{userId}/photo")]
        public async Task<IActionResult> GetUserPhoto(int userId)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);

                if (user == null || user.Image == null)
                {
                    return NotFound("User or photo not found.");
                }

                return File(user.Image, "image/jpeg"); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
