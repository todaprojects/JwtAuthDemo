using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using JwtAuthDemoWebApi.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace JwtAuthDemoWebApi.WebApi.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost, Route("login")]
        public IActionResult Login([FromBody] LoginModel user)
        {
            if (user == null)
                return BadRequest("Not valid client request");

            if (user.UserName == "username" && user.Password == "pass1234")
            {
                // Represents a symmetric security key.
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));

                // Represents the cryptographic key and security algorithms that are used to generate a digital signature.
                var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                // List of registered claims from different sources.
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Role, "Admin")
                };

                // A SecurityToken designed for representing a JSON Web Token (JWT).
                var tokenOptions = new JwtSecurityToken(
                    issuer: _configuration["JwtSettings:Issuer"],
                    audience: _configuration["JwtSettings:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signingCredentials
                );

                // A SecurityTokenHandler designed for creating and validating Json Web Tokens. 
                // WriteToken Serializes a JwtSecurityToken into a JWT in Compact Serialization Format.
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                return Ok(new {Token = tokenString});
            }

            return Unauthorized();
        }
    }
}