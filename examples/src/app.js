import React from 'react';
import './app.css';
import StickerMenu from '../../lib/index';
import settings from './settings.json';

function App() {
  return (
    <section className="demo">
      <h1>
        <a
          href="https://github.com/anchorchat/react-stickerpipe"
          target="_blank"
          rel="noopener noreferrer"
        >
          React StickerPipe
        </a>
      </h1>
      <StickerMenu apiKey={settings.apiKey} userId={settings.userId} />
    </section>
  );
}

export default App;
