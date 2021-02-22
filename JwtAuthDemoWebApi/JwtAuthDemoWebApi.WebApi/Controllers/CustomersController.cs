using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JwtAuthDemoWebApi.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : Controller
    {
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public IEnumerable<string> Get()
        {
            return new string[]
            {
                "one and one",
                "two and two"
            };
        }
    }
}