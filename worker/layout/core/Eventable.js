import OObj from '../baseclass/oobj';

class Handler{
  constructor(eventtype, ehander){
    this.eventtype = '';
    this.EHandler = null;
  }
}
  
class Eventhandler{
  constructor(){
    this.isOnce = false;
    this.handler = null; 
  }
}

class Eventtype{
  constructor(){
    this.MouseMove = 'mousemove';
  
    this.Click = 'click';
  
    this.Change= 'change';
  }
}

const Eventable = Base => class extends Base {
  constructor() {
    super();
    
    this._handlers = [];
  }

  on(eventtype, handler){
    if( !(eventtype in Eventtype) ) return ; 
    this._handlers.push(new Handler(eventtype, new Eventhandler(false, handler)));
  }

  once(eventtype, handler){
    if( !(eventtype in Eventtype) ) return ; 
    this._handlers.push(new Handler(eventtype, new Eventhandler(true, handler)));
  }

  trigger(){
    
  }
};

export default class EventableObj extends Eventable(OObj) {
  constructor() {
    super();
    console.log(this);
  }
}
