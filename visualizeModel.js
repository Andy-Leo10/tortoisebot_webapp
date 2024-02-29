// visualizeModel.js

export default {
    props: ['ros', 'connected'],
    data() {
        return {
            viewer: null,
            tfClient: null,
            urdfClient: null,
        };
    },
    methods: {
        setup3DViewer() {
            this.viewer = new ROS3D.Viewer({
                background: '#cccccc',
                divID: 'div3DViewer',
                width: 300,
                height: 300,
                antialias: true,
                fixedFrame: 'odom'
            })
            // Zoom in
            this.viewer.camera.fov *= 0.15;
            this.viewer.camera.updateProjectionMatrix();

            // Add a grid.
            this.viewer.addObject(new ROS3D.Grid({
                color: '#0181c4',
                cellSize: 0.5,
                num_cells: 20
            }))

            // Setup a client to listen to TFs.
            this.tfClient = new ROSLIB.TFClient({
                ros: this.ros,
                angularThres: 0.01,
                transThres: 0.01,
                rate: 10.0
            })

            // Setup the URDF client.
            this.urdfClient = new ROS3D.UrdfClient({
                ros: this.ros,
                param: 'robot_description',
                tfClient: this.tfClient,
                // We use "path: location.origin + location.pathname"
                // instead of "path: window.location.href" to remove query params,
                // otherwise the assets fail to load
                path: location.origin + location.pathname,
                rootObject: this.viewer.scene,
                loader: ROS3D.COLLADA_LOADER_2
            })
        },
        unset3DViewer() {
            document.getElementById('div3DViewer').innerHTML = ''
        },
    },
};