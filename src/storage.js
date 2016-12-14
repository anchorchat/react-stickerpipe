class Storage {
  constructor(userId) {
    Object.assign(this, { userId });
  }

  static storeItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn('Error while saving to localStorage.', err);
    }
  }

  static getItem(key) {
    let item = null;

    try {
      item = JSON.parse(localStorage.getItem(key));
    } catch (err) {
      console.warn('Error while retrieving item from localStorage.', err);
    }

    return item;
  }

  storePack(packName, packTitle, packStickers) {
    const stickers = packStickers.map(packSticker => (
      {
        image: packSticker.image,
        content_id: packSticker.content_id
      }
    ));

    const key = `${this.userId}-${packName}`;
    const value = {
      name: packName,
      title: packTitle,
      stickers
    };

    this.constructor.storeItem(key, value);
  }

  getPack(packName) {
    const key = `${this.userId}-${packName}`;

    return this.constructor.getItem(key);
  }

  storeMyPacks(packs) {
    const key = `${this.userId}-sticker-packs`;
    const value = packs.map(pack => (
      {
        pack_name: pack.pack_name,
        main_icon: pack.main_icon
      }
    ));

    this.constructor.storeItem(key, value);
  }

  getMyPacks() {
    const key = `${this.userId}-sticker-packs`;

    return this.constructor.getItem(key);
  }
}

export default Storage;
