// teleop.js

import VirtualJoystick from './joystick_bootstrap/virtual-joystick.js';

export default {
    props: ['ros', 'connected'],
    data: function () {
        return {
            // joystick valules
            joystick: null,
            // publisher
            pubInterval: null,
        };
    },
    methods: {
        // publish the twist message to topic /cmd_vel
        publishTwist: function () {
            let topic = new ROSLIB.Topic({
                ros: this.ros,
                name: '/cmd_vel',
                messageType: 'geometry_msgs/Twist',
            })
            let twist = new ROSLIB.Message({
                linear: {
                    x: -this.joystick.deltaY() / 2,
                    y: 0,
                    z: 0,
                },
                angular: {
                    x: 0,
                    y: 0,
                    z: this.joystick.deltaX() / 2,
                },
            })
            topic.publish(twist)
        },
        publishSomething: function () {
            let topic = new ROSLIB.Topic({
                ros: this.ros,
                name: '/cmd_vel',
                messageType: 'geometry_msgs/Twist',
            })
            let twist = new ROSLIB.Message({
                linear: {
                    x: 0.1,
                    y: 0,
                    z: 0,
                },
                angular: {
                    x: 0,
                    y: 0,
                    z: 0.5,
                },
            })
            topic.publish(twist)
        },
    },
    mounted() {
        const joystickContainer = document.querySelector('.joystick');
        const deltaX = document.querySelector('#delta-x');
        const deltaY = document.querySelector('#delta-y');

        this.joystick = new VirtualJoystick(joystickContainer, {
            width: 150,
            height: 150,
            color: 'gray',
            handleColor: 'white',
            handleRadius: 40,
            onChange: function (delta) {
                deltaX.textContent = delta.x.toFixed(2);
                deltaY.textContent = delta.y.toFixed(2);
            },
        });
        const testPublishButton = document.querySelector('#test-publish');
  testPublishButton.addEventListener('click', this.publishSomething);
    },
};