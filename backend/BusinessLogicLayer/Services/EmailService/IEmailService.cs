using BusinessLogicLayer.Dtos;
using BusinessLogicLayer.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Services.EmailService
{
    public interface IEmailService
    {
        Task SendEmailAsync(MailRequest mailrequest);
        string GenerateEmailConfirmationToken();
        
    }
}

