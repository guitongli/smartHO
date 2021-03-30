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
            listening: false,
            buttonText: "",
            class: "",
            recognizedText: "",
        };
    }

    // checking SpeechRecognition-api support on load
    componentDidMount() {
        if (typeof SpeechRecognition === "undefined") {
            this.setState({ error: true }); // need an err msg and robably remove the button!!
        } else {
            this.setState({ supported: true }); // do i need to add the other state key here?
        }
    }
    handleClick() {
        // must prevent default?
        if (this.supported) {
            this.setState({ listening: !this.listening });
            this.handleChange();
        } else {
            return;
        }
    }
    handleChange() {
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";

        // start record
        const start = () => {
            recognition.start();
            this.setState({ buttonText: "Stop listening" });
            this.setState({ class: "speaking" });
        };
        // stop record
        const stop = () => {
            recognition.stop();
            this.setState({
                buttonText: "Start listening",
            });
            this.setState({ class: "" });
        };
        const onResult = (e) => {
            for (const result of e.results) {
                const text = document.createTextNode(result[0].transcript);
                const p = document.createElement("p");
                if (result.isFinal) {
                    p.classList.add("final");
                }
                p.appendChild(text);
                result.appendChild(p);
            }
        };

        // handling record
        this.listening ? stop() : start();

        // transferring to text
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
            <>
                <div>{/* the message */}</div>
                <button onClick={() => this.handleClick()}>
                    {this.state.recognizedText}
                </button>
            </>
        );
    }
}
