import React, { useState } from "react";

const SocketContext = React.createContext();

const SocketState = {
  Initial: 'Initial',
  Connected: 'Connected',
  Reconnecting: 'Reconnecting',
  Closed: 'Closed'
};

const SocketProvider = ({ children }) => {
  var socket;

  let [socketState, setSocketState] = useState(SocketState.Initial)
  const user = localStorage.getItem('user')

  const onMessage = (evt) => {
    console.log("Received message!")
  };

  const onClose = (evt) => {
    console.log('Socket closed!')
    setSocketState(SocketState.Closed)
  }

  const onOpen = (evt) => {
    console.log('Connected!')
    setSocketState(SocketState.Connected)
  }

  const onError = (evt) => {
    console.log('Socket closed! Reconnecting.....')
    setSocketState(SocketState.Reconnecting)
    setInterval(() => reconnect(), 5000)
  }

  const reconnect = () => {
    connect();
  }

  const disconnect = () => {
    socket.close();
    console.log('Disconnected!')
  }

  const connect = (token) => {
    socket = new WebSocket(`ws://localhost:8000?token=${token}`);
    socket.onopen = (evt) => onOpen(evt);
    socket.onmessage = (evt) => onMessage(evt);
    socket.onclose = (evt) => onClose(evt);
    socket.onError = (evt) => onError(evt);
  };

  if(localStorage.getItem("user") && socketState !== SocketState.Connected) {
      connect(JSON.parse(user).access)
  }

  return (
    <SocketContext.Provider
      value={{ connect, disconnect }}
    >
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => {
  const context = React.useContext(SocketContext);
  return context;
};

export { SocketProvider, useSocket };
