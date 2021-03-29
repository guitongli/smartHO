import React from "react";
import { Component } from "react";
// import { useEffect, useState } from 'react';

export default class Face extends Component {
    constructor() {
        super();
        this.state = {};
    }

    // loading face-api models on load
    componentDidMount() {}

    handleClick() {
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.start();
        recognition.onresult = (e) => {
            let last = e.results.length - 1;
            let text = e.results[last][0].transcript;
            this.setState({ recognizedText: text });
            console.log("Confidence: ", e.results[0][0].confidence);
        };
        recognition.onspeechend = () => {
            recognition.stop();
        };
        recognition.onerror = (e) => {
            return console.log("Error occurred in recognition: ", e.error);
        };
    }

    render() {
        return (
            <button onClick={() => this.handleClick()}>
                {this.state.recognizedText}
            </button>
        );
    }
}
