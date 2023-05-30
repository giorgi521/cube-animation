import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'  
import * as dat from 'dat.gui'
import gsap from 'gsap'

const gui = new dat.GUI();

// Textures
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/door.jpg')

const canvas =  document.querySelector('canvas.webgl')

const cursor = {
    x: 0,
    y: 0
}

// window.addEventListener('mousemove', (event) => {
//     cursor.x = event.clientX / sizes.width - 0.5
//     cursor.y = event.clientY / sizes.height - 0.5
// })

// Scene
const scene = new THREE.Scene()

// Object
const group = new THREE.Group()
scene.add(group)


// axes helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

// const positionArray = new Float32Array([
//     0, 0, 0,
//     0, 1, 0,
//     1, 0, 0
// ])   
// const positionAttribute = new THREE.BufferAttribute(positionArray, 3)

// const geometry = new THREE.BufferGeometry()
// geometry.setAttribute('position', positionAttribute)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true})
// const triangle = new THREE.Mesh(geometry, material)


// same as above
// const triangle = new THREE.Mesh(
//     new THREE.BufferGeometry().setAttribute('position', positionAttribute),
//     new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true})
// )
// group.add(triangle)


// const geometry = new THREE.BufferGeometry()

// const count = 500 
// const positionArray = new Float32Array(count * 3 * 3)

// for(let i = 0; i < count * 3 * 3; i++){
//     positionArray[i] = (Math.random() - 0.5) * 4
// }

// const  positionAttribute = new THREE.BufferAttribute(positionArray, 3)
// geometry.setAttribute('position', positionAttribute)

// const material = new THREE.MeshBasicMaterial({ map:texture})

// const mesh = new THREE.Mesh(geometry, material)
// group.add(mesh)


//debug
// gui.add(mesh.position, 'y', -3 , 3, 0.01)
// gui.add(mesh.position, 'x', -3 , 3, 0.01)
// gui.add(mesh.position, 'z', -3 , 3, 0.01)

// const parameter = {
//     color: 0xff0000,
//     spin: () => {
//         gsap.to(mesh.rotation, { y: mesh.rotation.y + 10, duration: 1})
//     }
// }
// gui.addColor(parameter, 'color').onChange(() => {
//     mesh.material.color.set(parameter.color)
// })

// gui.add(parameter, 'spin').onChange(() => {
//     parameter.spin()
// })


const  cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 2 , 2 , 2 ),
    new THREE.MeshBasicMaterial({ map:texture})
)

group.add(cube1)


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height 
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})


renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement    
    if(!fullscreenElement){
        if(canvas.requestFullscreen){
            canvas.requestFullscreen()
        }else if(canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen()
        }
    }else{
        if(document.exitFullscreen){
            document.exitFullscreen()
        }else if(document.webkitExitFullscreen){
            document.webkitExitFullscreen()
        }
    }
})

// gsap.to(cube1.position, { x:2, duration:1 , delay:1})
// gsap.to(cube1.position, { x:-2, duration:1, delay:2})

let time = new THREE.Clock()
// animations
const tick = () => {

    const elapsedTime = time.getElapsedTime()

    // camera.position.x = Math.sin(cursor.x * Math.PI * 2 ) * 3
    // camera.position.z = Math.cos(cursor.x  * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5
    // camera.lookAt(cube1.position)

    // cube1.rotation.y = Math.sin(elapsedTime)
    // cube1.rotation.x = Math.sin(elapsedTime)

    //update controls
    controls.update()
    
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick();

