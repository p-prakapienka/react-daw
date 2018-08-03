import React, { Component } from 'react';
import {Howl, Howler} from 'howler';

export class Trigger extends Component {

    constructor(props) {
        super(props);

        let sound = new Howl({
            src: [props.src]
        });

        this.state = {
            sound: sound
        };

        this.onKeyPress = this.onKeyPress.bind(this);
        this.playSample = this.playSample.bind(this);
    }

    componentWillMount() {
        window.removeEventListener('keypress', this.onKeyPress);
    }

    componentDidMount() {
        window.addEventListener('keypress', this.onKeyPress);
    }

    onKeyPress(event) {
        if (event.key === this.props.kkey) {
            this.playSample();
        }
    }

    playSample() {
        this.state.sound.play();
    }

    render() {
        return (
            <button onClick={this.playSample}>{this.props.name}</button>
        )
    }

}