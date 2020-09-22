import { Avatar, Button, IconButton } from '@material-ui/core';
import React, { ReactElement, useCallback, useContext, useEffect, useRef, useState } from 'react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './Chat.css';
import ChatMessage from './ChatMessage/ChatMessage';
import axios from '../axios/axios';
import { DataLayerContext } from '../store/Context';
import { useLocation, useParams } from 'react-router-dom';
import { messageRes } from '../axios/types';
import Pusher from 'pusher-js';
import { isMobile } from 'react-device-detect';

interface Props {
  switchToSidebarMode: Function
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Chat({ switchToSidebarMode }: Props): ReactElement {
  const [{ messages, user }, dispatch] = useContext(DataLayerContext);
  const [input, setInput] = useState<string>('');
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const { id: roomId } = useParams<any>();
  const query = useQuery();

  useEffect(function pusherLogic() {
    const pusher = new Pusher('e423d5e59cc0580b5d3c', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe(`channel_${roomId}`);
    channel.bind('inserted', (newMessage: messageRes) => {

      if (newMessage) {
        dispatch({
          type: 'ADD_MESSAGE',
          message: newMessage,
          roomId
        });
        dispatch({
          type: 'SET_CHAT_ROOM_LAST_MESSAGE',
          message: newMessage,
          roomId
        })
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [roomId, dispatch]);


  useEffect(function fetchChatMessages() {
    if (!roomId) return;
    if (messages[roomId]) return;
    axios.get<messageRes[]>(`/api/v1/messages/${roomId}`).then(res => {
      const fetchedMessages = res.data;
      dispatch({
        type: 'SET_MESSAGES',
        messages: fetchedMessages,
        roomId: roomId
      });
    })
  }, [roomId, messages, dispatch]);

  const scrollToBottom = useCallback(() => {
    if (!chatBodyRef.current) return;
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, [chatBodyRef]);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const sendMessage = useCallback(async (e: any) => {
    e.preventDefault();
    await axios.post(`/api/v1/messages/${roomId}`, {
      message: input,
      user: user?._id ?? '5f669c2dc8dfe836dc995043',
      timestamp: new Date().toUTCString(),
    });
    setInput('');
    scrollToBottom();
  }, [scrollToBottom, input, user])
  console.log('user from chat', user)
  return (
    <div className={`chat ${isMobile && 'chat--mobile'}`}>
      <div className="chat__header">
        {isMobile && <IconButton onClick={() => switchToSidebarMode()}>
          <ArrowBackIcon />
        </IconButton>}
        <Avatar src={query.get('avatar') || `https://avatars.dicebear.com/api/human/400.svg`} />

        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at ...</p>
        </div>

        <div className={`chat__headerRight ${isMobile && 'chat__headerRight--mobile'}`}>
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

        {messages && roomId && messages[roomId]?.map(message => (
          <ChatMessage
            key={message._id}
            received={message.user._id === user?._id}
            name={message.user.name}
            timestamp={new Date(message.timestamp).toUTCString()}
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
