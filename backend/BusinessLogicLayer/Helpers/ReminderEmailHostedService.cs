using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using DataAccessLayer;
using Microsoft.EntityFrameworkCore;
using BusinessLogicLayer.Services.EmailService;
using BusinessLogicLayer.Helpers;
using DataAccessLayer.Data;
using DataAccessLayer.Repositories.UserRepository;

public class ReminderEmailHostedService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<ReminderEmailHostedService> _logger;
    private readonly IEmailService _emailService;


    public ReminderEmailHostedService(IServiceProvider serviceProvider, ILogger<ReminderEmailHostedService> logger)
    {
        _serviceProvider = serviceProvider;
       
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("ReminderEmailHostedService is starting.");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using var scope = _serviceProvider.CreateScope();
                var dbContext = scope.ServiceProvider.GetRequiredService<OnlineExpenseTrackingDbContext>();
                var emailService = scope.ServiceProvider.GetRequiredService<IEmailService>();

             
                var now = DateTime.UtcNow.AddHours(7);
                var reminders = await dbContext.Reminders
                    .Where(r => !r.IsSend && r.ReminderDate <= now)
                    .ToListAsync(stoppingToken);
                

                foreach (var reminder in reminders)
                {
                
                    var mailRequest = new MailRequest
                    {
                        ToEmail = reminder.Email, 
                        Subject = "Reminder Notification",
                        Body = GetHtmlcontent(reminder.Title, reminder.Message)
                    };

                    
                    await emailService.SendEmailAsync(mailRequest);

                   
                    reminder.IsSend = true;
                    dbContext.Reminders.Update(reminder);
                }

                await dbContext.SaveChangesAsync(stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred in ReminderEmailHostedService: {ex.Message}");
            }

            await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
        }

        _logger.LogInformation("ReminderEmailHostedService is stopping.");
    }

    private string GetHtmlcontent(string reminderTitle, string reminderMessage )
    {

        string response = "<div style=\"width:100%;text-align:center;margin:10px\">";
        response += $"<h1>Your Reminder for {reminderTitle}</h1>";
        response += $"<p>Message: {reminderMessage}</p>";
        response += "</div>";
        return response;
    }
}