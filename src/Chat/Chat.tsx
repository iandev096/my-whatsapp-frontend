import { Avatar, Button, IconButton } from '@material-ui/core';
import React, { ReactElement } from 'react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';

interface Props {

}

function Chat({ }: Props): ReactElement {
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
      <div className="chat__body">
        <p className='chat__message'>
          <span className='chat__name'>Ianidic⚡</span>
            This is a message 😁
            <span className="chat__timestamp">
            {new Date().toUTCString()}
          </span>
        </p>

        <p className='chat__message chat__receiver'>
          <span className='chat__name'>Ianidic⚡</span>
            This is a message 😁
            <span className="chat__timestamp">
            {new Date().toUTCString()}
          </span>
        </p>

        <p className='chat__message'>
          <span className='chat__name'>Ianidic⚡</span>
            This is a message 😁
            <span className="chat__timestamp">
            {new Date().toUTCString()}
          </span>
        </p>
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form action="">
          <input
            placeholder='Type a message'
            type="text"
          />
          <Button>Send a message</Button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default Chat
