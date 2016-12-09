import React from 'react';
import emojione from 'emojione';
import emojiList from './emoji.json';
import IconSticker from './icon-sticker';

function createMarkup(emoji) {
  return {
    __html: emojione.toImage(emoji)
  };
}

function EmojiPicker({ sendEmoji, showStickers }) {
  return (
    <div className="emoji-menu">
      <header><div onClick={showStickers}><IconSticker color="#00BCD4" /></div></header>
      <section>
        <h1>People</h1>
        <article>
          {emojiList.people.map(emoji => (
            <div
              className="emoji people"
              dangerouslySetInnerHTML={createMarkup(`:${emoji}:`)}
              onClick={() => sendEmoji(`:${emoji}:`)}
              key={`emoji-${emoji}`}
            />
          ))}
        </article>
        <h1>Nature</h1>
        <article>
          {emojiList.nature.map(emoji => (
            <div
              className="emoji nature"
              dangerouslySetInnerHTML={createMarkup(`:${emoji}:`)}
              onClick={() => sendEmoji(`:${emoji}:`)}
              key={`emoji-${emoji}`}
            />
          ))}
        </article>
      </section>
    </div>
  );
}

EmojiPicker.propTypes = {
  sendEmoji: React.PropTypes.func.isRequired,
  showStickers: React.PropTypes.func.isRequired
};

export default EmojiPicker;
