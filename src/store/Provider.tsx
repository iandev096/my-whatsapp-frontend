import React, { useReducer } from 'react';
import { DataLayerContext, initialDataLayerState } from './Context';
import { reducer } from './reducer';

interface ProviderProps {

}

export const Provider: React.FC<ProviderProps> = ({ children }) => {

  return (
    <DataLayerContext.Provider value={useReducer(reducer, initialDataLayerState)}>
      {children}
    </DataLayerContext.Provider>
  );
};
