// map.js

export default {
    props: ['ros', 'connected'],
    data() {
        return {
            mapViewer: null,
            mapGridClient: null,
            interval: null,
        };
    },
    methods: {
        setupMapViewer() {
            console.log('Setting up map viewer')
            this.mapViewer = new ROS2D.Viewer({
                divID: 'divMapViewer',
                width: 300,
                height: 300,
            })

            // set map client
            console.log('Setting up map client')
            this.mapGridClient = new ROS2D.OccupancyGridClient({
                ros: this.ros,
                rootObject: this.mapViewer.scene,
                continuous: true
            })

            // scale the canvas to fit the map
            console.log('Scaling the canvas to fit the map')
            this.mapGridClient.on('change', () => {
                this.mapViewer.scaleToDimensions(this.mapGridClient.currentGrid.width, this.mapGridClient.currentGrid.height)
                this.mapViewer.shift(this.mapGridClient.currentGrid.pose.position.x, this.mapGridClient.currentGrid.pose.position.y)
                // Zoom in 
                this.mapViewer.scene.scaleX *= 5.0;
                this.mapViewer.scene.scaleY *= 5.0;
            })
        },
        unsetMapViewer() {
            console.log('Unsetting map viewer')
            document.getElementById('divMapViewer').innerHTML = ''
        },
    },
};
