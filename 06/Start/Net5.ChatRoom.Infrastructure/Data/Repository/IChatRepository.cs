using Net5.ChatRoom.Infrastructure.Data.Entities;
using System.Collections.Generic;

namespace Net5.ChatRoom.Infrastructure.Data.Repositories
{
    public interface IChatRepository
    {
        Chat Insert(Chat chat);
        List<Chat> ListByRoomId(int roomId);
    }
}