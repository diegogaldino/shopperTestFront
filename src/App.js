import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { Router } from './routes/Router';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router/>
    </ChakraProvider>
  );
}

export default App;
