// actionClient.js

export default {
  props: ['ros', 'connected'],
  data() {
    return {
      waypoints: [
        { x: 0.65, y: -0.5 },
        { x: 0.65, y: 0.45 },
        { x: 0.25, y: 0.48 },
        { x: 0.20, y: 0.0 },
        { x: -0.12, y: 0.0 },
        { x: -0.12, y: -0.5 },
        { x: -0.12, y: 0.5 },
      ],
      selectedWaypoint: null,
      goal: null,
      action: {
        goal: { position: { x: 0, y: 0, z: 0 } },
        feedback: { position: 0, state: 'idle' },
        result: { success: false },
        status: { status: 0, text: '' },
      },
    };
  },
  methods: {
    sendGoal: function () {
      console.log('sendGoal called');
      let actionClient = new ROSLIB.ActionClient({
        ros: this.ros,
        serverName: '/tortoisebot_as',
        actionName: 'course_web_dev_ros/WaypointActionAction'
      })

      this.goal = new ROSLIB.Goal({
        actionClient: actionClient,
        goalMessage: {
          ...this.action.goal
        }
      })

      this.goal.on('status', (status) => {
        this.action.status = status
      })

      this.goal.on('feedback', (feedback) => {
        this.action.feedback = feedback
      })

      this.goal.on('result', (result) => {
        this.action.result = result
      })

      this.goal.send()
    },
    cancelGoal: function () {
      this.goal.cancel()
    },
    updateGoal() {
      this.action.goal.position.x = this.selectedWaypoint.x;
      this.action.goal.position.y = this.selectedWaypoint.y;
    },
  },
};