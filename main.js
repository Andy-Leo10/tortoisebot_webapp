// main.js

import rosConnection from './rosConnection.js';
import actionClient from './actionClient.js';

var app = new Vue({
  el: '#app',
  mixins: [rosConnection, actionClient],
  mounted() {
    // Your code here...
  },
  // remaining code...
});