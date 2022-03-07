using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Net5.ChatRoom.Infrastructure.Data.Context;
using Net5.ChatRoom.Infrastructure.Data.Entities;

namespace Net5.ChatRoom.Infrastructure.Data.Repositories
{
    public class ChatRepository : IChatRepository
    {
        private readonly ChatRoomContext _context;
        public ChatRepository(ChatRoomContext context)
        {
            _context = context;
        }
        public List<Chat> ListByRoomId(int roomId)
        {
            var query = from c in _context.Chats
                        where c.RoomId == roomId
                        select c;

            List<Chat> chats = query.ToList();

            return chats;
        }

        public Chat Insert(Chat chat)
        {
            Chat newChat = new Chat
            {
                Date = chat.Date,
                Message = chat.Message,
                RoomId = chat.RoomId,
                UserId = chat.UserId,
                Type = chat.Type
            };

            _context.Chats.Add(newChat);
            _context.SaveChanges();

            chat.ChatId = newChat.ChatId;
            return chat;
        }
    }
}
