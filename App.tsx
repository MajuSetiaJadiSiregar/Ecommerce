

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './src/navigation/Stack';
import { Provider } from 'react-redux';
import { store } from './src/store';



function App(): React.JSX.Element {
  return (
    <Provider store={store}>

   
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
    </Provider>
  );
}


export default App;
