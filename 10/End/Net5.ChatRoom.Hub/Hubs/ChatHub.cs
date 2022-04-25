namespace Net5.ChatRoom.Hub.Hubs
{
    using Microsoft.AspNetCore.SignalR;
    using Net5.ChatRoom.Application.Dtos;
    using System.Threading.Tasks;

    public class ChatHub:Hub
    {
        public ChatHub()
        {

        }
        public async Task ListRoomsServer()
        {
            await Clients.All.SendAsync("ListRoomsClient");
        }

        public async Task SendChatServer(ChatDto chat)
        {
            await Clients.All.SendAsync("ReciveChatClient", chat);
        }

        public async Task ListUsersByRoomIdServer(int roomId)
        {
            await Clients.All.SendAsync("ListUsersByRoomIdClient", roomId);
        }
    }
}
