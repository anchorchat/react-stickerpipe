import React from 'react';
import './app.css';
import StickerMenu from '../../lib/index';
import settings from './settings.json';

function App() {
  return (
    <StickerMenu apiKey={settings.apiKey} userId={settings.userId} />
  );
}

export default App;
