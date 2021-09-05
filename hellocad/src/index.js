import {
    Scene,
    PerspectiveCamera,
    CameraHelper,
    WebGLRenderer,
    PCFSoftShadowMap,
    DirectionalLight,
    DirectionalLightHelper,
    AmbientLight,
    Vector3,
    GridHelper,
    AxesHelper,
    Mesh,
    PlaneGeometry,
    MeshPhongMaterial,
    MeshBasicMaterial,
    ShadowMaterial,
    BoxGeometry,
    SphereGeometry,
    IcosahedronGeometry,
    TorusGeometry,
    CylinderGeometry,
} from 'three/build/three.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';
import Modeling from '@jscad/modeling';
import CSG2Geom from './csg2geom';

const scene = new Scene();
const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    50
);
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x444444);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const keyLight = new DirectionalLight(0xffffff, 0.5);
keyLight.position.set(5, 10, 5);
keyLight.castShadow = true;
scene.add(keyLight);
const helper = new DirectionalLightHelper(keyLight, 2);
//scene.add(helper);
const shadowFrustumSize = 12;
keyLight.shadow.camera.near = 1;
keyLight.shadow.camera.far = 20;
keyLight.shadow.camera.top = shadowFrustumSize;
keyLight.shadow.camera.bottom = -shadowFrustumSize;
keyLight.shadow.camera.left = -shadowFrustumSize;
keyLight.shadow.camera.right = shadowFrustumSize;
const shadowCameraHelper = new CameraHelper(keyLight.shadow.camera);
//scene.add(shadowCameraHelper);

const ambientLight = new AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const shadowMaterial = new ShadowMaterial();
shadowMaterial.opacity = 0.5;
const shadowPlane = new Mesh(new PlaneGeometry(16, 16), shadowMaterial);
shadowPlane.receiveShadow = true;
shadowPlane.rotation.x = Math.PI / -2;
scene.add(shadowPlane);

const gridHelper = new GridHelper(16, 16, 0x111111);
scene.add(gridHelper);

const axesHelper = new AxesHelper(2);
axesHelper.position.set(-6, 0, 6);
scene.add(axesHelper);

const cameraLookTarget = new Vector3(0, 0, 0);
camera.position.set(0, 5, 10);
camera.lookAt(cameraLookTarget);

const controls = new OrbitControls(camera, renderer.domElement);

const {
    cube,
    cuboid,
    cylinder,
    cylinderElliptic,
    geodesicSphere,
    roundedCuboid,
    roundedCylinder,
    sphere,
    torus,
} = Modeling.primitives;
const { translate, rotate, scale } = Modeling.transforms;
const { intersect, subtract, union } = Modeling.booleans;
const material = new MeshPhongMaterial();
const wireMaterial = new MeshBasicMaterial({ color: 0x444444 });
wireMaterial.wireframe = true;

const normalsLength = 0.3;
let csgMesh;
let csgGeometry;
let wireMesh;
let normalsHelper;

csgGeometry = CSG2Geom(translate([-3, 1, -3], cube()));
csgMesh = new Mesh(csgGeometry, material);
csgMesh.castShadow = true;
scene.add(csgMesh);
wireMesh = csgMesh.clone();
wireMesh.material = wireMaterial;
scene.add(wireMesh);
normalsHelper = new VertexNormalsHelper(csgMesh, normalsLength);
scene.add(normalsHelper);

csgGeometry = CSG2Geom(translate([0, 1, -3], cuboid({ size: [2.5, 2, 2] })));
csgMesh = new Mesh(csgGeometry, material);
csgMesh.castShadow = true;
scene.add(csgMesh);
wireMesh = csgMesh.clone();
wireMesh.material = wireMaterial;
scene.add(wireMesh);
normalsHelper = new VertexNormalsHelper(csgMesh, normalsLength);
scene.add(normalsHelper);

csgGeometry = CSG2Geom(translate([3, 1, -3], roundedCuboid({ segments: 8 })));
csgMesh = new Mesh(csgGeometry, material);
csgMesh.castShadow = true;
scene.add(csgMesh);
wireMesh = csgMesh.clone();
wireMesh.material = wireMaterial;
scene.add(wireMesh);
normalsHelper = new VertexNormalsHelper(csgMesh, normalsLength);
scene.add(normalsHelper);

csgGeometry = CSG2Geom(
    translate(
        [-3, 1, 0],
        rotate(
            [Math.PI * 0.5, 0, 0],
            scale([1, 1, 1], cylinder({ segments: 12 }))
        )
    )
);
csgMesh = new Mesh(csgGeometry, material);
csgMesh.castShadow = true;
scene.add(csgMesh);
wireMesh = csgMesh.clone();
wireMesh.material = wireMaterial;
scene.add(wireMesh);
normalsHelper = new VertexNormalsHelper(csgMesh, normalsLength);
scene.add(normalsHelper);

csgGeometry = CSG2Geom(
    translate(
        [0, 1, 0],
        rotate(
            [Math.PI * 0.5, 0, 0],
            cylinderElliptic({ startRadius: [1.25, 1], segments: 16 })
        )
    )
);
csgMesh = new Mesh(csgGeometry, material);
csgMesh.castShadow = true;
scene.add(csgMesh);
wireMesh = csgMesh.clone();
wireMesh.material = wireMaterial;
scene.add(wireMesh);
normalsHelper = new VertexNormalsHelper(csgMesh, normalsLength);
scene.add(normalsHelper);

csgGeometry = CSG2Geom(
    translate(
        [3, 1, 0],
        rotate([Math.PI * 0.5, 0, 0], roundedCylinder({ segments: 16 }))
    )
);
csgMesh = new Mesh(csgGeometry, material);
csgMesh.castShadow = true;
scene.add(csgMesh);
wireMesh = csgMesh.clone();
wireMesh.material = wireMaterial;
scene.add(wireMesh);
normalsHelper = new VertexNormalsHelper(csgMesh, normalsLength);
scene.add(normalsHelper);

csgGeometry = CSG2Geom(
    translate(
        [-3, 1, 3],
        rotate([Math.PI * 0.5, 0, 0], sphere({ segments: 12 }))
    )
);
csgMesh = new Mesh(csgGeometry, material);
csgMesh.castShadow = true;
scene.add(csgMesh);
wireMesh = csgMesh.clone();
wireMesh.material = wireMaterial;
scene.add(wireMesh);
normalsHelper = new VertexNormalsHelper(csgMesh, normalsLength);
scene.add(normalsHelper);

csgGeometry = CSG2Geom(translate([0, 1, 3], geodesicSphere({ frequency: 12 })));
csgMesh = new Mesh(csgGeometry, material);
csgMesh.castShadow = true;
scene.add(csgMesh);
wireMesh = csgMesh.clone();
wireMesh.material = wireMaterial;
scene.add(wireMesh);
normalsHelper = new VertexNormalsHelper(csgMesh, normalsLength);
scene.add(normalsHelper);

csgGeometry = CSG2Geom(
    translate(
        [3, 0.5, 3],
        rotate(
            [Math.PI * 0.5, 0, 0],
            torus({
                innerRadius: 0.4,
                outerRadius: 1,
                innerSegments: 8,
                outerSegments: 12,
            })
        )
    )
);
csgMesh = new Mesh(csgGeometry, material);
csgMesh.castShadow = true;
scene.add(csgMesh);
wireMesh = csgMesh.clone();
wireMesh.material = wireMaterial;
scene.add(wireMesh);
normalsHelper = new VertexNormalsHelper(csgMesh, normalsLength);
scene.add(normalsHelper);

csgGeometry = CSG2Geom(
    translate(
        [-3, 1, 6],
        union(
            intersect(cube({ size: 1.5 }), sphere({ segments: 24 })),
            subtract(cube(), sphere({ radius: 1.33, segments: 24 }))
        )
    )
);
csgMesh = new Mesh(csgGeometry, material);
csgMesh.castShadow = true;
scene.add(csgMesh);
wireMesh = csgMesh.clone();
wireMesh.material = wireMaterial;
scene.add(wireMesh);
normalsHelper = new VertexNormalsHelper(csgMesh, normalsLength);
scene.add(normalsHelper);

const threeMeshMateral = new MeshPhongMaterial({ color: 0xaaaaaa });

let geometry = new BoxGeometry(2, 2, 2);
let mesh = new Mesh(geometry, threeMeshMateral);
mesh.castShadow = true;
mesh.position.set(-6, 1, -3);
scene.add(mesh);
wireMesh = mesh.clone();
wireMesh.material = wireMaterial;
scene.add(wireMesh);
normalsHelper = new VertexNormalsHelper(mesh, normalsLength);
scene.add(normalsHelper);

geometry = new CylinderGeometry(1, 1, 2, 16);
mesh = new Mesh(geometry, threeMeshMateral);
mesh.castShadow = true;
mesh.position.set(-6, 1, 0);
scene.add(mesh);
wireMesh = mesh.clone();
wireMesh.material = wireMaterial;
scene.add(wireMesh);
normalsHelper = new VertexNormalsHelper(mesh, normalsLength);
scene.add(normalsHelper);

geometry = new SphereGeometry(1, 12, 6);
mesh = new Mesh(geometry, threeMeshMateral);
mesh.castShadow = true;
mesh.position.set(-6, 1, 3);
scene.add(mesh);
wireMesh = mesh.clone();
wireMesh.material = wireMaterial;
scene.add(wireMesh);
normalsHelper = new VertexNormalsHelper(mesh, normalsLength);
scene.add(normalsHelper);

geometry = new IcosahedronGeometry(1, 1);
mesh = new Mesh(geometry, threeMeshMateral);
mesh.castShadow = true;
mesh.position.set(0, 1, 6);
scene.add(mesh);
wireMesh = mesh.clone();
wireMesh.material = wireMaterial;
scene.add(wireMesh);
normalsHelper = new VertexNormalsHelper(mesh, normalsLength);
scene.add(normalsHelper);

geometry = new TorusGeometry(1, 0.4, 8, 12);
mesh = new Mesh(geometry, threeMeshMateral);
mesh.castShadow = true;
mesh.position.set(3, 0.5, 6);
mesh.rotation.x = Math.PI / 2;
scene.add(mesh);
wireMesh = mesh.clone();
wireMesh.material = wireMaterial;
scene.add(wireMesh);
normalsHelper = new VertexNormalsHelper(mesh, normalsLength);
scene.add(normalsHelper);

function update() {
    controls.update();
}

function render() {
    renderer.render(scene, camera);
}

function handleAnimationFrame() {
    window.requestAnimationFrame(handleAnimationFrame);
    update();
    render();
}

handleAnimationFrame();

function handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

function debounce(callback, wait) {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback.apply(null, args);
        }, wait);
    };
}

window.addEventListener('resize', debounce(handleResize, 300), false);
