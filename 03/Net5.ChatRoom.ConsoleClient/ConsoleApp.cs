using Net5.ChatRoom.Application;
using Net5.ChatRoom.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5.ChatRoom.ConsoleClient
{
    public class ConsoleApp
    {
        private readonly IChatApplicationService _chatApplicationService;
        public ConsoleApp(IChatApplicationService chatApplicationService)
        {
            _chatApplicationService = chatApplicationService;
        }
        public void Run()
        {
            UserDto user = _chatApplicationService.GetUserByEmail("jperez@todo.local");
            Console.WriteLine(user.FirstName);
        }
    }
}