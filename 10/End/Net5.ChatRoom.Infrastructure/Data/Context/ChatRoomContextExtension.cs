using Microsoft.EntityFrameworkCore;
using Net5.ChatRoom.Infrastructure.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5.ChatRoom.Infrastructure.Data.Context
{
    public partial class ChatRoomContext : DbContext
    {
        public void SeedData()
        {
            Database.EnsureDeleted();
            Database.Migrate();
            EnsureUsers();
        }

        private void EnsureUsers()
        {
            User erick = new User
            {
                FirstName = "Erick",
                LastName = "Aróstegui Cunza",
                Email = "erick.arostegui.cunza@gmail.com",
                Address = "Barcelona",
                DateOfBirth = new DateTime(1981, 11, 17),
                Sex = 1,
                Password = "Password1234"
            };

            Users.Add(erick);
            SaveChanges();
        }
    }
}
