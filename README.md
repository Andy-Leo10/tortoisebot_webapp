# tortoisebot_webapp

**terminal 1 - simulation**

    source ~/simulation_ws/devel/setup.bash
    roslaunch tortoisebot_gazebo tortoisebot_docking.launch

**terminal 2 - bridge**

    source ~/simulation_ws/devel/setup.bash
    roslaunch course_web_dev_ros web.launch

**terminal 3 - mapping**

    source ~/simulation_ws/devel/setup.bash
    roslaunch tortoisebot_slam mapping.launch

**terminal 4 - action server**

    source ~/simulation_ws/devel/setup.bash
    rosrun course_web_dev_ros tortoisebot_action_server.py

**terminal 5 - http server**

    cd ~/webpage_ws/tortoisebot_webapp
    python -m http.server 7000

**terminal 6 - others**

    rostopic type /tortoisebot_as/goal
    rosmsg show course_web_dev_ros/WaypointActionActionGoal
    rosrun teleop_twist_keyboard teleop_twist_keyboard.py
    rosbridge_address
    webpage_address
