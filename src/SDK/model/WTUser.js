export class WTUser {


  constructor (opts = {}) {
    this.id = null;
    this.email = null;
    this.name = null;
    this.created_at = null;
    this.updated_at = null;

    this.initWithData(opts);

    console.log(this);

  }

  initWithData (opts = {}) {
    if ('id' in opts) this.id = opts.id;
    if ('email' in opts) this.email = opts.email;
    if ('name' in opts) this.name = opts.name;
    if ('created_at' in opts) this.created_at = new Date(opts.created_at);
    if ('updated_at' in opts) this.updated_at = new Date(opts.updated_at);
  }

}
