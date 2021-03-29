import React from "react";
import { Component } from "react";
// import { useEffect, useState } from 'react';

// checking if the browser supports speach recog
var SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

export default class Face extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            supported: false,
            buttonText: "",
            class: "",
            recognizedText: "",
        };
    }

    // loading SpeechRecognition-api on load?????
    componentDidMount() {
        if (typeof SpeechRecognition === "undefined") {
            this.setState({ error: true }); // need an err msg and robably remove the button!!
        } else {
            this.setState({ supported: true }); // do i need to add the other state key here?
        }
        // creating an instance
        // speechRecognition = new webkitSpeechRecognition();
        // speechRecognition.onresult = console.log;
        // speechRecognition.start();
    }

    handleClick() {
        // must prevent default?
        if (this.supported) {
            let listening = false;
            var recognition = new SpeechRecognition();
            recognition.lang = "en-US";
            const start = () => {
                recognition.start();
                this.setState({ buttonText: "Stop listening" });
                this.setState({ class: "speaking" });
            };
            const stop = () => {
                recognition.stop();
                this.setState({
                    buttonText: "Start listening",
                });
                this.setState({ class: "" });
            };
            listening ? stop() : start();
            listening = !listening;
        }
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
