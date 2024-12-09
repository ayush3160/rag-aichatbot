import React from 'react';
import { ChatWidget } from './components/ChatWidget';

function App() {
  const baseUrl = process.env.VITE_REACT_APP_API_URL
  console.log(baseUrl);
  
  return <ChatWidget />;
}

export default App;