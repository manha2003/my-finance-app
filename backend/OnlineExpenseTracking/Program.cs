using Microsoft.OpenApi.Models;
using DataAccessLayer.Data;
using BusinessLogicLayer.Mapping;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Text;
using BusinessLogicLayer.Helpers;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using BusinessLogicLayer.Services.UserService;
using DataAccessLayer.Repositories.UserRepository;
using BusinessLogicLayer.Validator;
using BusinessLogicLayer.Services.TokenService;
using BusinessLogicLayer.Services.EmailService;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.CategoryRepository;
using BusinessLogicLayer.Services.CategoryService;
using DataAccessLayer.Repositories.BudgetRepository;
using BusinessLogicLayer.Services.BudgetService;
using BusinessLogicLayer.Services.FinancialService;
using DataAccessLayer.Repositories.IncomeRepository;
using DataAccessLayer.Repositories.ExpenseRepository;
using DataAccessLayer.Repositories.WalletRepository;
using DataAccessLayer.Repositories.TransactionRepository;
using BusinessLogicLayer.Services.WalletService;
using DataAccessLayer.Repositories.LiabilityRepository;
using DataAccessLayer.Repositories.AssetRepository;
using BusinessLogicLayer.Validator.UserValidator;
using BusinessLogicLayer.Validator.CategoryValidator;
using BusinessLogicLayer.Validator.FinancialValidator;
using BusinessLogicLayer.Validator.BudgetValidator;
using DataAccessLayer.Repositories.ReminderRepository;
using BusinessLogicLayer.Services.ReminderService;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAutoMapper(typeof(UserMapperProfiles));
builder.Services.AddAutoMapper(typeof(CategoryMapperProfiles));
builder.Services.AddAutoMapper(typeof(BudgetMapperProfiles));
builder.Services.AddAutoMapper(typeof(ExpenseMapperProfiles));
builder.Services.AddAutoMapper(typeof(IncomeMapperProfiles));
builder.Services.AddAutoMapper(typeof(WalletMapperProfiles));
builder.Services.AddAutoMapper(typeof(AssetMapperProfiles));
builder.Services.AddAutoMapper(typeof(LiabilityMapperProfiles));
builder.Services.AddAutoMapper(typeof(TransactionMapperProfiles));
builder.Services.AddAutoMapper(typeof(ReminderMapperProfiles));

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IBudgetRepository, BudgetRepository>();
builder.Services.AddScoped<IIncomeRepository, IncomeRepository>();
builder.Services.AddScoped<IExpenseRepository, ExpenseRepository>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
builder.Services.AddScoped<IWalletRepository, WalletRepository>();
builder.Services.AddScoped<ILiabilityRepository, LiabilityRepository>();
builder.Services.AddScoped<IAssetRepository, AssetRepository>();
builder.Services.AddScoped<IReminderRepository, ReminderRepository>();





builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IBudgetService, BudgetService>();
builder.Services.AddScoped<IFinancialService, FinancialService>();
builder.Services.AddScoped<IWalletService, WalletService>();
builder.Services.AddScoped<IReminderService, ReminderService>();
builder.Services.AddScoped<IUserValidator, UserValidator>();
builder.Services.AddScoped<ICategoryValidator, CategoryValidator>();
builder.Services.AddScoped<IFinancialValidator, FinancialValidator>();
builder.Services.AddScoped<IBudgetValidator, BudgetValidator>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddHttpContextAccessor();
builder.Services.AddSwaggerGen();


builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.AddAuthentication().AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateAudience = false,
        ValidateIssuer = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            builder.Configuration.GetSection("AppSettings:Token").Value!))
    };

});



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
            builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });

});
builder.Services.AddTransient<CategoryDataSeeder>();
builder.Services.AddDbContext<OnlineExpenseTrackingDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("OnlineExpenseTrackingConnectionString"));
    

});
builder.Services.AddHostedService<ReminderEmailHostedService>();

var app = builder.Build();



using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<OnlineExpenseTrackingDbContext>();
    var seeder = services.GetRequiredService<CategoryDataSeeder>();
    seeder.Seed();
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAllOrigins");


app.UseRouting();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

