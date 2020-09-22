import { Avatar } from '@material-ui/core';
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from '../../axios/axios';
import { roomRes } from '../../axios/types';
import { DataLayerContext } from '../../store/Context';
import './SidebarChat.css';

interface Props {
  name: string;
  roomId?: string;
  lastMessage?: string;
  addNewChart?: boolean;
  onChatSelect?: Function;
}

function SidebarChat({ addNewChart, name, lastMessage, roomId, onChatSelect }: Props): ReactElement {
  const [avatarSeed, setAvatarSeed] = useState<number>();
  const [, dispatch] = useContext(DataLayerContext);
  const history = useHistory();

  useEffect(() => {
    setAvatarSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat", name);
    if (roomName) {
      axios.post<roomRes>('/api/v1/rooms/new', {
        name: roomName
      }).then(res => {
        const room = res.data;
        dispatch({type: 'ADD_CHAT_ROOM', chatRoom: room});
        alert(`${roomName} room added`);
      }).catch(err => {
        alert(`${roomName} room not added`);
      })
    }
  }

  const chatSelectedHander = (avatarUri: string) => {
    if (onChatSelect) onChatSelect();
    history.push(`/chats/${roomId}?avatar=${avatarUri}`);
  }

  return (
    <>
      {!addNewChart ?
        <div className='sidebarChat' onClick={() => chatSelectedHander(`https://avatars.dicebear.com/api/human/${avatarSeed}.svg`)}>
          <Avatar src={`https://avatars.dicebear.com/api/human/${avatarSeed}.svg`} />
          <div className="sidebarChat__info">
            <h2>{name}</h2>
            <p>{lastMessage}</p>
          </div>
        </div> :
        <div className='sidebarChat' onClick={() => createChat()}>
          <h2>Add new chat</h2>
        </div>
      }
    </>
  )
}

export default SidebarChat
