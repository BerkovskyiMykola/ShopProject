using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopProject.Models;
using Microsoft.AspNetCore.Authorization;

namespace ShopProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase
    {
        private readonly DataContext _context;

        public ShopsController(DataContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "User")]
        [HttpGet("all")]
        public async Task<IActionResult> GetShops()
        {
            var shops = await _context.Shops.Where(x => x.User.Email == HttpContext.User.Identity.Name).ToListAsync();
            return Ok(shops.Select(x => new
            {
                x.ShopId,
                x.Name,
                x.Address,
                x.Type
            }));
        }

        [Authorize(Roles = "User")]
        [HttpGet("statistic/{id}")]
        public async Task<IActionResult> GetStatistic(int id)
        {
            var shop = await _context.Shops
                .Include(x => x.Histories)
                .SingleOrDefaultAsync(x => x.ShopId == id && x.User.Email == HttpContext.User.Identity.Name);

            return Ok(shop.Histories.GroupBy(x => x.Name).Select(x => new
            {
                x.Key,
                Count = x.Sum(x => x.Amount)
            }));
        }

        [Authorize(Roles = "User")]
        [HttpPost("create")]
        public async Task<ActionResult<Shop>> PostShop(Shop shop)
        {
            shop.User = await _context.Users
                .SingleOrDefaultAsync(x => x.Email == HttpContext.User.Identity.Name);

            _context.Shops.Add(shop);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                shop.ShopId,
                shop.Name,
                shop.Address,
                shop.Type
            });
        }

        [Authorize(Roles = "User")]
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutShop(int id, Shop shop)
        {
            if (id != shop.ShopId)
            {
                return BadRequest();
            }

            if (!await _context.Shops.AnyAsync(x => x.User.Email == HttpContext.User.Identity.Name && x.ShopId == id))
            {
                return BadRequest();
            }

            _context.Entry(shop).State = EntityState.Modified;
            _context.Entry(shop).Property(x => x.UserId).IsModified = false;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShopExists(id))
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

        [Authorize(Roles = "User")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteShop(int id)
        {
            var shop = await _context.Shops
                .SingleOrDefaultAsync(x => x.ShopId == id && x.User.Email == HttpContext.User.Identity.Name);
            if (shop == null)
            {
                return NotFound();
            }

            _context.Shops.Remove(shop);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShopExists(int id)
        {
            return _context.Shops.Any(e => e.ShopId == id);
        }
    }
}
