import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as rxjs from 'rxjs';
import socketIOClient from 'socket.io-client';


/*  Introduction - What are streams of values?
 *  In JavaScript applications almost everything is asynchronous:
 *  - requests coming in from the network bring new values from the backend
 *  - timeouts on the front-end
 *  - user interactions with clicks/mouse over events
 * 
 *  A few examples of streams of values over time: 
*/
const socket = socketIOClient('http://localhost:4001', { transports: ['websocket'] });
socket.on('data', (data) => {
  console.log("on DATA");
  console.log(data);
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      greeting: ''
    };
  }

  componentDidMount() {
    // #1 Click streams - listen on whole page and subscribe to click event
    // document.addEventListener('click', event => {
    //   console.log(event);
    // });

    // #2 JavaScript Intervals - code that the runtime periodically executes (long polling in the background)
    // let counter = 0;
    // setInterval(() => {
    //   console.log(counter);
    //   counter++;
    // }, 1000);

    // #3 Timeouts - very similar to http requests (stream that emits one value and completes)
    // very similar to call to backend requesting value and getting callback (like ajax that doesn't fail)
    // setTimeout(() => {
    //   console.log('completed...');
    // }, 3000);

    /* What is RxJs? What problems does it solve?
     * Combining streams - how would we do that?
    */

    // #1 What if a user wants to click, wait for 3 seconds and then start emitting values?
    // nested callbacks (callback hell), browser only provides callback api, extends javascript
    // document.addEventListener('click', event => {
    //   console.log(event);

    //   setTimeout(() => {
    //     console.log('completed...');

    //     let counter = 0;
    //     setInterval(() => {
    //       console.log(counter);
    //       counter++;
    //     }, 1000);
    //   }, 3000);
    // });

    // #2 Observables make is easy to combine streams

    // https://rxjs-dev.firebaseapp.com/api/index/function/timer
    // const interval$ = rxjs.timer(3000, 1000);
    // interval$.subscribe(val => console.log('stream 1 ' + val));

    // https://rxjs-dev.firebaseapp.com/api/index/function/fromEvent
    // const click$ = rxjs.fromEvent(document, 'click');
    // click$.subscribe(event => console.log(event));

    // observable contracts (errors, completions, subscriptions)

    fetch(`/api/greeting?name=${'World'}`)
      .then(response => response.json())
      .then(state => this.setState(state));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state.greeting}</p>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
