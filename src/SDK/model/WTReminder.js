import {WTClient, WTUtils, WTEvent} from ".."
import * as moment from 'moment';

export class WTReminder {


  constructor (opts = {}) {
    this.id = null;
    this.title = null;
    this.description = null;
    this.created_at = null;
    this.updated_at = null;
    this.remind_at = moment().subtract(15,"minutes").toDate();
    this.event_at = new Date();
    this.type =  WTReminder.Type.personal;

    this.initWithData(opts);

    console.log(this);

  }

  initWithData (opts = {}) {

    if ('id' in opts) this.id = opts.id;
    if ('title' in opts) this.title = opts.title;
    if ('description' in opts) this.description = opts.description;
    if ('type' in opts) this.type = opts.type;
    if ('remind_at' in opts) this.remind_at = new Date(`${opts.remind_at}`);
    if ('event_at' in opts) this.event_at = new Date(`${opts.event_at}`);
    if ('created_at' in opts) this.created_at = new Date(opts.created_at);
    if ('updated_at' in opts) this.updated_at = new Date(opts.updated_at);


  }

  get completed(){
    return this.remind_at.getTime() <= new Date().getTime();
  }


  async save(){
    var params = WTUtils.deepClone(this);
    params.remind_at = this.remind_at.toISOString();
    params.event_at = this.event_at.toISOString();
    let isNew = this.id === false || this.id == null
    const data =  !isNew ?  await WTClient.getInstance().putAPI('reminders/'+this.id, params) : await WTClient.getInstance().postAPI('reminders', params);
    this.initWithData(data);
    WTClient.getInstance().triggerEvent(isNew ? WTEvent.reminders_add :  WTEvent.reminders_edit,{reminder:this});
    return this;
  }

  async delete(){
    const data =  await WTClient.getInstance().deleteAPI('reminders/'+this.id, {});
    WTClient.getInstance().triggerEvent(WTEvent.reminders_delete ,{id:this.id});
    return this;
  }

  static async fetch() {
    const data = await WTClient.getInstance().getAPI('reminders');
    return data.reminders
      .map(reminder => new WTReminder(reminder))
      .sort((a, b) => {
      const d1 = b.event_at.getTime();
      const d2 = a.event_at.getTime();
      return d1 < d2 ? -1 : d1 > d2 ? 1 : 0;
    });
  }




  static Type = {
    personal: 'personal',
    work : 'work',
    school: 'school',
    events: 'events',
    toString:  (action) => {

      switch (action) {
      case WTReminder.Type.personal:
        return "Personal"
      case WTReminder.Type.work:
        return "Work"
      case WTReminder.Type.school:
        return "School"
      case WTReminder.Type.events:
        return "Events"
      }
    }
  };

}
