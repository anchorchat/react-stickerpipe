import React, { Component } from 'react';

class StickerPackPreview extends Component {
  render() {
    const { preview } = this.props;

    return (
      <section>
        <h1>Preview</h1>
        <section>
          <h1>{preview.title}</h1>
          <img src={preview.preview.hdpi} alt={preview.title} />
        </section>
      </section>
    );
  }
}

StickerPackPreview.propTypes = {
  preview: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    pack_name: React.PropTypes.string.isRequired,
    preview: React.PropTypes.shape({
      mdpi: React.PropTypes.string.isRequired,
      hdpi: React.PropTypes.string.isRequired
    })
  })
};

export default StickerPackPreview;
