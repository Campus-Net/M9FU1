using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Net5.ChatRoom.Application;
using Net5.ChatRoom.Application.Dtos;
using System.Collections.Generic;

namespace Net5.ChatRoom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatsController : ControllerBase
    {
        private readonly IChatApplicationService _chatApplicationService;
        public ChatsController(
            IChatApplicationService chatApplicationService
        )
        {
            _chatApplicationService = chatApplicationService;
        }
        [HttpGet]
        public List<ChatDto> List([FromQuery(Name = "roomId")] int roomId)
        {
            return _chatApplicationService.ListChatByRoomId(roomId);
        }
        [HttpPost]
        public ChatDto Post([FromBody]ChatDto chat)
        {
            return _chatApplicationService.InsertChat(chat);
        }
    }
}
