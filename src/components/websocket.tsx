"use client"
import { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext<{
  addMessageListener(cb: any): void,
  removeMessageListener(cb: any): void,
  sendMessage(msg:any): void
}>({
  addMessageListener: () => { },
  removeMessageListener: () => { },
  sendMessage:()=>{}
});

export const WebSocketProvider = ({ url, children }: any) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messageListeners, setMessageListeners] = useState<any[]>([]);

  const addMessageListener = (listener: any) => {
    setMessageListeners(oldVal=>[...oldVal, listener]);
  }, removeMessageListener = (listener: string) => {
    let list = messageListeners;

    // 移除值为 'banana' 的元素
    let index = list.indexOf(listener);
    if (index !== -1) {
      list.splice(index, 1);
      setMessageListeners(list)
    }
  }, sendMessage = (message:any) => {
    if (socket) {
      socket.send(JSON.stringify(message));
    }
  };

  useEffect(() => {
    const newSocket = new WebSocket(url);

    newSocket.addEventListener('open', () => {
      console.log('WebSocket connected');
    });

    newSocket.addEventListener('close', () => {
      console.log('WebSocket closed');
    });

    newSocket.addEventListener('message', (event) => {
      const receivedMessage = event.data;
      messageListeners.forEach((listener) => listener(receivedMessage));
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [url, messageListeners]);

  const contextValue = {
    addMessageListener,
    removeMessageListener,
    sendMessage
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);