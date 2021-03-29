import React from "react";
import { Component } from "react";
// import { useEffect, useState } from 'react';
import * as faceapi from "face-api.js";

export default class Face extends Component {
    constructor() {
        super();
        this.state = {
            expressions: {
                neutral: "😐",
                happy: "😃",
                sad: "😥",
                angry: "😠",
                fearful: "😱",
                disgusted: "🤢",
                surprised: "😮",
            },
            currentExpression: null,
            // video: {},
        };
        this.video = React.createRef();
    }

    // loading face-api models on load
    async componentDidMount() {
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
            faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
            faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        ]);
        console.log("about to call start video...");
        this.startVideo();
    }

    async startVideo() {
        // accessing cam
        console.log("starting...");
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
        });
        console.log("stream: ", stream);
        console.log("this.video: ", this.video);
        this.video.current.srcObject = stream;
        this.detectExpression();
    }

    // detecing expression
    detectExpression() {
        // detecting the face periodically
        setInterval(async () => {
            // detecting face with expression
            const detection = await faceapi
                .detectAllFaces(
                    this.video.current,
                    new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceExpressions();
            console.log("detection: ", detection);

            // // handling returning array from detectAllFaces
            // if (detection.length > 0) {
            //     detection.forEach((element) => {
            //         // an example of face element's expression attributes
            //         /*
            //         neutral: 0.33032259345054626
            //         happy: 0.0004914478631690145
            //         sad: 0.6230283975601196
            //         angry: 0.042668383568525314
            //         fearful: 0.000010881130037887488
            //         disgusted: 0.003466457361355424
            //         surprised: 0.000011861078746733256
            //         */
            //         let status = "";
            //         let valueStatus = 0.0;
            //         for (const [key, value] of Object.entries(
            //             element.expressions
            //         )) {
            //             if (value > valueStatus) {
            //                 status = key;
            //                 valueStatus = value;
            //             }
            //         }
            //         // after getting the expression with the highest score setting it to the state
            //         this.setState({
            //             currentExpression: this.state.expressions[status],
            //         });
            //     });
            // } else {
            //     console.log("no faces");
            // }
        }, 500); // miliseconds to try detecting
    }

    render() {
        // returning the expressed expression
        return (
            <div>
                {this.state.currentExpression}
                <video
                    id="video"
                    width="320"
                    height="180"
                    autoPlay
                    muted
                    ref={this.video}
                ></video>
            </div>
        );
    }
}
