// main.js

import rosConnection from './rosConnection.js';
import actionClient from './actionClient.js';
import visualizeModel from './visualizeModel.js';
import camera from './camera.js';
import map from './map.js';

var app = new Vue({
  el: '#app',
  // I use mixin to import the methods and data from the other files
  mixins: [
    rosConnection,
    actionClient,
    visualizeModel,
    camera,
    map
  ],
  mounted() {
    this.interval = setInterval(() => {
      if (this.ros != null && this.ros.isConnected) {
        this.ros.getNodes((data) => { }, (error) => { })
      }
    }, 10000)
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
});