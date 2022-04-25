using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Net5.ChatRoom.Infrastructure.Data.Context;
using Net5.ChatRoom.Infrastructure.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5.ChatRoom.Infrastructure.Data
{
    public static class DependencyInjection
    {
        public class DataOptions
        {
            public string ConnectionString { get; set; }
        }

        public static IServiceCollection AddData(this IServiceCollection services, Action<DataOptions> configureOptions)
        {
            var options = new DataOptions();
            configureOptions(options);
                        
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRoomRepository, RoomRepository>();
            services.AddScoped<IRoomUserRepository, RoomUserRepository>();
            services.AddScoped<IChatRepository, ChatRepository>();

            services.AddDbContext<ChatRoomContext>(opt =>
            {
                opt.UseSqlServer(options.ConnectionString);
            });
            return services;
        }
    }
}
