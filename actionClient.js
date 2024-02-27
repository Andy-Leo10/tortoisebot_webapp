// actionClient.js

export default {
  props: ['ros', 'connected'],
  data() {
    return {
      waypoints: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
        { x: 4, y: 4 },
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