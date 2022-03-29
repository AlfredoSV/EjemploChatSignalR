using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EjemploChatSignalR.Hubs
{
    public class ChatHub:Hub
    {
        public async void EnviarMensaje(string usuario, string mensaje)
        {
            await Clients.All.SendAsync("RecibirMensaje", usuario, mensaje);
        }
    }
}
