import React, { ReactElement, useContext, useEffect } from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat/SidebarChat';
import { roomRes } from '../axios/types';
import axios from '../axios/axios';
import { DataLayerContext } from '../store/Context';
import { isMobile } from 'react-device-detect';

interface Props {
  switchToChatMode: Function
}

function Sidebar({ switchToChatMode }: Props): ReactElement {
  const [{ chatRooms }, dispatch] = useContext(DataLayerContext);

  useEffect(() => {
    axios.get<roomRes[]>('/api/v1/rooms')
      .then(res => {
        dispatch({ type: 'SET_CHAT_ROOMS', chatRooms: res.data })
      })
  }, [dispatch]);

  return (
    <div className={`sidebar ${isMobile && 'sidebar--mobile'}`}>
      <div className="sidebar__header">
        <Avatar src='https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/145157664/original/f51316a0de362f9fd056040d0fbc578bafcdf540/draw-cartoon-gaming-social-media-profile-picture.jpg' />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input type="text" placeholder='Search or start new chat' />
        </div>
      </div>

      <div className="sidebar__chats">
        {chatRooms && Object.keys(chatRooms).map(roomId => chatRooms[roomId]).sort((a, b) => {
          const first = a.lastMessage?.timestamp ? new Date(a.lastMessage.timestamp) : new Date(0);
          const second = b.lastMessage?.timestamp ? new Date(b.lastMessage.timestamp) : new Date(0);
          return  +second - +first ;
        }).map(chatRoom =>
          <SidebarChat
            onChatSelect={switchToChatMode}
            key={chatRoom._id}
            roomId={chatRoom._id}
            name={chatRoom.name}
            lastMessage={chatRoom.lastMessage?.message}
          />
        )}
        <SidebarChat
          name='Room name'
          addNewChart
        />
      </div>
    </div>

  )
}

export default Sidebar
