using Net5.ChatRoom.Application.Dtos;
using System.Collections.Generic;

namespace Net5.ChatRoom.Application
{
    public interface IChatApplicationService
    {
        UserDto DeleteUser(int userId);
        bool UserExists(string email);
        RoomDto GetRoomByRoomId(int roomId);
        RoomDto GetRoomByRoomName(string roomName);
        RoomUserDto GetRoomUserByRoomIdAndUserId(int roomId, int userId);
        UserDto GetUserByEmail(string email);
        UserDto GetUserByUserId(int userId);
        ChatDto InsertChat(ChatDto chatDto);
        RoomDto InsertRoom(RoomDto roomDto);
        RoomUserDto InsertRoomUser(RoomUserDto roomUserDto);
        UserDto InsertUser(UserDto userDto);
        List<ChatDto> ListChatByRoomId(int roomId);
        List<RoomDto> ListRooms();
        List<UserDto> ListUsersByRoomId(int roomId);
        List<UserDto> ListUsersByRoomIdAndStatus(int roomId, string status);
        List<UserDto> ListUsersByRoomIdAndUserIdAndStatus(int roomId, int userId, string status);
        RoomUserDto UpdateRoomUser(RoomUserDto roomUserDto);
        UserDto UpdateUser(int userId, UserDto userDto);
        RoomDto UpdateRoom(int roomId, RoomDto roomDto);
        bool UserExists(int userId);
        List<UserDto> ListUsers();        
        UserDto ValidateLogin(UserDto user);
        RoomUserDto GetRoomUserByRoomIdAndUserIdAndStatus(int roomId, int userId, string status);
    }
}