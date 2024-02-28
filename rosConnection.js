// rosConnection.js

export default {
  data() {
    return {
      ros: null,
      connected: false,
      loading: false,
      logs: [],
      rosbridge_address: 'wss://i-064ae7112eefb38c7.robotigniteacademy.com/a3aa052e-7aa1-4aa1-9d67-03c8a4b5fdbd/rosbridge/',
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
        document.getElementById('connectSound').play();
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