using Net5.ChatRoom.Infrastructure.Data.Entities;

namespace Net5.ChatRoom.Infrastructure.Data.Repositories
{
    public interface IRoomUserRepository
    {
        RoomUser GetByRoomIdAndUserId(int roomId, int userId);
        RoomUser GetByRoomIdAndUserIdAndStatus(int roomId, int userId, string status);
        RoomUser Insert(RoomUser roomUser);
        RoomUser Update(int roomUserId, RoomUser roomUser);
    }
}