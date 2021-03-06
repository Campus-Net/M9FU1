using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Client;
using Net5.ChatRoom.Application;
using Net5.ChatRoom.Application.Dtos;
using System.Threading.Tasks;

namespace Net5.ChatRoom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly IChatApplicationService _chatApplicationService;
        private readonly HubConnection _chatHubConnection;
        public RoomsController(IChatApplicationService chatApplicationService)
        {
            _chatApplicationService = chatApplicationService;
            _chatHubConnection = new HubConnectionBuilder()
                .WithUrl("https://localhost:44362/ChatHub")
                .Build();
        }


        [HttpGet("{roomId}")]
        public RoomDto GetById(int roomId)
        {
            return _chatApplicationService.GetRoomByRoomId(roomId);
        }

        [HttpGet()]
        public dynamic GetRooms([FromQuery(Name = "roomName")] string roomName)
        {
            if (string.IsNullOrEmpty(roomName))
            {
                return _chatApplicationService.ListRooms();
            }
            else
            {
                return _chatApplicationService.GetRoomByRoomName(roomName);
            }
        }

        [HttpPost]
        public async Task<RoomDto> InsertAsync([FromBody] RoomDto room)
        {
            room = _chatApplicationService.InsertRoom(room);
            await _chatHubConnection.StartAsync();
            await _chatHubConnection.InvokeAsync("ListRoomsServer");

            return room;
        }
    }
}
