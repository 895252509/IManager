import OObj from '../baseclass/oobj';
  
class Eventhandler{
  constructor(isOnce= false, handler= null){
    this.isOnce = isOnce;
    this.handler = handler; 
  }
}

class Eventtype{
  constructor(){
    this.mousemove = 'mousemove';
  
    this.click = 'click';
  
    this.change= 'change';
  }

  static get change(){
    return this.change;
  }

  static get mousemove(){
    return this.change;
  }

  static get click(){
    return this.change;
  }
}

const Eventable = Base => class extends Base {
  constructor() {
    super();
    
    this._handlers = [];
  }

  static makeEventObject(el, e){
    return {
      e: e.e,
      original: e.original,
      path: e.path.push(el),
    }
  }

  on(eventtype, handler){
    if( !(eventtype in Eventtype) ) return ; 
    if(!this._handlers[eventtype])
      this._handlers[eventtype] = [];
    this._handlers[eventtype].push(new Eventhandler(false, handler));
  }

  once(eventtype, handler){
    if( !(eventtype in Eventtype) ) return ; 
    this._handlers[eventtype].push(new Eventhandler(false, handler));
  }

  trigger(eventtype, e){
    if( !(eventtype in Eventtype) ) return ; 
    if( this._handlers[eventtype] && this._handlers[eventtype].length !== 0 ){
      for(let i= 0, size= this._handlers[eventtype].length;i< size; i++ ){
        let hand =  this._handlers[eventtype][i];
        hand.handler.call(this, e);
        if(hand.isOnce){
          this._handlers[eventtype].shift(i,1);
          size--;
          i--;
        }
      }
    }
  }
};

class EventableObj extends Eventable(OObj) {
  constructor() {
    super();
    console.log(this);
  }
}

export {EventableObj, Eventable};