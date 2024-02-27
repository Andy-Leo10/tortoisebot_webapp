// camera.js

export default {
    props: ['ros', 'connected'],
    methods: {
        setCamera: function () {
            let without_wss = this.rosbridge_address.split('wss://')[1]
            console.log(without_wss)
            let domain = without_wss.split('/')[0] + '/' + without_wss.split('/')[1]
            console.log(domain)
            let host = domain + '/cameras'
            let viewer = new MJPEGCANVAS.Viewer({
                divID: 'divCamera',
                host: host,
                width: 320,
                height: 240,
                topic: '/camera/rgb/image_raw',
                ssl: true,
            })
        },
        delCamera: function () {
            document.getElementById('divCamera').innerHTML = ''
        },
    },
};
