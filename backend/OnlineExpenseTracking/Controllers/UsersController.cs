using Microsoft.AspNetCore.Mvc;
using BusinessLogicLayer.Services;
using BusinessLogicLayer.Dtos;
using Microsoft.AspNetCore.Authorization;
using BusinessLogicLayer.Services.UserService;

namespace PresentationLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("Register")]
        public async Task<ActionResult> Register([FromBody] UserAddDto userDto)
        {
            try
            {
                await _userService.RegisterAsync(userDto);
                return Ok($"User {userDto.UserName} register successfully");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpGet("ConfirmEmail")]
        public async Task<ActionResult> ConfirmEmail(string email, string token)
        {
            var result = await _userService.ConfirmEmailAsync(email, token);
            if (!result)
            {
                return BadRequest("Invalid token or email.");
            }

            return Ok("Email confirmed successfully.");
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetUserByUsername(string username)
        {
            try
            {
                var user = await _userService.GetUserByUserNameAsync(username);

                return Ok(user);
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }


        [HttpPut("Update")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDto userDto)
        {
           

            try
            {
                await _userService.UpdateUser(userDto);
                return Ok("User updated successfully.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }

            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }



        }
    }
}

