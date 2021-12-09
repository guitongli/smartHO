import React from "react";
import { Component } from "react";
import * as faceapi from "face-api.js";
export default class Face extends Component {
    constructor() {
        super();
        this.state = {
            expressions: {
                // neutral: ":|",
                // happy: ":)",
                // sad: ":'(",
                // angry: ":(",
                // fearful: ":O",
                // disgusted: ":D",
                // surprised: ":B",
                neutral: "😐",
                happy: "😃",
                sad: "😥",
                angry: "😠",
                fearful: "😱",
                disgusted: "🤢",
                surprised: "😮",
            },
            currentExpression: null,
        };
        this.video = React.createRef();
    }
    // loading face-api models on load
    componentDidMount() {
        console.log("this runs");
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
            faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
            faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        ]).then(this.startVideo());
    }
    // accessing cam
    startVideo() {
        console.log("starting...");
        navigator.mediaDevices
            .getUserMedia({
                video: true,
            })
            .then((stream) => {
                console.log("stream: ", stream);
                console.log("this.video: ", this.video);
                this.video.current.srcObject = stream;
                this.detectExpression();
            });
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
            // console.log(`detection[0]`, detection[0]);
            console.log(`detection[0].expressions`, detection[0].expressions);
            // console.log(
            //     `detection[0].expressions.FaceExpressions`,
            //     detection[0].expressions.FaceExpressions
            // );
            // console.log(`type`, typeof detection[0].expressions);

            // assigning related emoji
            if (detection.length > 0) {
                let expressionKey;
                let expressionValue = 0.0;
                for (const key in detection[0].expressions) {
                    if (detection[0].expressions[key] > expressionValue) {
                        expressionKey = key;
                        expressionValue = detection[0].expressions[key];
                    }
                }
                console.log(`expressionKey`, expressionKey);
                console.log(`expressionValue`, expressionValue);
                this.setState({
                    currentExpression: this.state.expressions[expressionKey],
                });
                console.log(`currentExpression`, this.currentExpression); // can't get this log!
            }
        }, 10000); // miliseconds to try detecting - should we increase this to make sure it captures one image in a reasonable time or should we get rid of it at all?
    }
    render() {
        // returning the expressed expression
        return (
            <div>
                <p>Current Emotion is: {this.state.currentExpression}</p>
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
