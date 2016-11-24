class Storage {
  constructor(userId) {
    Object.assign(this, { userId });
  }

  storePack(packName, packTitle, packStickers) {
    const stickers = packStickers.map(packSticker => (
      {
        image: packSticker.image,
        content_id: packSticker.content_id
      }
    ));

    try {
      const key = `${this.userId}-${packName}`;
      const data = {
        name: packName,
        title: packTitle,
        stickers
      };

      const value = JSON.stringify(data);

      localStorage.setItem(key, value);
    } catch (err) {
      console.warn('Error while saving to localStorage.', err);
    }
  }

  getPack(packName) {
    try {
      const key = `${this.userId}-${packName}`;

      const storedPack = JSON.parse(localStorage.getItem(key));

      return storedPack;
    } catch (err) {
      console.warn('Error while retrieving item from localStorage.', err);
    }

    return null;
  }
}

export default Storage;
