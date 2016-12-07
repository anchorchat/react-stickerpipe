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

  storeMyPacks(packs) {
    try {
      const key = `${this.userId}-sticker-packs`;
      const data = packs.map(pack => (
        {
          pack_name: pack.pack_name,
          main_icon: pack.main_icon
        }
      ));

      const value = JSON.stringify(data);

      localStorage.setItem(key, value);
    } catch (err) {
      console.warn('Error while saving to localStorage.', err);
    }
  }

  getMyPacks() {
    try {
      const key = `${this.userId}-sticker-packs`;

      const storedPacks = JSON.parse(localStorage.getItem(key));

      return storedPacks;
    } catch (err) {
      console.warn('Error while retrieving item from localStorage.', err);
    }

    return null;
  }
}

export default Storage;
