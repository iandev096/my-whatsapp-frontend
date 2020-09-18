import { Avatar } from '@material-ui/core';
import React, { ReactElement } from 'react'
import './SidebarChat.css';
interface Props {

}

function SidebarChat({  }: Props): ReactElement {
  return (
    <div className='sidebarChat'>
      <Avatar />
      <div className="sidebarChat__info">
        <h2>Room name</h2>
        <p>This is the last message</p>
      </div>
    </div>
  )
}

export default SidebarChat
