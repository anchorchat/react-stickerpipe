import React from 'react';
import './app.css';
import StickerMenu from '../../lib/index';
import settings from './settings.json';

function App() {
  return (
    <section className="demo">
      <StickerMenu apiKey={settings.apiKey} userId={settings.userId} />
    </section>
  );
}

export default App;
