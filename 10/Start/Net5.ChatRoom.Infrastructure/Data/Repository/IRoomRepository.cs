using Net5.ChatRoom.Infrastructure.Data.Entities;
using System.Collections.Generic;

namespace Net5.ChatRoom.Infrastructure.Data.Repositories
{
    public interface IRoomRepository
    {
        Room GetByRoomId(int roomId);
        Room GetByRoomName(string roomName);
        Room Insert(Room room);
        List<Room> ListRooms();
    }
}