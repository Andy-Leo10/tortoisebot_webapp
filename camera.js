// camera.js

export default {
    props: ['ros', 'connected'],
    methods: {
        setCamera: function () {
            let without_wss = this.rosbridge_address.split('wss://')[1]
            console.log(without_wss)
            let domain = without_wss.split('/')[0] + '/' + without_wss.split('/')[1]
            console.log(domain)

            let topic = '/camera/image_raw';
            let width = 320;
            let height = 240;

            let host = domain + '/cameras/stream?topic=' + topic + '&width=' + width + '&height=' + height;
            console.log('Stream URL-X:', host);

            let viewer = new MJPEGCANVAS.Viewer({
                divID: 'divCamera',
                host: host,
                width: width,
                height: height,
                topic: '/camera/image_raw',
                ssl: true,
            })
        },
        delCamera: function () {
            document.getElementById('divCamera').innerHTML = ''
        },
    },
};
