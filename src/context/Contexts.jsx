import React, { createContext } from 'react';
import { useState } from 'react';

export const OriginContext = createContext();
export const OriginContextProvider = (props) => {
  const [origin, setOrigin] = useState({
    latitude: null,
    longitude: null,
    adddress: '',
    name: '',
  });
  const [destination, setDestination] = useState({
    latitude: null,
    longitude: null,
    adddress: '',
    name: '',
  });
  const data = {
    origin,
    setOrigin,
    destination,
    setDestination,
  };
  return (
    <OriginContext.Provider value={data}>
      {props.children}
    </OriginContext.Provider>
  );
};
