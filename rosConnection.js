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
    connect: function() {
            this.loading = true
            this.ros = new ROSLIB.Ros({
                url: this.rosbridge_address
            })
            this.ros.on('connection', () => {
                this.logs.unshift((new Date()).toTimeString() + ' - Connected!')
                this.connected = true
                this.loading = false
            })
            this.ros.on('error', (error) => {
                this.logs.unshift((new Date()).toTimeString() + ` - Error: ${error}`)
            })
            this.ros.on('close', () => {
                this.logs.unshift((new Date()).toTimeString() + ' - Disconnected!')
                this.connected = false
                this.loading = false
            })
        },
        disconnect: function() {
            this.ros.close()
            this.goal = null
        },
  },
};