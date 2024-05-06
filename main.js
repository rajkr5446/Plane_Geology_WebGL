import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// import {data} from '/index.js'
// console.log(data);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

const directionalLight = new THREE.DirectionalLight( 0xfffbbb, 1 );
scene.add( directionalLight );
// const 

const axesHelper =new THREE.AxesHelper(10 ,10);
scene.add(axesHelper);
axesHelper.position.set(0, -1 , 0);
const gridHelper = new THREE.GridHelper(8,8)
scene.add(gridHelper);
gridHelper.position.set(0,1 , 0);
const geometry = new THREE.SphereGeometry(2, 100, 10, 0, 2*Math.PI, 0, Math.PI/2);
const material = new THREE.MeshStandardMaterial( { color: 0xffff00 ,
wireframe : false ,
transparent :true,
opacity: 0.6} );
material.side = THREE.DoubleSide;
const sphere = new THREE.Mesh( geometry, material );
sphere.rotateX(Math.PI)
sphere.position.set(0 , 1 , 0);
scene.add( sphere );
console.log(geometry);

//RING ON THE HEMISPHERE
const ringGeometry = new THREE.RingGeometry( 2, 2.02, 32 );
const ringMaterial = new THREE.MeshStandardMaterial( { color: 0xaaaccc, side: THREE.DoubleSide } );
const ringMesh = new THREE.Mesh( ringGeometry, ringMaterial );
scene.add( ringMesh );
ringMesh.rotateX(Math.PI/2)
ringMesh.position.set(0 , 1 , 0);


//North sphere

const North = new THREE.SphereGeometry(0.05 , 100 ,100);
const northMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff ,
wireframe : false ,
} );
const northMesh = new THREE.Mesh(North , northMaterial);
northMesh.position.set(0 , 1 ,-2.1 );
scene.add(northMesh);



// import {dip1} from './index.js';
// console.log(dip1);
// var dip = [30 ,60 ,90] ;
// var direction =[45 , 270 ,20];
// var ax = Math.sin(Math.PI/180*dip)*Math.sin(Math.PI/180*direction);
// var ay = Math.sin(Math.PI/180*dip)*Math.cos(Math.PI/180*direction);
// var az = Math.cos(Math.PI*dip/180);



window.plot = function createPlane(dip ,direction ,color){
const circleGeometry = new THREE.CircleGeometry( 2, 100 ,Math.PI ,Math.PI);
const circleMaterial = new THREE.MeshStandardMaterial( { color: color } );
circleMaterial.side = THREE.DoubleSide;
const circle = new THREE.Mesh( circleGeometry, circleMaterial );
scene.add( circle )
circle.position.set(0 , 1 , 0);
circle.rotateY(-2*Math.PI/360*direction);
circle.rotateX(Math.PI/2 - Math.PI/180*dip);
}
// for(var i = 0; i<dip.length ;i++){
//     plot(dip[i], direction[i])
// }
var col = ['#ff7f50' ,'#5f9ea0' , '#ff69b4' , '	#cd5c5c' , '#20b2aa']
var i = 0;
window.addEventListener('dblclick', function(){
var color = col[i];
i = (i+1)%7;
var dip = document.getElementById("dip").value;
var direction = document.getElementById("direction").value;
// document.createElement('a').innerText('HELLO');
// console.log(dip);
plot(dip ,direction , color);
})

const planeGeometry = new THREE.PlaneGeometry(10,10);
const planeMaterial = new THREE.MeshBasicMaterial({
    color : 0xffcccc,
})
planeMaterial.side = THREE.DoubleSide;
const planeMesh = new THREE.Mesh(planeGeometry , planeMaterial);
scene.add(planeMesh);
planeMesh.rotateX(Math.PI/2);
planeMesh.position.set(0 , -1 , 0);

camera.position.z = 5;
const orbit = new OrbitControls( camera, renderer.domElement );
orbit.update();
function animate() {
    // planeMesh.rotateY(0.02w);
    // circle.rotateZ(az);
    // az = 0.02; 
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();