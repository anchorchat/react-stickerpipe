import React from 'react';
import emojione from 'emojione';
import emojiList from './emoji.json';

function createMarkup(emoji) {
  return {
    __html: emojione.toImage(emoji)
  };
}

function EmojiPicker({ sendEmoji }) {
  return (
    <div className="emoji-menu">
      <header><h1>People</h1></header>
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
      <header><h1>Nature</h1></header>
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
    </div>
  );
}

EmojiPicker.propTypes = {
  sendEmoji: React.PropTypes.func.isRequired
};

export default EmojiPicker;
