using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Net5.ChatRoom.Infrastructure.Data.Context;
using Net5.ChatRoom.Infrastructure.Data.Entities;

namespace Net5.ChatRoom.Infrastructure.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ChatRoomContext _context;
        public UserRepository(ChatRoomContext context)
        {
            _context = context;
        }
        public User GetByEmail(string email)
        {
            var query = from u in _context.Users
                        where u.Email == email
                        select u;

            User user = query.FirstOrDefault();

            return user;
        }
        public List<User> ListUsersByRoomId(int roomId)
        {
            var query = from ru in _context.RoomUsers
                        join u in _context.Users
                        on ru.UserId equals u.UserId
                        where ru.RoomId == roomId
                        select u;

            List<User> users = query.ToList();

            return users;
        }
        public List<User> ListUsersByRoomIdAndStatus(int roomId, string status)
        {
            var query = from u in _context.Users
                        join ru in _context.RoomUsers
                        on u.UserId equals ru.UserId
                        where ru.RoomId == roomId && ru.Status == status
                        select u;

            List<User> users = query.ToList();

            return users;
        }
        public List<User> ListUsersByRoomIdAndUserIdAndStatus(int roomId, int userId, string status)
        {
            var query = from u in _context.Users
                        join ru in _context.RoomUsers
                        on u.UserId equals ru.UserId
                        where ru.RoomId == roomId && ru.UserId == userId && ru.Status == status
                        select u;

            List<User> users = query.ToList();

            return users;
        }

        public User GetByUserId(int userId)
        {
            var query = from u in _context.Users
                        where u.UserId == userId
                        select u;

            User user = query.FirstOrDefault();

            return user;
        }
        public User Insert(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
        }
        public User Update(int userId, User user)
        {
            User userUpdated = _context.Users.FirstOrDefault(u => u.UserId == userId);
                        
            userUpdated.FirstName = user.FirstName;
            userUpdated.LastName = user.LastName;
            userUpdated.Email = user.Email;
            userUpdated.Address = user.Address;
            userUpdated.DateOfBirth = user.DateOfBirth;
            userUpdated.Sex = user.Sex;

            _context.Users.Update(userUpdated);
            _context.SaveChanges();

            return userUpdated;
        }
        public User Delete(int userId)
        {
            User userDeleted = _context.Users.FirstOrDefault(u => u.UserId == userId);

            _context.Users.Remove(userDeleted);
            _context.SaveChanges();

            return userDeleted;
        }
    }
}
