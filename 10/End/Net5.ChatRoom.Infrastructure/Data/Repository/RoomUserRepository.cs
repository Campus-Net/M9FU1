using System.Linq;
using Net5.ChatRoom.Infrastructure.Data.Context;
using Net5.ChatRoom.Infrastructure.Data.Entities;

namespace Net5.ChatRoom.Infrastructure.Data.Repositories
{
    public class RoomUserRepository : IRoomUserRepository
    {
        private readonly ChatRoomContext _context;
        public RoomUserRepository(ChatRoomContext context)
        {
            _context = context;
        }
        public RoomUser GetByRoomIdAndUserId(int roomId, int userId)
        {
            var query = from ru in _context.RoomUsers
                        where ru.RoomId == roomId && ru.UserId == userId
                        select ru;

            RoomUser roomUser = query.FirstOrDefault();

            return roomUser;
        }
        public RoomUser Insert(RoomUser roomUser)
        {
            _context.RoomUsers.Add(roomUser);
            _context.SaveChanges();

            return roomUser;
        }

        public RoomUser Update(int roomUserId, RoomUser roomUser)
        {
            RoomUser roomUserToUpdate = _context.RoomUsers.Where(r => r.RoomUserId == roomUserId).FirstOrDefault();
            roomUserToUpdate.Status = roomUser.Status;
            _context.RoomUsers.Update(roomUserToUpdate);
            _context.SaveChanges();

            roomUser.RoomUserId = roomUserToUpdate.RoomUserId;
            return roomUser;
        }
    }
}
