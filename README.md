# $${\color{palegreen} PaleGreen }$$
### A tiny client-side js library for building user interfaces.

This is an experiment about writing web UI with vanilla JS (no virtual DOM, no signal, no reactive library or any similar mainstream concept) using only a wrapped event emitter and some coding convention.

A counter example:
```
<main>
    <p class="counter-value">0</p>
    <button data-up="1"> + </button>
    <button data-down="-1"> - </button>
</main>
<script type="module">
    import { createApp } from "../../index.js";
    
    let app = createApp();
    app.root = document;
    
    let counter = 0;
    
    let Action = function(){}
    Action.prototype = {
        changeCounter: function(byValue) {
            counter += byValue;
            return counter;
        },
    };
    
    let action = new Action();
    
    let Counter = function(){};
    Counter.prototype = {
        sel: () => app.root.querySelector('main'),
        init: function() {
            let mainElem = this.sel();
            let btnUp = mainElem.querySelector('button[data-up]');
            let btnDown = mainElem.querySelector('button[data-down]');
            let counterElem = mainElem.querySelector('p.counter-value');
            btnUp.addEventListener("click", e => app.do(action.changeCounter, 1 * btnUp.dataset.up));
            btnDown.addEventListener("click", e => app.do(action.changeCounter, 1 * btnDown.dataset.down));
            app.on(action.changeCounter, value => counterElem.textContent = value);
        },
    };

    app.action = action;
    app.addView(Counter);
</script>
```


#### Examples
In the examples directory of this repo, following a checkout, you can try them out using a local web server.
