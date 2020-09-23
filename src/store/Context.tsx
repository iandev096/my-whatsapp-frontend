import { createContext } from 'react';
import { DataLayerState, DataLayerAction } from './types';

export const initialDataLayerState: DataLayerState = {
  user: undefined,
  chatRooms: {},
  messages: {},
  searchedRooms: [],
  authMode: undefined 
};

export const DataLayerContext = createContext<[
  DataLayerState,
  React.Dispatch<DataLayerAction>
]>([initialDataLayerState, () => { }]);
