using Net5.ChatRoom.Application.Adapters;
using Net5.ChatRoom.Application.Dtos;
using Net5.ChatRoom.Infrastructure.Data.Entities;
using Net5.ChatRoom.Infrastructure.Data.Repositories;
using System;
using System.Collections.Generic;

namespace Net5.ChatRoom.Application
{
    public class ChatApplicationService : IChatApplicationService
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoomRepository _roomRepository;
        private readonly IChatRepository _chatRepository;
        private readonly IRoomUserRepository _roomUserRepository;
        public ChatApplicationService(
            IUserRepository userRepository,
            IRoomRepository roomRepository,
            IChatRepository chatRepository,
            IRoomUserRepository roomUserRepository)
        {
            _userRepository = userRepository;
            _roomRepository = roomRepository;
            _chatRepository = chatRepository;
            _roomUserRepository = roomUserRepository;
        }
        public UserDto GetUserByEmail(string email)
        {
            User userFromRepository = _userRepository.GetByEmail(email);
            UserDto user = ChatAdapter.UserToUserDto(userFromRepository);
            return user;
        }
        public List<UserDto> ListUsersByRoomIdAndUserIdAndStatus(int roomId, int userId, string status)
        {
            List<User> usersFromRepository = _userRepository.ListUsersByRoomIdAndUserIdAndStatus(roomId, userId, status);
            List<UserDto> users = ChatAdapter.UsersToUsersDto(usersFromRepository);
            return users;
        }

        public List<UserDto> ListUsersByRoomId(int roomId)
        {
            List<User> usersFromRepository = _userRepository.ListUsersByRoomId(roomId);
            List<UserDto> users = ChatAdapter.UsersToUsersDto(usersFromRepository);
            return users;
        }
        public List<UserDto> ListUsersByRoomIdAndStatus(int roomId, string status)
        {
            List<User> usersFromRepository = _userRepository.ListUsersByRoomIdAndStatus(roomId, status);
            List<UserDto> users = ChatAdapter.UsersToUsersDto(usersFromRepository);
            return users;
        }
        public UserDto InsertUser(UserDto userDto)
        {
            User user = ChatAdapter.UserDtoToUser(userDto);
            user = _userRepository.Insert(user);
            userDto = ChatAdapter.UserToUserDto(user);
            return userDto;
        }
        public UserDto UpdateUser(int userId, UserDto userDto)
        {
            User user = ChatAdapter.UserDtoToUser(userDto);
            user = _userRepository.Update(userId, user);
            userDto = ChatAdapter.UserToUserDto(user);
            return userDto;
        }
        public UserDto DeleteUser(int userId)
        {
            User user = _userRepository.Delete(userId);
            UserDto userDto = ChatAdapter.UserToUserDto(user);
            return userDto;
        }

        public RoomDto GetRoomByRoomId(int roomId)
        {
            Room roomFromRepository = _roomRepository.GetByRoomId(roomId);
            RoomDto room = ChatAdapter.RoomToRoomDto(roomFromRepository);
            return room;
        }
        public RoomDto GetRoomByRoomName(string roomName)
        {
            Room roomFromRepository = _roomRepository.GetByRoomName(roomName);
            RoomDto room = ChatAdapter.RoomToRoomDto(roomFromRepository);
            return room;
        }
        public List<RoomDto> ListRooms()
        {
            List<Room> roomsFromRepository = _roomRepository.ListRooms();
            List<RoomDto> rooms = ChatAdapter.RoomsToRoomsDto(roomsFromRepository);
            return rooms;
        }
        public RoomDto InsertRoom(RoomDto roomDto)
        {
            Room room = ChatAdapter.RoomDtoToRoom(roomDto);
            room = _roomRepository.Insert(room);
            roomDto = ChatAdapter.RoomToRoomDto(room);

            return roomDto;
        }

        public List<ChatDto> ListChatByRoomId(int roomId)
        {
            List<Chat> chatsFromRepository = _chatRepository.ListByRoomId(roomId);
            List<ChatDto> chats = ChatAdapter.ChatsToChatsDto(chatsFromRepository);
            return chats;
        }
        public ChatDto InsertChat(ChatDto chatDto)
        {
            Chat chat = ChatAdapter.ChatDtoToChat(chatDto);
            chat = _chatRepository.Insert(chat);
            chatDto = ChatAdapter.ChatToChatDto(chat);

            return chatDto;
        }

        public RoomUserDto GetRoomUserByRoomIdAndUserId(int roomId, int userId)
        {
            RoomUser roomUserFromRepository = _roomUserRepository.GetByRoomIdAndUserId(roomId, userId);
            RoomUserDto roomUser = ChatAdapter.RoomUserToRoomUserDto(roomUserFromRepository);
            return roomUser;
        }
        public RoomUserDto InsertRoomUser(RoomUserDto roomUserDto)
        {
            RoomUser roomUser = ChatAdapter.RoomUserDtoToRoomUser(roomUserDto);
            roomUser = _roomUserRepository.Insert(roomUser);
            roomUserDto = ChatAdapter.RoomUserToRoomUserDto(roomUser);

            return roomUserDto;
        }
        public RoomUserDto UpdateRoomUser(RoomUserDto roomUserDto)
        {
            RoomUser roomUserFromRepository = _roomUserRepository.GetByRoomIdAndUserId(roomUserDto.RoomId, roomUserDto.UserId);
            int roomUserId = roomUserDto.RoomId;
            RoomUser roomUser = ChatAdapter.RoomUserDtoToRoomUser(roomUserDto);
            roomUser = _roomUserRepository.Update(roomUserId, roomUser);
            roomUserDto = ChatAdapter.RoomUserToRoomUserDto(roomUser);

            return roomUserDto;
        }
    }
}
