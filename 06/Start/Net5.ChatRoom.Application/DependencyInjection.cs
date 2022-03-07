using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5.ChatRoom.Application
{
    public static class DependencyInjection
    {        
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {            
            services.AddScoped<IChatApplicationService, ChatApplicationService>();
         
            return services;
        }
    }
}
