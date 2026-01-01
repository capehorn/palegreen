export function createApp(){
    let app = {};
    app.view = {};
    app._emitter = createNanoEvents();

    app.do = (fnAction, ...args) => {
        let retVal = fnAction.call(app.action, ...args);
        app._emitter.emit(fnAction, retVal);
        return {
            trigger: function(fnAction, ...args){
                let retVal = fnAction.call(app.action, ...args);
                app._emitter.emit(fnAction, retVal);
            }
        }
    };

    app.on = (fnAction, ...args) => {
        //returning with unbinding function
        return app._emitter.on(fnAction, ...args);
    };
    
    app.addView = view => {
        app.view[view.name] = new view(app);
        app.view[view.name].init(); 
    };
    return app;
}

// https://github.com/ai/nanoevents (MIT)
function createNanoEvents() {
    return {
      emit(event, ...args) {
        for (
          let callbacks = this.events[event] || [],
            i = 0,
            length = callbacks.length;
          i < length;
          i++
        ) {
          callbacks[i](...args)
        }
      },
      events: {},
      on(event, cb) {
        ;(this.events[event] ||= []).push(cb)
        return () => {
          this.events[event] = this.events[event]?.filter(i => cb !== i)
        }
      }
    };
}

// https://github.com/ai/nanoid (MIT)
export function nanoid(e=8){
  let a="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
  let t="",r=crypto.getRandomValues(new Uint8Array(e));
  for(let n=0;n<e;n++){t+=a[63&r[n]];}
  return t;
}
