using Microsoft.AspNetCore.Mvc;
using BusinessLogicLayer.Services;
using BusinessLogicLayer.Dtos;
using Microsoft.AspNetCore.Authorization;
using BusinessLogicLayer.Services.UserService;
using BusinessLogicLayer.Services.TokenService;


namespace PresentationLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        
        public AuthController(IUserService userService, ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Login(LoginDto loginUserDto)
        {
            try
            {
                var isAuthenticated = await _userService.LoginAsync(loginUserDto);
                if (!isAuthenticated)
                {
                    return Unauthorized("Login failed. Please check your username and password.");
                }


                var token = await _tokenService.CreateToken(loginUserDto);
                return Ok(token);
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
    }
}
