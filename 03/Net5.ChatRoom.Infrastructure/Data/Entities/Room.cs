// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Net5.ChatRoom.Infrastructure.Data.Entities
{
    public partial class Room
    {
        public Room()
        {
            Chats = new HashSet<Chat>();
            RoomUsers = new HashSet<RoomUser>();
        }

        public int RoomId { get; set; }
        public string RoomName { get; set; }

        public virtual ICollection<Chat> Chats { get; set; }
        public virtual ICollection<RoomUser> RoomUsers { get; set; }
    }
}