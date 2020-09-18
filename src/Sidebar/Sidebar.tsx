import React, { ReactElement } from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat/SidebarChat';

interface Props {
  toggleContent: Function;
}

function Sidebar({ toggleContent }: Props): ReactElement {
  return (
    <div className='sidebar'>
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
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>

  )
}

export default Sidebar
