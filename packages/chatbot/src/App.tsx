import React from 'react';
import { ChatWidget } from './components/ChatWidget';

function App({ projectId } : { projectId : string }) {
  const baseUrl = process.env.VITE_REACT_APP_API_URL
  console.log(baseUrl);
  
  return <ChatWidget projectId = {projectId}/>;
}

export default App;