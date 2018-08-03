import React, {Component} from 'react';
import './App.css';

import {Trigger} from "./components/trigger";

const samples = [
    'samples/linndrum/kick.wav',
    'samples/linndrum/clap.wav',
    'samples/linndrum/hihat-cl.wav',
    'samples/linndrum/hihat-op.wav',
    'samples/linndrum/snare.wav',
    'samples/linndrum/tom01.wav',
    'samples/linndrum/tom02.wav',
    'samples/linndrum/tom03.wav'
];

const tr1Event = () => new KeyboardEvent("keypress", {
    bubbles : true,
    cancelable : true,
    key : "1"
});

const tr3Event = () => new KeyboardEvent("keypress", {
    bubbles : true,
    cancelable : true,
    key : "3"
});

const tr5Event = () => new KeyboardEvent("keypress", {
    bubbles : true,
    cancelable : true,
    key : "5"
});

const sequence = [
    [tr1Event, tr3Event],
    [tr3Event],
    [tr5Event, tr3Event],
    [tr3Event],
    [tr1Event, tr3Event],
    [tr3Event],
    [tr5Event, tr3Event],
    [tr3Event]
];

class App extends Component {

    constructor() {
        super();

        this.state = {
            samples: samples
        };

        this.tempo = 120;

        this.position = 0;

        this.interval = null;

        this.playSequence = this.playSequence.bind(this);
    }

    playSequence() {
        this.position = 0;
        if (!this.interval) {
            sequence[this.position].forEach(e => dispatchEvent(e()));
            this.interval = setInterval(() => {
                console.log(this.position);
                this.position = this.position === sequence.length - 1 ? 0 : this.position + 1;
                sequence[this.position].forEach(e => dispatchEvent(e()));
            }, 60000 / this.tempo / 2);
        } else {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to React Sample Player</h1>
                </header>
                <Trigger kkey={'1'} name={'Kick'}      src={samples[0]}/>
                <Trigger kkey={'2'} name={'Clap'}      src={samples[1]}/>
                <Trigger kkey={'3'} name={'HH Closed'} src={samples[2]}/>
                <Trigger kkey={'4'} name={'HH Open'}   src={samples[3]}/>
                <Trigger kkey={'5'} name={'Snare'}     src={samples[4]}/>
                <Trigger kkey={'6'} name={'Tom Low'}   src={samples[5]}/>
                <Trigger kkey={'7'} name={'Tom Mid'}   src={samples[6]}/>
                <Trigger kkey={'8'} name={'Tom High'}  src={samples[7]}/>
                <div>
                    <button onClick={this.playSequence}>Play Sequence</button>
                </div>
            </div>
        );
    }
}

export default App;
