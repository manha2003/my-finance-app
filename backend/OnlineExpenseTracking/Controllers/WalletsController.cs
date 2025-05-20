using BusinessLogicLayer.Dtos;
using BusinessLogicLayer.Services.UserService;
using BusinessLogicLayer.Services.WalletService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class WalletsController : ControllerBase
    {
        private readonly IWalletService _walletService;

        public WalletsController(IWalletService walletService)
        {
            _walletService = walletService;
        }

        [HttpPost]
        public async Task<ActionResult> CreateWallet([FromBody] WalletAddDto walletDto, [FromQuery] Guid userId)
        {
            try
            {
                await _walletService.CreateWalletAsync(walletDto, userId);
                return Ok($"Wallet created successfully");
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

        [HttpGet("User/{userId}")]
        public async Task<IActionResult> GetWalletsByUserId(Guid userId)
        {
            try
            {
                var wallets = await _walletService.GetWalletsByUserIdAsync(userId);
                return Ok(wallets);

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

        [HttpGet("User/Balance/{userId}")]
        public async Task<IActionResult> GetWalletsBalanceByUserId(Guid userId)
        {
            try
            {
                var balance = await _walletService.GetWalletsBalanceAsync(userId);
                return Ok(balance);

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


        [HttpGet("{id}")]
        public async Task<IActionResult> GetWalletById(Guid id)
        {
            try
            {
                var budget = await _walletService.GetWalletByIdAsync(id);
                return Ok(budget);

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

        [HttpDelete("{walletId}")]
        public async Task<IActionResult> DeleteWallet(Guid walletId)
        {
            try
            {
                await _walletService.DeleteWalletAsync(walletId);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);

            }
            catch (Exception ex)
            {

                return StatusCode(500, "An unexpected error occurred while deleting the wallet.");
            }


        }
    }
}
