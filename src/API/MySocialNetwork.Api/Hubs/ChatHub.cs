namespace MySocialNetwork.Api.Hubs
{
    using Microsoft.AspNetCore.SignalR;
    using MySocialNetwork.Core.Configuration;

    public class ChatHub : Hub
    {
        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
            await Clients.Group(userConnection.Room).SendAsync("resciveMessage");
        }

        public async Task SendPrivateMessage(string message, string userId)
        {
            await Clients.User(userId).SendAsync("ResciveMessage", message);
        }
    }
}
