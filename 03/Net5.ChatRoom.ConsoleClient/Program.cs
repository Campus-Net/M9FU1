using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Net5.ChatRoom.Application;
using Net5.ChatRoom.Infrastructure.Data.Context;
using Net5.ChatRoom.Infrastructure.Data.Repositories;
using System;

namespace Net5.ChatRoom.ConsoleClient
{
    internal class Program
    {
        static void Main(string[] args)
        {
            using IHost host = Host.CreateDefaultBuilder(args)
                .ConfigureLogging((logging) =>
                {
                    logging.ClearProviders();
                })
                .ConfigureAppConfiguration(app =>
                {
                    app.AddJsonFile("appsettings.json");
                })
                .ConfigureServices((_, services) => {
                    
                    services.AddScoped<IUserRepository, UserRepository>();
                    services.AddScoped<IRoomRepository, RoomRepository>();
                    services.AddScoped<IRoomUserRepository, RoomUserRepository>();
                    services.AddScoped<IChatRepository, ChatRepository>();

                    services.AddScoped<IChatApplicationService, ChatApplicationService>();

                    string conn = "Data Source=.;Initial Catalog=Net5.ChatRoom.DB;User ID=sa;Password=Password1234";

                    services.AddDbContext<ChatRoomContext>(opt => opt.UseSqlServer(conn));
                    services.AddTransient<ConsoleApp>();
                })
                .Build();

            using (var serviceScope = host.Services.CreateScope())
            {
                var services = serviceScope.ServiceProvider;

                try
                {
                    ConsoleApp consoleApp = services.GetRequiredService<ConsoleApp>();
                    consoleApp.Run();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error Occured");
                    Console.WriteLine(ex);
                }
            }
        }
    }
}
