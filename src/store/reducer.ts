import { DataLayerState, DataLayerAction, chatRooms, chatRoom } from "./types";

export const reducer = (state: DataLayerState, action: DataLayerAction): DataLayerState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      }

    case 'SET_USER_ID_TOKEN':
      const user = state!.user;
      if (!user) return { ...state }
      return {
        ...state,
        user: {
          ...user,
          idToken: action.token
        }
      }

    case 'SET_CHAT_ROOMS':
      return {
        ...state,
        chatRooms: action.chatRooms.reduce((acc: chatRooms, cur) => {
          acc[cur._id] = {
            _id: cur._id,
            name: cur.name,
            lastMessage: {
              _id: cur.messages[0]?._id,
              message: cur.messages[0]?.message,
              room: cur.messages[0]?.room,
              timestamp: cur.messages[0]?.timestamp,
              user: cur.messages[0]?.user
            }
          };
          return acc;
        }, {})
      }

    case 'ADD_CHAT_ROOM':
      return {
        ...state,
        chatRooms: {
          ...state.chatRooms,
          [action.chatRoom._id]: {
            _id: action.chatRoom._id,
            name: action.chatRoom.name,
            lastMessage: {
              _id: action.chatRoom.messages[0]?._id,
              message: action.chatRoom.messages[0]?.message,
              room: action.chatRoom.messages[0]?.room,
              timestamp: action.chatRoom.messages[0]?.timestamp,
              user: action.chatRoom.messages[0]?.user
            }
          }
        }
      }

    case 'SET_CHAT_ROOM_LAST_MESSAGE':
      if (!state.chatRooms[action.roomId]) return { ...state }

      const updatedChatRoom: chatRoom = {
        ...state.chatRooms[action.roomId],
        lastMessage: action.message
      };

      return {
        ...state,
        chatRooms: {
          ...state.chatRooms,
          [action.roomId]: updatedChatRoom
        }
      }

    case 'SEARCH_CHAT_ROOM':
      const searchedRooms = Object.keys(state.chatRooms).filter(roomId => {
        const roomName = state.chatRooms[roomId].name;
        return roomName.toLowerCase()
          .match(
            new RegExp(action.search.toLowerCase())
          );
      }).map(roomId => state.chatRooms[roomId]);

      return {
        ...state,
        searchedRooms: searchedRooms
      }

    case 'SET_MESSAGES':
      return {
        ...state,
        messages: {
          [action.roomId]: action.messages
        }
      }

    case 'ADD_MESSAGE':
      if (!state.messages[action.roomId]) return { ...state };
      const updatedMessages = [...state.messages[action.roomId]];
      console.log('updated messages from reducer:', updatedMessages);
      updatedMessages.push(action.message);
      console.log(action.message);
      return {
        ...state,
        messages: {
          [action.roomId]: updatedMessages
        }
      }

    case 'SET_AUTH_MODE':
      return {
        ...state,
        authMode: action.authMode
      }

    default:
      return state;
  }
}
