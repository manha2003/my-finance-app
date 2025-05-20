using Microsoft.AspNetCore.Mvc;
using BusinessLogicLayer.Services;
using BusinessLogicLayer.Dtos;
using Microsoft.AspNetCore.Authorization;
using BusinessLogicLayer.Services.ReminderService;

namespace PresentationLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RemindersController : ControllerBase
    {
        private readonly IReminderService _reminderService;
        
        public RemindersController(IReminderService reminderService)
        {
            _reminderService = reminderService;
        }

        [HttpPost]
        public async Task<ActionResult> CreateReminder ([FromBody] ReminderAddDto reminderDto, [FromQuery] Guid userId)
        {
            try
            {
                await _reminderService.AddReminderAsync(reminderDto, userId);
                return Ok($"Reminder created successfully");
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
        public async Task<IActionResult> GetRemindersByUserId(Guid userId)
        {
            try
            {
                var reminders = await _reminderService.GetRemindersByUserIdAsync(userId);
                return Ok(reminders);

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
        public async Task<IActionResult> GetReminderById(int  reminderId)
        {
            try
            {
                var reminder = await _reminderService.GetReminderByIdAsync(reminderId);
                return Ok(reminder);

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

        [HttpDelete("{reminderId}")]
        public async Task<IActionResult> DeleteReminder(int reminderId)
        {
            try
            {
                await _reminderService.DeleteReminderAsync(reminderId);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);

            }
            catch (Exception ex)
            {

                return StatusCode(500, "An unexpected error occurred while deleting the reminder.");
            }


        }
    }
}
