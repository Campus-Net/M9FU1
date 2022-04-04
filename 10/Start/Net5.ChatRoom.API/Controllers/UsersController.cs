using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Net5.ChatRoom.Application;
using Net5.ChatRoom.Application.Dtos;

namespace Net5.ChatRoom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IChatApplicationService _chatApplicationService;

        public UsersController(IChatApplicationService chatApplicationService)
        {
            _chatApplicationService = chatApplicationService;
        }
        [HttpGet(Name = "ListUsers")]
        public IActionResult ListUsers()
        {
            return Ok(_chatApplicationService.ListUsers());

        }
        [HttpGet("{userId}", Name = "GetUserByUserId")]
        public IActionResult GetUserByUserId(int userId)
        {
            var user = _chatApplicationService.GetUserByUserId(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        [HttpPost]
        public IActionResult InsertUser([FromBody] UserDto user)
        {
            if (_chatApplicationService.UserExists(user.Email))
            {
                return Conflict();
            }
            else
            {
                user = _chatApplicationService.InsertUser(user);
                return CreatedAtAction("GetUserByUserId", new { userId = user.UserId }, user);
            }
        }
        [HttpPut("{userId}", Name = "UpdateUser")]
        public IActionResult UpdateUser(int userId, [FromBody] UserDto user)
        {
            if (!_chatApplicationService.UserExists(userId))
            {
                return NotFound();
            }

            user = _chatApplicationService.UpdateUser(userId, user);

            if (user != null)
            {
                return CreatedAtRoute("GetUserByUserId", new { userId = userId }, user);
            }

            return NoContent();
        }
        [HttpDelete("{userId}", Name = "DeleteUser")]
        public IActionResult DeleteUser(int userId)
        {
            if (!_chatApplicationService.UserExists(userId))
            {
                return NotFound();
            }

            var user = _chatApplicationService.DeleteUser(userId);
            if (user == null)
            {
                return NotFound();
            }

            return NoContent();
        }
        [HttpPost("validate-login")]
        public IActionResult ValidateLogin([FromBody] UserDto user)
        {
            return Ok(_chatApplicationService.ValidateLogin(user));
        }
    }
}
