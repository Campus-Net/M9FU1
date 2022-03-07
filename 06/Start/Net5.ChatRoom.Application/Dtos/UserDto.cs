using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

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

        [JsonIgnore]
        [XmlElement("DateOfBirth")]
        public string DateOfBirthForXml // format: 2011-11-11T15:05:46.4733406+01:00
        {
            get { return DateOfBirth.Value.ToString("o"); } // o = yyyy-MM-ddTHH:mm:ss.fffffffzzz
            set { DateOfBirth = DateTimeOffset.Parse(value); }
        }
        [XmlIgnore]
        public DateTimeOffset? DateOfBirth { get; set; }
        public int Sex { get; set; }
    }
}
