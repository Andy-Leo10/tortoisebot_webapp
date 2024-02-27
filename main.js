// main.js

import rosConnection from './rosConnection.js';
import actionClient from './actionClient.js';
import visualizeModel from './visualizeModel.js';
import camera from './camera.js';

var app = new Vue({
  el: '#app',
  mixins: [rosConnection, actionClient, visualizeModel, camera],
  mounted() {
    // Your code here...
  },
  // remaining code...
});