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
    }
}
