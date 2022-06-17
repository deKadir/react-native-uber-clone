import 'react-native-gesture-handler';
import React from 'react';
import RootNavigator from './src/navigations/RootNavigator';
import { OriginContextProvider } from './src/context/Contexts';

const App = () => {
  return (
    <OriginContextProvider>
      <RootNavigator />
    </OriginContextProvider>
  );
};

export default App;
