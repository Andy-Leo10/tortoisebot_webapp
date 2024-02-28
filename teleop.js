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
        publishTwist: function (linearX, angularZ) {
            let topic = new ROSLIB.Topic({
                ros: this.ros,
                name: '/cmd_vel',
                messageType: 'geometry_msgs/Twist',
            })
            let twist = new ROSLIB.Message({
                linear: {
                    x: linearX,
                    y: 0,
                    z: 0,
                },
                angular: {
                    x: 0,
                    y: 0,
                    z: angularZ,
                },
            })
            topic.publish(twist)
        },
        publishSomething: function () {
            this.publishTwist(0.1, 0.5);
        },
    },
    mounted() {
        const joystickContainer = document.querySelector('.joystick');
        const deltaX = document.querySelector('#delta-x');
        const deltaY = document.querySelector('#delta-y');

        this.joystick = new VirtualJoystick(joystickContainer, {
            width: 250,
            height: 250,
            color: 'gray',
            handleColor: 'white',
            handleRadius: 80,
            onChange: (delta) => {
                deltaX.textContent = delta.x.toFixed(2);
                deltaY.textContent = delta.y.toFixed(2);
                this.publishTwist(-delta.y / 2, -delta.x / 1);
            },
        });
        const testPublishButton = document.querySelector('#test-publish');
        testPublishButton.addEventListener('click', this.publishSomething);
    },
};