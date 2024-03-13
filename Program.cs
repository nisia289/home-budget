using BudzetDomowy.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;

//public static void Main itd
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
    
    var app = builder.Build();

    if (!app.Environment.IsDevelopment())
    {
        app.UseExceptionHandler("/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
    }

    app.UseHttpsRedirection();
    app.UseStaticFiles();

    app.UseRouting();

    app.UseAuthorization();

    app.MapRazorPages();

    app.Run();

}

//void ConfigureServices(IServiceCollection services)
/*  services.AddDbContext<ApplicationDbContext>(options =>
          options.UseSqlServer(IConfiguration.GetConnectionString("DefaultConnection")));

      var builder = WebApplication.CreateBuilder(args);
      var configuration = builder.Configuration;
      //var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

      var connectionString = configuration.GetConnectionString("DefaultConnection");
      // Add services to the container.
      builder.Services.AddRazorPages();

      var app = builder.Build();
      // Configure the HTTP request pipeline.
      if (!app.Environment.IsDevelopment())
      {
          app.UseExceptionHandler("/Error");
          // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
          app.UseHsts();
      }
      app.UseHttpsRedirection();
      app.UseStaticFiles();
      app.UseRouting();
      app.UseAuthorization();
      app.MapRazorPages();
      app.Run();
  }
      */