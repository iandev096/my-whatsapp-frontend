import React, { useState } from 'react';
import { useEffect } from 'react';
import Pusher from 'pusher-js';
import './App.css';
import Chat from './Chat/Chat';
import Sidebar from './Sidebar/Sidebar';
import axios from './axios';
import { Content, MessageRes } from './types';

function App() {
  const [contentShowing, setContentShowing] = useState<Content>('chatRooms');
  const [messages, setMessages] = useState<MessageRes[]>([]);
  const [channelName, setChannelName] = useState('messages');

  console.log(messages);
  useEffect(() => {
    axios.get('/api/v1/messages/sync')
      .then(res => {
        setMessages(res.data);
      })
  }, []);

  useEffect(() => {
    const pusher = new Pusher('e423d5e59cc0580b5d3c', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe(channelName);
    channel.bind('inserted', (newMessage: MessageRes) => {
      if (newMessage) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [channelName]);

  const toggleContent = () => {
    setContentShowing(prev => prev === 'chatRooms' ? 'chats' : 'chatRooms');
  }

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar toggleContent={() =>toggleContent()} />
        <Chat toggleContent={() => toggleContent()} messages={messages} />
      </div>
    </div>
  );
}

export default App;
