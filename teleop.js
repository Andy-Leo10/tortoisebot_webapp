// teleop.js

import VirtualJoystick from './joystick_bootstrap/virtual-joystick.js';

export default {
  data: function() {
    return {
      joystick: null,
    };
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
      handleRadius: 30,
      onChange: function(delta) {
        deltaX.textContent = delta.x.toFixed(2);
        deltaY.textContent = delta.y.toFixed(2);
      },
    });
  },
};