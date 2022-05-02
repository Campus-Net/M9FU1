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

    public class RoomUsersController : ControllerBase
    {
        private readonly IChatApplicationService _chatApplicationService;
        private readonly HubConnection _chatHubConnection;
        public RoomUsersController(IChatApplicationService chatApplicationService)
        {
            _chatApplicationService = chatApplicationService;
            _chatHubConnection = new HubConnectionBuilder()
                .WithUrl("https://localhost:44362/ChatHub")
                .Build();
        }

        [HttpGet()]
        public RoomUserDto Get([FromQuery(Name = "roomId")] int roomId, [FromQuery(Name = "userId")] int userId, [FromQuery(Name = "status")] string status)
        {
            if (string.IsNullOrEmpty(status))
            {
                return _chatApplicationService.GetRoomUserByRoomIdAndUserId(roomId, userId);
            }
            else
            {
                return _chatApplicationService.GetRoomUserByRoomIdAndUserIdAndStatus(roomId, userId,status);
            }
            //return null;
        }
        [HttpPost]
        public async Task<RoomUserDto> PostAsync([FromBody] RoomUserDto roomUser)
        {
            roomUser = _chatApplicationService.InsertRoomUser(roomUser);

            await _chatHubConnection.StartAsync();
            await _chatHubConnection.InvokeAsync("ListUsersByRoomIdServer", roomUser.RoomId);

            return roomUser;
        }
        [HttpPut]
        public async Task<RoomUserDto> PutAsync([FromBody] RoomUserDto roomUser)
        {
            roomUser = _chatApplicationService.UpdateRoomUser(roomUser);

            await _chatHubConnection.StartAsync();
            await _chatHubConnection.InvokeAsync("ListUsersByRoomIdServer", roomUser.RoomId);

            return roomUser;
        }
    }
}
