export class WTUtils {


  static setLocalStorage = (name, _value = null) => {
    if (name) {
      if (_value) {
        try {
          const value = Array.isArray(_value)
            ? JSON.stringify(_value)
            : typeof _value == 'object'
              ? JSON.stringify({ ..._value })
              : _value;
          window.localStorage.setItem(name, value);
        } catch (e) {}
      } else {
        window.localStorage.removeItem(name)
      }
    }
  }

  static timeout = (ms) => {
    return new Promise((resolve, _) => setTimeout(() => resolve(), ms));
  }

  static getLocalStorage = (name) => {
    try {
      const value = window.localStorage.getItem(name);
      if (value && this.isJSON(value)) {
        return JSON.parse(value);
      }
      return value ? value : null;
    } catch (e) {
      return null;
    }
  }

  static setCookie = (name, value, days) => {
    // var domain = (location.host.match(/([^.]+)\.\w{2,3}(?:\.\w{2})?$/) || [])[1];
    var expires;
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toGMTString();
    } else {
      expires = '';
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  }

  static getCookie =  (cName) => {
    if (document.cookie.length > 0) {
      var cStart = document.cookie.indexOf(cName + '=');
      if (cStart !== -1) {
        cStart = cStart + cName.length + 1;
        var cEnd = document.cookie.indexOf(';', cStart);
        if (cEnd === -1) {
          cEnd = document.cookie.length;
        }
        return unescape(document.cookie.substring(cStart, cEnd));
      }
    }
    return '';
  }


  static  isJSON = (value) => {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
};

static each = function (object, callback) {
    try{
      Object.keys(object).forEach(function (item) {
        const c = callback(item, object[item]);
        if (c === false) {
          throw new Error();
        }
      });
    }catch(e){
    }

  }


  static deepClone = (obj, infinityLinks = []) => {
  let copy;
  if (null == obj || 'object' !== typeof obj) {
    return obj;
  }
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = this.deepClone(obj[i], infinityLinks);
    }
    return copy;
  }
  if (obj instanceof Object) {
    copy = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (infinityLinks.indexOf(key) > -1) {
          copy[key] = obj[key];
        } else {
          copy[key] = this.deepClone(obj[key], infinityLinks);
        }
      }
    }
    return copy;
  }
};


}
