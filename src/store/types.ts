import { messageRes, roomRes, userRes } from "../axios/types"

export type user = {
  _id: string,
  name: string,
  uid: string,
  idToken?: string,
}

export type chatRoom = {
  _id: string,
  name: string,
  lastMessage?: message,
}
export type chatRooms ={
  [chatRoomId: string]: chatRoom
}

export type message = {
  _id: string,
  message: string,
  user: userRes,
  room: string,
  timestamp: string,
}
export type messages =  {
  [chatRoomId: string]: message[]
}

export interface DataLayerState {
  user?: user,
  chatRooms: chatRooms,
  messages: messages,
  searchedRooms: chatRoom[]
}

export type DataLayerAction = {
  type: 'SET_USER',
  user: user
} | {
  type: 'SET_USER_ID_TOKEN',
  token: string,
} | {
  type: 'SET_CHAT_ROOMS',
  chatRooms: roomRes[]
} | {
  type: 'ADD_CHAT_ROOM',
  chatRoom: roomRes
} | {
  type: 'SEARCH_CHAT_ROOM',
  search: string
} | {
  type: 'SET_CHAT_ROOM_LAST_MESSAGE',
  roomId: string,
  message: message,
} | {
  type: 'SET_MESSAGES',
  roomId: string,
  messages: messageRes[]
} | {
  type: 'ADD_MESSAGE',
  roomId: string,
  message: messageRes
};
