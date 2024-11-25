
export const WTEventListener = {

  addListener: function (object, fn) {
    this._eKeys = this._eKeys || [];
    this._eValues = this._eValues || [];
    if (!fn) return this;
    var i = this._eKeys.findIndex(
      (el) => {
        return el === object;
      });

    if (i < 0) {
      this._eKeys.push(object);
      this._eValues.push(fn.bind(object));
    }

    return this;
  },

  removeListener: function (object) {
    this._eKeys = this._eKeys || [];
    this._eValues = this._eValues || [];
    const i = this._eKeys.findIndex((el) => { return el === object; });
    if (i >= 0) {
      this._eKeys.splice(i, 1);
      this._eValues.splice(i, 1);
    }

    return this;
  },

  triggerEvent: function (event, opts = {}) {
    this._eKeys = this._eKeys || [];
    this._eValues = this._eValues || [];
    for (var i = 0, len = this._eKeys.length; i < len; ++i) {
      if (this._eValues[i]) {
        this._eValues[i].apply(this, [event, opts]);
      }
    }

    return this;
  },

};
