using Microsoft.AspNetCore.SignalR;
namespace SafeLine.Server.Hubs
{
    public class SafeLineHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        // user channel join
        public async Task JoinChannel(string channelName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, channelName);
            await Clients.Group(channelName).SendAsync("ReceiveMessage", "System", $"{Context.ConnectionId} joined {channelName}");
        }

        // user channel leave
        public async Task LeaveChannel(string channelName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, channelName);
            await Clients.Group(channelName).SendAsync("ReceiveMessage", "System", $"{Context.ConnectionId} left {channelName}");
        }

        // send message to channel
        public async Task SendMessageToChannel(string channelName, string user, string message)
        {
            await Clients.Group(channelName).SendAsync("ReceiveMessage", user, message);
        }
    }
}
