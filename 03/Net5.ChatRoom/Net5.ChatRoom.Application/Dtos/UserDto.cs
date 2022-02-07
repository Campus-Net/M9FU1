using System;
using System.Collections.Generic;
using System.Text;

namespace Net5.ChatRoom.Application.Dtos
{ 
    public class UserDto
    {
        public int UserId { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public DateTimeOffset? DateOfBirth { get; set; }
        public int Sex { get; set; }
    }
}
