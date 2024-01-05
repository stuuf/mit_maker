<template>
    <div>
        <Transition>
            <div v-if="loaded">
                <div class="font-sans flex flex-col justify-between items-center w-fit h-screen m-auto -z-10">
                    <Header :counter="counter" :colorScheme="colorScheme"/>

                    <MessageField :currentDeleted="currentDeletedDOM" :colorScheme="colorScheme"
                        @update:modelValue="msg => message = msg"
                        @submit="msg => {post(msg); submitted = true;}"
                        :localPercent="localPercent" :totalPercent="totalPercent"/>
                </div>
                <div class="fixed w-screen h-screen -z-20 top-0 left-0" :style="{
                    background: `linear-gradient(-45deg, rgba(${colorScheme[0][0]},${colorScheme[0][1]},${colorScheme[0][2]},1), rgba(${colorScheme[1][0]},${colorScheme[1][1]},${colorScheme[1][2]},1)`
                }"></div>

                <Info :colorScheme="colorScheme"/>

                <ContextMenu v-if="menuShow" :top="menuTop" :left="menuLeft" :colorScheme="colorScheme"
                @confirm="menuDelete" @cancel="menuCancel"/>

            </div>
        </Transition>
        <Transition>
            <canvas v-show="loaded" class="fixed top-0 left-0" id="renderer"></canvas>
        </Transition>
    
    </div>
</template>


<script>
    import MessageField from './MessageField.vue';
    import Header from './Header.vue';
    import ContextMenu from './ContextMenu.vue';
    import Info from './Info.vue';
    import axios from 'axios';
    import * as Three from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    
    axios.defaults.headers.common['Authorization'] = 'Token ' +  import.meta.env.VITE_API_AUTH_TOKEN;
    let URL = import.meta.env.VITE_URL 

    let scene = null;
    let camera = null;
    let renderer = null;
    let meshes = [];
    let lighting = [];
    let controls = null;

    let texture = null;
    let context = null;
    let numG = null;
    let mainColor = null;
    let posted = false;
    let item = null;

    let randomRotations = [];
    let deletedEntries = [];
    let queuedToDelete = null;
    let currentDeleted = false;
    let onCurrent = false;
    
    export default {
        name: 'Background',
        components: {
            Header,
            MessageField,
            ContextMenu,
            Info
        },

        data() {
            return {
                colorScheme: [],
                message: '',
                loaded: false,
                counter: 0,
                submitted: false,
                localPercent: 0.0,
                totalPercent: 0.0,
                menuShow: false,
                menuTop: 0,
                menuLeft: 0,
                currentDeletedDOM: false,
            }
        },

        methods: { 
            generateColorScheme() {
                // try {
                //     let response = await axios.post('http://colormind.io/api', JSON.stringify({
                //         model: 'default'
                //     }))
                //     this.colorScheme = response.data.result

                // } catch(error) {
                //     let r = () => Math.floor((Math.random() * 255));
                //     this.colorScheme = [[r(), r(), r()], [r(), r(), r()], [r(), r(), r()], [r(), r(), r()], [r(), r(), r()]];
                //     console.log(error)
                // }
                let r = () => Math.floor((Math.random() * 255));
                this.colorScheme = [[r(), r(), r()], [r(), r(), r()], [r(), r(), r()], [r(), r(), r()], [r(), r(), r()]];
            },


            async init() {
                let scale = 50;

                this.generateColorScheme();
                let entryList = [];
                let response;

                try {
                    response = await this.getData();
                    this.counter = response.count;
                    this.localPercent = response.localPercent;
                    this.totalPercent = response.totalPercent;
                    entryList = response.entries;
                } catch (error) {
                    entryList = [];
                    this.counter = 0;
                    this.localPercent = 0.0;
                    this.totalPercent = 0.0;
                }

                this.loaded = true;
                
                const geometries = [
                    new Three.TetrahedronGeometry(),  //0                  
                    new Three.BoxGeometry(),  //1
                    new Three.OctahedronGeometry(),  //2
                    new Three.DodecahedronGeometry(),  //3
                    new Three.IcosahedronGeometry(),  //4
                    new Three.SphereGeometry(),  //5
                    new Three.TorusGeometry(1, 0.4, 20, 20),  //6

                ]
                
                let r1 = Math.random();
                if (r1 > 999999/1000000) {
                    numG = 6;
                } else if (r1 > 1031/1032) {
                    numG = 5;
                } else if (r1 > 127/128) {
                    numG = 5;
                } else if (r1 > 63/64) {
                    numG = 4;
                } else if (r1 > 31/32) {
                    numG = 3;
                } else if (r1 > 7/8) {
                    numG = 2;
                } else if (r1 > 1/2) {
                    numG = 1;
                } else {
                    numG = 0;
                }

                mainColor = this.toHexString(this.colorScheme[2]);
                entryList.unshift({id:-1, color: mainColor, geometry: numG, deleted: false});

                scene = new Three.Scene();
                camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                renderer = new Three.WebGLRenderer({
                    canvas: document.getElementById('renderer'),
                    alpha: true
                });
                renderer.setClearColor( 0xffffff, 0 ); 
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);
                camera.position.setY(scale + 2.95);

                lighting.push(new Three.HemisphereLight(0xffffdd, 0x6b4f26, 1));
                lighting.push(new Three.DirectionalLight(0xffffff, 0.8));
                lighting[1].position.set(-1500, 500, 1000);
                scene.add(lighting[0], lighting[1]);

                controls = new OrbitControls(camera, renderer.domElement);
                controls.enablePan = false;
                controls.enableDamping = true;
                controls.dampingFactor = 0.05;
                controls.rotateSpeed = 0.5;
                controls.zoomSpeed = 0.2;
                controls.maxDistance = 500;


                //beeg sphere
                const frame = new Three.SphereGeometry(scale);
                const edges = new Three.EdgesGeometry( frame );
                const sphere = new Three.LineSegments( edges, new Three.LineBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.5 } ) );
                scene.add( sphere );

                //epic things
                let ga = Math.PI * (3. - Math.sqrt(5.));
                for (let i = 0; i < entryList.length; i++) {

                    let material = new Three.MeshStandardMaterial({color: parseInt(entryList[i].color, 16)});

                    let y = scale - ((entryList.length == 1)? 0 : i / (entryList.length - 1)) * scale * 2;
                    let radius = Math.sqrt(scale * scale - y * y);
                    let theta = ga * i;
                    let x = Math.cos(theta) * radius;
                    let z = Math.sin(theta) * radius;

                    let obj = new Three.Mesh(geometries[entryList[i].geometry], material);
                    obj.position.set(x, y, z);
                    if (i === 0) {
                        obj.name = "current";
                    } else {
                        obj.name = "deletable";
                    }

                    //access database from mesh
                    function getEntryFromMesh() {
                        return entryList[i];        
                    }
                    obj.callback = getEntryFromMesh;
                    scene.add(obj);

                    let t1 = Math.pow((Math.random() * 2 - 1), 3) * 0.1;
                    let t2 = Math.pow((Math.random() * 2 - 1), 3) * 0.1;
                    let t3 = Math.pow((Math.random() * 2 - 1), 3) * 0.1;
                    randomRotations.push([t1, t2, t3]);
                    meshes.push(obj);

                    let sprite = null;
                    if (entryList[i].message != '' && i != 0) {
                        let canvas = document.createElement('canvas');
                        let ctx = canvas.getContext('2d');
                        let material;
                        canvas.width = 1000;
                        canvas.height = 500;
                        ctx.beginPath();
                        ctx.moveTo(1000,500);
                        ctx.arcTo(0,500,0,0,30);
                        ctx.arcTo(0,0,1000,0,30);
                        ctx.arcTo(1000,0,1000,500,30);
                        ctx.arcTo(1000,500,0,500,30);
                        ctx.closePath();
                        ctx.fillStyle = "rgba(255, 255, 255, 1)";
                        ctx.fill();
                        ctx.font = "100 100px sans-serif";
                        ctx.fillStyle = "rgba(0, 0, 0, 1)";
                        ctx.textAlign = "center";
                        this.smartFillText(entryList[i].message, ctx);
                        texture = new Three.CanvasTexture(canvas);
                        material = new Three.SpriteMaterial({map: texture});
                        sprite = new Three.Sprite(material);
                        sprite.scale.set(5, 2.5, 0);
                        sprite.position.set(x,y+3,z);
                        sprite.name = "deletable";
                        scene.add(sprite);
                    }

                    meshes[i].correspondingSprite = sprite;

                }

                //stars
                for (let i = 0; i < 2000; i++) {
                    let material = new Three.MeshBasicMaterial({color: 0xffffff});
                    let obj = new Three.Mesh(new Three.SphereGeometry(), material);
                    obj.position.setFromSphericalCoords(750, Math.acos(2*Math.random() - 1), Math.random()*2*Math.PI);
                    scene.add(obj);
                }

                
                //current user message
                let canvas = document.createElement('canvas');
                context = canvas.getContext('2d');
                let material;
                let sprite;
                canvas.width = 1000;
                canvas.height = 500;
                context.beginPath();
                context.moveTo(1000,500);
                context.arcTo(0,500,0,0,30);
                context.arcTo(0,0,1000,0,30);
                context.arcTo(1000,0,1000,500,30);
                context.arcTo(1000,500,0,500,30);
                context.closePath();
                context.fillStyle = "rgba(255, 255, 255, 0.5)";
                context.fill();
                context.font = "100 100px sans-serif";
                context.fillStyle = "rgba(100, 100, 100, 1)";
                context.textAlign = "center";
                this.smartFillText("Leave a message", context);
                texture = new Three.CanvasTexture(canvas);
                material = new Three.SpriteMaterial({map: texture});
                sprite = new Three.Sprite(material);
                sprite.scale.set(5, 2.5, 0);
                sprite.position.set(0,scale+3,0);
                sprite.name = "current";
                meshes[0].correspondingSprite = sprite;
                scene.add(sprite);


                this.animate()

            },

            animate() {
                requestAnimationFrame(this.animate);

                texture.needsUpdate = true;
                for (let i = 0; i < meshes.length; i++) {              
                    meshes[i].rotation.x += randomRotations[i][0];
                    meshes[i].rotation.y += randomRotations[i][1];
                    meshes[i].rotation.z += randomRotations[i][2];
                }
  
                controls.update();
                renderer.render(scene, camera);

            },

            toHex(arr) {
                let transformer = (c) => {
                    let hex = c.toString(16);
                    return hex.length == 1 ? "0" + hex : hex;
                }

                return parseInt(transformer(arr[0]) + transformer(arr[1]) + transformer(arr[2]), 16);
            },

            toHexString(arr) {
                let transformer = (c) => {
                    let hex = c.toString(16);
                    return hex.length == 1 ? "0" + hex : hex;
                }

                return transformer(arr[0]) + transformer(arr[1]) + transformer(arr[2]);
            },

            smartFillText(text, c) {

                const fontsize = 100;
          
                let arr = text.split(/\s\s*/);
                let counter = 0;
                let firstword = true;
                let numlines = 1;
                for (let i = 0; i < arr.length; i++) {
                    counter += arr[i].length;
                    if (counter > 15 && !firstword && numlines <= 3) {
                        counter = arr[i].length;
                        arr[i] = "\n" + arr[i];
                        numlines++;
                    } else {
                        firstword = false;
                    }
                }

                text = arr.join(' ');
                const x = 500;
                const y = 275;
                const lineheight = fontsize;
                const lines = text.split('\n');
                c.font = "100 " + fontsize + "px sans-serif";
                for (let i = 0; i < lines.length; i++) {
                    c.fillText(lines[i], x, y + ((i - (lines.length - 1) / 2) * lineheight));
                }
            },


            async getData() {
                try {
                    // fetch tasks
                    const response = await axios.get(URL + '/api/');
                    return response.data; 
                } catch (error) {
                    // log the error
                    console.log(error);
                    throw error;
                }
            },

            async post(msg){
                try {
                    // Send a POST request to the API
                    const response = await axios.post(URL + '/api/', {message: msg, color: this.toHexString(this.colorScheme[2]), geometry: numG, deleted: false});
                    posted = true;
                    item = response.data;
                } catch (error) {
                    // Log the error
                    console.log(error);
                }
            },

            whitenCanvas(num) {

                requestAnimationFrame(() => this.whitenCanvas(num + 0.05))

                context.beginPath();
                context.moveTo(1000,500);
                context.arcTo(0,500,0,0,30);
                context.arcTo(0,0,1000,0,30);
                context.arcTo(1000,0,1000,500,30);
                context.arcTo(1000,500,0,500,30);
                context.closePath();
                context.clearRect(0, 0, 1000, 500);
                context.fillStyle = `rgba(255, 255, 255, ${0.5 + num})`;
                context.fill();
                context.font = "100 100px sans-serif";
                context.fillStyle = "rgba(0, 0, 0, 1)";
                this.smartFillText(this.message, context);

            },
            onDocumentMouseDown(event) {
                let ray = new Three.Raycaster();
                let mouse = new Three.Vector2();
                mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
                mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
                ray.setFromCamera( mouse, camera );
                var intersects = ray.intersectObjects( scene.children );
                for (let i = 0; i < intersects.length; i++) {
                    if (intersects[0].object.name === 'deletable') {
                        this.menuTop = event.clientY;
                        this.menuLeft = event.clientX;
                        this.menuShow = true;
                        queuedToDelete = intersects[0].object;
                        break;
                    } else if (intersects[0].object.name === 'current') {
                        this.menuTop = event.clientY;
                        this.menuLeft = event.clientX;
                        this.menuShow = true;
                        queuedToDelete = intersects[0].object;
                        onCurrent = true;
                        break;
                    }
                }

            },

            menuDelete() {
                let mesh;
                let sprite

                if (queuedToDelete.hasOwnProperty('correspondingSprite')) {
                    mesh = queuedToDelete;
                    sprite = queuedToDelete.correspondingSprite;
                } else {
                    mesh = meshes.find(obj => {
                        return obj.correspondingSprite == queuedToDelete;
                    })
                    sprite = queuedToDelete;
                }

                scene.remove(mesh, sprite);
                if (!onCurrent) {
                    deletedEntries.push(mesh.callback());
                }
                this.menuShow = false;
                queuedToDelete = null;
                if (onCurrent) {
                    currentDeleted = true;
                    this.currentDeletedDOM = true;
                }
                onCurrent = false;
                
            },
            menuCancel() {
                this.menuShow = false;
                queuedToDelete = null;
                onCurrent = false;
            },
        },

        watch: {
            message(message) {

                context.clearRect(0, 30, 1000, 440);
                context.fillStyle = `rgba(255, 255, 255, 0.5)`;
                context.fillRect(0, 30, 1000, 440);                
                context.font = "100 100px sans-serif";
                context.fillStyle = "rgba(0, 0, 0, 1)";
                this.smartFillText(message, context);

            },

            submitted() {

                this.whitenCanvas(0);

            },

        },

        created() {
        },

        //a bunch of very messy stuff
        async mounted() {
            await this.init();
            window.addEventListener('contextmenu', this.onDocumentMouseDown);
            window.addEventListener('beforeunload',  function(event){
                if (!posted) {
                    try {
                        axios.post(URL + '/api/', {message: '', color: mainColor, geometry: numG, deleted: currentDeleted})
                    } catch (error) {
                        console.log(error);
                    }
                }
                if (currentDeleted && posted) {
                    try{
                        axios.put(`${URL}/api/${item.id}/`, {deleted: true});
                    } catch(error) {
                        console.log(error)
                    }
                }
                for (let i = 0; i < deletedEntries.length; i++) {
                    try{
                        axios.put(`${URL}/api/${deletedEntries[i].id}/`, {deleted: true});
                    } catch(error) {
                        console.log(error)
                    }
                }
            });
        },

        unmounted() {
            window.removeEventListener('click', this.onDocumentMouseDown);
        }

    }
</script>


<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.text-xxs {
    font-size: 0.6rem;
    line-height: 0.6rem;
}

</style>