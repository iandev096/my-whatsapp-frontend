import { Avatar, Button, IconButton } from '@material-ui/core';
import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';
import { MessageRes } from '../types';
import ChatMessage from './ChatMessage/ChatMessage';
import axios from '../axios';

interface Props {
  messages: MessageRes[],
  toggleContent: Function
}

function Chat({ messages, toggleContent }: Props): ReactElement {
  const [input, setInput] = useState<string>('');
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (!chatBodyRef.current) return;
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, [chatBodyRef.current]);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const sendMessage = useCallback(async (e: any) => {
    e.preventDefault();
    await axios.post('/api/v1/messages/new', {
      message: input,
      name: "Marcus Lionix",
      timestamp: new Date().toUTCString(),
      received: true
    });
    setInput('');
    scrollToBottom();
  }, [scrollToBottom, input])

  return (
    <div className='chat'>
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at ...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>

      </div>
      <div className="chat__body" ref={chatBodyRef}>

        {messages?.map((message, idx) => (
          <ChatMessage
            key={message.message + idx}
            received={message.received}
            name={message.name}
            timestamp={new Date().toUTCString()}
            message={message.message}
          />
        ))}

      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            placeholder='Type a message'
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <Button
            type='submit'
            onClick={sendMessage}>Send a message</Button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default Chat
