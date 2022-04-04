using System.Collections.Generic;
using System.Text;
using System.Linq;
using Net5.ChatRoom.Infrastructure.Data.Context;
using Net5.ChatRoom.Infrastructure.Data.Entities;

namespace Net5.ChatRoom.Infrastructure.Data.Repositories
{
    public class RoomRepository : IRoomRepository
    {
        private readonly ChatRoomContext _context;
        public RoomRepository(ChatRoomContext context)
        {
            _context = context;
        }
        public Room GetByRoomName(string roomName)
        {
            var query = from r in _context.Rooms
                        where r.RoomName == roomName
                        select r;

            Room room = query.FirstOrDefault();

            return room;
        }
        public Room GetByRoomId(int roomId)
        {
            var query = from r in _context.Rooms
                        where r.RoomId == roomId
                        select r;

            Room room = query.FirstOrDefault();

            return room;
        }
        public List<Room> ListRooms()
        {
            var query = from r in _context.Rooms
                        select r;

            List<Room> rooms = query.ToList();

            return rooms;
        }

        public Room Insert(Room room)
        {
            _context.Rooms.Add(room);
            _context.SaveChanges();

            return room;
        }
    }
}
