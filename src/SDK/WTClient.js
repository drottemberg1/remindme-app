import axios from 'axios';
import moment from 'moment-timezone';

import {WTUser, WTUtils, WTException, WTEvent, WTReminder} from "./"
import {WTEventListener} from "./listener/WTEventListener"

import { WTConfig } from '../config/WTConfig';

export class WTClient {
  constructor (opts = {}) {

    const instance = this.constructor.instance;


    if (instance) {
      return instance;
    }

    this.constructor.instance = this;

    // Configs
    // Properties

    if('initParameters' in opts){
      Object.assign(this,opts.initParameters);
    }


    this.authenticated = false;

    this.user = new WTUser();

    this.reminders = {};

    // Event Listener
    this.addListener = WTEventListener.addListener;
    this.removeListener = WTEventListener.removeListener;
    this.triggerEvent = WTEventListener.triggerEvent;

    this.auth_token = ('auth_token' in opts) ? this.setAuthToken(opts.auth_token) : this.getAuthToken();

  }


  initWithData (data){
    if ('user' in data) this.user = new WTUser(data.user);
  }


  setAuthToken (token) {
      this.auth_token = token;
      WTUtils.setCookie('wt_token', token, 365);
  }
  setRefreshToken (token) {
      this.refresh_token = token;
      WTUtils.setLocalStorage('wt_refresh', token);
  }


  getAuthToken () {
    if (WTUtils.getCookie('wt_token')) {
      return WTUtils.getCookie('wt_token');
    } else {
      return null;
    }
  }

  getRefreshToken () {
    if (WTUtils.getLocalStorage('wt_refresh')) {
      return WTUtils.getLocalStorage('wt_refresh');
    } else {
      return null;
    }
  }

  removeToken () {
    this.auth_token = null;
    WTUtils.setCookie('wt_token', null, -1);
  }

  removeRefreshToken () {
    this.refresh_token = null;
    WTUtils.setLocalStorage('wt_refresh', null);
  }

async renewToken () {
  var params = {};
  this.setAuthToken(this.getRefreshToken());
  const data = await this.putAPI('session', params);
  this.setAuthToken(data.access_token);
  return data;
}


async connect (callback) {
    var params = {};
    const data = await this.getAPI('session', params);
    this.initWithData(data);
    this.triggerEvent(WTEvent.app_connect);

  }


  async logout(){

    var params = {};
    const data = await this.deleteAPI('session', params);
    this.removeToken();
    this.removeRefreshToken();
    this.triggerEvent(WTEvent.app_logout);


  }


getAPI (method, params, progress) {
    return this.genAPI (method, "get", params, progress);
}


postAPI (method, params, progress) {
    return this.genAPI (method, "post", params, progress);
}

putAPI (method, params, progress) {
    return this.genAPI (method, "put", params, progress);
}

deleteAPI (method, params, progress) {
    return this.genAPI (method, "delete", params, progress);
}


genAPI (method, type, params, progress) {
    var self = this;
    return new Promise((success, error) => {
      if (!params) params = {};

      const auth_token = self.auth_token;

      var d = new Date();
      var n = d.getTimezoneOffset();
      params.gmt_offset = n;
      params.tz = moment.tz.guess();
      params.dst = moment().isDST();

      if (self.userID) params.userID = self.userID;

      var data = params //new global.FormData();

      WTUtils.each(params, (key, val) => {
        if (Array.isArray(val)) {
          WTUtils.each(val, (key2, val2) => {
            data.append(key, val2);
          });
        } else {
          data.append(key, val);
        }
      });

      var methodName =   ((method.indexOf("http") == 0) ? method : (WTConfig.API_URL + '/' + method));

      axios({
        method: type,
        url: methodName,
        data: data,
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
        responseType: 'json',
        onUploadProgress: (progressEvent) => {
          if (progress) {
            progress(progressEvent);
          }
        }
      }).then((fulldata) => {
        console.log(fulldata);
        const data = fulldata.data;
        if (!data.ok) {
          const ia = self.authenticated;
          if (JSON.parse(data.errco) === 401) {
            self.removeToken();
          }

          if (data.error === 'expired_token') {
            self.renewToken(() => {
              self.genApi(method, type, params, success, error);
            }, error);
          } else {
            if (error) {
              if (JSON.parse(data.errco) === 401) {
                if (ia) self.triggerEvent(WTEvent.app_unauthorized);
              }
              return error(new WTException(data.errco, data.msg));
            }
          }
        } else {
          if ('data' in data && data.data.access_token) {
            self.setAuthToken(data.data.access_token);
            self.authenticated = true;
          }

          if (success) return success(data.data);
        }
      }).catch(async (err) => {

        if (err.status === 401) {
          self.removeToken();
          if(self.getRefreshToken()){
            try{
              await self.renewToken();
              let val = await self.genAPI(method, type, params, progress);
              if(success){
                return success(val);
              }
            }catch(e){
              if(e.status === 401) self.removeRefreshToken();
              return error(e);
            }
          }else{
            if (error) {
              let temp = err.response.data;
              return error(new WTException(err.status,temp.err, temp.msg));
            }
          }
        }else{
          if (error) {
            let temp = err.response.data;
            return error(new WTException(err.status,temp.err, temp.msg));
          }
        }


      });
    });
  }


  static getInstance (opts = {}) {
  return new WTClient(opts);
}


}
