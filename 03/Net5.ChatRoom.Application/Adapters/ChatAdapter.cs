using Net5.ChatRoom.Application.Dtos;
using Net5.ChatRoom.Infrastructure.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5.ChatRoom.Application.Adapters
{
    public static class ChatAdapter
    {
        public static UserDto UserToUserDto(User user)
        {
            UserDto userDto = new UserDto
            {
                UserId = user.UserId,
                Address = user.Address,
                DateOfBirth = user.DateOfBirth,
                Email=user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Password = user.Password,
                Sex=user.Sex
            };

            return userDto;
        }
        public static User UserDtoToUser(UserDto userDto)
        {
            User user = new User
            {
                UserId = userDto.UserId,
                Address = userDto.Address,
                DateOfBirth = userDto.DateOfBirth,
                Email = userDto.Email,
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                Password = userDto.Password,
                Sex = userDto.Sex
            };

            return user;
        }
        public static List<UserDto> UsersToUsersDto(List<User> users)
        {
            List<UserDto> usersDto = new List<UserDto>();
            users.ForEach(user =>
            {
                UserDto userDto = UserToUserDto(user);
                usersDto.Add(userDto);
            });

            return usersDto;
        }

        public static RoomDto RoomToRoomDto(Room room)
        {
            RoomDto roomDto = new RoomDto
            {
                RoomId = room.RoomId,
                RoomName=room.RoomName
            };

            return roomDto;
        }
        public static Room RoomDtoToRoom(RoomDto roomDto)
        {
            Room room = new Room
            {
                RoomId = roomDto.RoomId,
                RoomName = roomDto.RoomName
            };

            return room;
        }
        public static List<RoomDto> RoomsToRoomsDto(List<Room> rooms)
        {
            List<RoomDto> roomsDto = new List<RoomDto>();
            rooms.ForEach(room =>
            {
                RoomDto roomDto = RoomToRoomDto(room);
                roomsDto.Add(roomDto);
            });

            return roomsDto;
        }

        public static RoomUserDto RoomUserToRoomUserDto(RoomUser roomUser)
        {
            RoomUserDto roomUserDto = new RoomUserDto
            {
                RoomId = roomUser.RoomId,
                UserId = roomUser.UserId,
                Status = roomUser.Status
            };

            return roomUserDto;
        }
        public static RoomUser RoomUserDtoToRoomUser(RoomUserDto roomUserDto)
        {
            RoomUser roomUser = new RoomUser
            {
                RoomId = roomUserDto.RoomId,
                UserId = roomUserDto.UserId,
                Status = roomUserDto.Status
            };

            return roomUser;
        }
        public static List<RoomUserDto> RoomUsersToRoomUsersDto(List<RoomUser> roomUsers)
        {
            List<RoomUserDto> roomUsersDto = new List<RoomUserDto>();
            roomUsers.ForEach(roomUser =>
            {
                RoomUserDto roomUserDto = RoomUserToRoomUserDto(roomUser);
                roomUsersDto.Add(roomUserDto);
            });

            return roomUsersDto;
        }

        public static ChatDto ChatToChatDto(Chat chat)
        {
            ChatDto chatDto = new ChatDto
            {
                ChatId = chat.ChatId,
                Date = chat.Date,
                Message = chat.Message,
                RoomId=chat.RoomId,
                Type = chat.Type,
                UserId = chat.UserId
            };

            return chatDto;
        }
        public static Chat ChatDtoToChat(ChatDto chatDto)
        {
            Chat chat = new Chat
            {
                ChatId = chatDto.ChatId,
                Date = chatDto.Date,
                Message = chatDto.Message,
                RoomId = chatDto.RoomId,
                Type = chatDto.Type,
                UserId = chatDto.UserId
            };

            return chat;
        }
        public static List<ChatDto> ChatsToChatsDto(List<Chat> chats)
        {
            List<ChatDto> chatsDto = new List<ChatDto>();
            chats.ForEach(chat =>
            {
                ChatDto chatDto = ChatToChatDto(chat);
                chatsDto.Add(chatDto);
            });

            return chatsDto;
        }
    }
}
