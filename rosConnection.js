// rosConnection.js

export default {
  data() {
    return {
      ros: null,
      connected: false,
      loading: false,
      logs: [],
      rosbridge_address: 'enter your rosbridge_address',
    };
  },
  methods: {
    connect: function () {
      this.loading = true
      this.ros = new ROSLIB.Ros({
        url: this.rosbridge_address
      })
      this.ros.on('connection', () => {
        this.logs.unshift((new Date()).toTimeString() + ' - Connected!')
        this.connected = true
        this.loading = false
        // call the setup3DViewer method when connected
        this.setup3DViewer();
        // call the camera method when connected
        this.setCamera();
        // call the setupMapViewer method when connected
        this.setupMapViewer();
        // play the sound
        // Create a new Audio object
        var audio = new Audio('clash-royale-intro.mp3');
        // Play the audio
        audio.play().then(() => {
          console.log('Audio played successfully.');
        }).catch((error) => {
          console.error('Error playing audio:', error);
        });
      })
      this.ros.on('error', (error) => {
        this.logs.unshift((new Date()).toTimeString() + ` - Error: ${error}`)
      })
      this.ros.on('close', () => {
        this.logs.unshift((new Date()).toTimeString() + ' - Disconnected!')
        this.connected = false
        this.loading = false
        // call the unset3DViewer method when disconnected
        this.unset3DViewer();
        // call the delCamera method when disconnected
        this.delCamera();
        // call the unsetMapViewer method when disconnected
        this.unsetMapViewer();
      })
    },
    disconnect: function () {
      this.ros.close()
      this.goal = null
    },
  },
};