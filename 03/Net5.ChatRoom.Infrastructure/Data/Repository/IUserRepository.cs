using Net5.ChatRoom.Infrastructure.Data.Entities;
using System.Collections.Generic;

namespace Net5.ChatRoom.Infrastructure.Data.Repositories
{
    public interface IUserRepository
    {
        User Delete(int userId);
        User GetByEmail(string email);
        User GetByUserId(int userId);
        User Insert(User user);
        List<User> ListUsersByRoomId(int roomId);
        List<User> ListUsersByRoomIdAndStatus(int roomId, string status);
        List<User> ListUsersByRoomIdAndUserIdAndStatus(int roomId, int userId, string status);
        User Update(int userId, User user);
    }
}