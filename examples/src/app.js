import React from 'react';
import './app.css';
import StickerMenu from '../../lib/index';
import settings from './settings.json';

function App() {
  return (
    <section className="demo">
      <h1>React StickerPipe</h1>
      <StickerMenu apiKey={settings.apiKey} userId={settings.userId} />
    </section>
  );
}

export default App;
