import React from "react";
import { Component } from "react";
import * as faceapi from "face-api.js";
export default class Face extends Component {
    constructor(props) {
        // parent should pass a faceInChat(emoji){return emoji}
        super(props);
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
        if (this.props.startCommand) {
            this.startVideo();
        }
    }
    // accessing cam
    async startVideo() {
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
        const faceInterval = setInterval(async () => {
            // detecting face with expression
            const detection = await faceapi
                .detectAllFaces(
                    this.video.current,
                    new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceExpressions();
            console.log("detection: ", detection);
            console.log(`detection[0].expressions`, detection[0].expressions);

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
                // console.log(`currentExpression`, this.state.currentExpression);
            }
        }, 2000);
        if (this.state.currentExpression != null) {
            this.props.faceInChat(this.currentExpression); // passing the emoji to chat.js
            clearInterval(faceInterval); // stopping the detection after a successful one
            this.setState({ currentExpression: null }); // setting all back to nothing
        }
    }
    render() {
        // returning the expressed expression
        return (
            <div style="visibilty:hidden">
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
