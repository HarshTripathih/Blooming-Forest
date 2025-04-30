// "use client";

// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';
// import { useRef, useState } from 'react';
// import * as THREE from 'three';

// function Car({ pathPoints }) {
//   const carRef = useRef();
//   const { scene } = useGLTF('/images/car_model.glb');
//   const [progress, setProgress] = useState(0);

//   useFrame((state, delta) => {
//     if (!carRef.current) return;

//     const t = (progress + delta * 0.05) % 1;
//     const pointIndex = Math.floor(t * (pathPoints.length - 1));
//     const nextIndex = (pointIndex + 1) % pathPoints.length;

//     const currentPoint = pathPoints[pointIndex];
//     const nextPoint = pathPoints[nextIndex];

//     const position = new THREE.Vector3().lerpVectors(currentPoint, nextPoint, (t * (pathPoints.length - 1)) % 1);
//     carRef.current.position.copy(position);

//     const direction = new THREE.Vector3().subVectors(nextPoint, currentPoint).normalize();
//     const rotation = Math.atan2(direction.x, direction.z);
//     carRef.current.rotation.y = rotation;

//     setProgress(t);
//   });

//   return <primitive ref={carRef} object={scene} scale={0.5} />;
// }

// export default function CarAnimation() {
//   const points = [
//     new THREE.Vector3(0, 0, 0),
//     new THREE.Vector3(5, 0, -2),
//     new THREE.Vector3(10, 0, 0),
//     new THREE.Vector3(15, 0, 5),
//     new THREE.Vector3(20, 0, 0),
//     new THREE.Vector3(25, 0, -5),
//     new THREE.Vector3(30, 0, 0),
//   ];

//   return (
//     <Canvas camera={{ position: [15, 10, 20], fov: 50 }}>
//       <ambientLight />
//       <pointLight position={[10, 10, 10]} />
//       <Car pathPoints={points} />
//       <OrbitControls />
//     </Canvas>
//   );
// }








// "use client";

// import { Canvas, useFrame } from "@react-three/fiber";
// import { useGLTF } from "@react-three/drei";
// import * as THREE from "three";
// import { useRef, useState } from "react";

// // Plane component lands at airport
// function Plane() {
//   const ref = useRef();
//   const { scene } = useGLTF("/images/aeroplane.glb");
//   const [landed, setLanded] = useState(false);
//   const [t, setT] = useState(0);

//   useFrame((_, delta) => {
//     if (!landed && ref.current) {
//       const newT = Math.min(t + delta * 0.3, 1);
//       const position = new THREE.Vector3().lerpVectors(
//         new THREE.Vector3(-50, 50, 0), // Start from sky
//         new THREE.Vector3(0, 0, 0),    // Airport position
//         newT
//       );
//       ref.current.position.copy(position);
//       ref.current.rotation.x = -Math.PI / 8;
//       setT(newT);
//       if (newT >= 1) setLanded(true);
//     }
//   });

//   return <primitive ref={ref} object={scene} scale={0.01} />;
// }

// // Car moves through points
// function Car({ pathPoints, cameraRef }) {
//   const carRef = useRef();
//   const { scene } = useGLTF("/images/car_model.glb");
//   const [progress, setProgress] = useState(0);

//   useFrame((_, delta) => {
//     if (!carRef.current) return;

//     const t = (progress + delta * 0.03) % 1;
//     const pointIndex = Math.floor(t * (pathPoints.length - 1));
//     const nextIndex = pointIndex + 1;

//     const currentPoint = pathPoints[pointIndex];
//     const nextPoint = pathPoints[nextIndex];

//     const pos = new THREE.Vector3().lerpVectors(
//       currentPoint,
//       nextPoint,
//       (t * (pathPoints.length - 1)) % 1
//     );

//     carRef.current.position.copy(pos);

//     const dir = new THREE.Vector3().subVectors(nextPoint, currentPoint).normalize();
//     carRef.current.rotation.y = Math.atan2(dir.x, dir.z);

//     // Camera follows car
//     if (cameraRef.current) {
//       const camPos = new THREE.Vector3(pos.x, pos.y + 10, pos.z + 20);
//       cameraRef.current.position.lerp(camPos, 0.05);
//       cameraRef.current.lookAt(pos);
//     }

//     setProgress(t);
//   });

//   return <primitive ref={carRef} object={scene} scale={0.05} />;
// }

// // Full Animation
// export default function CarAnimation() {
//   const cameraRef = useRef();

//   const path = [
//     new THREE.Vector3(0, 0, 0),        // Airport
//     new THREE.Vector3(10, 0, -10),
//     new THREE.Vector3(20, 0, -5),
//     new THREE.Vector3(30, 0, 0),
//     new THREE.Vector3(40, 0, 10),
//     new THREE.Vector3(50, 0, 15),      // Aliens Hub
//   ];

//   return (
//     <Canvas
//       camera={{ position: [0, 10, 40], fov: 50 }}
//       onCreated={({ camera }) => (cameraRef.current = camera)}
//     >
//       <ambientLight />
//       <pointLight position={[10, 10, 10]} />
//       <Plane />
//       <Car pathPoints={path} cameraRef={cameraRef} />
//     </Canvas>
//   );
// }







// "use client";

// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { useGLTF, useTexture } from "@react-three/drei";
// import * as THREE from "three";
// import { useRef, useState, useEffect } from "react";
// import { OrbitControls } from "@react-three/drei";

// // Plane lands at airport
// function Plane({ onLanded }) {
//   const ref = useRef();
//   const { scene } = useGLTF("/images/aeroplane.glb");
//   const [t, setT] = useState(0);

//   useFrame((_, delta) => {
//     if (!ref.current) return;

//     const newT = Math.min(t + delta * 0.2, 1);
//     const start = new THREE.Vector3(-30, 20, 0); // Start above screen
//     const end = new THREE.Vector3(5, 0.1, 5);    // Approximate airport location on map
//     const pos = new THREE.Vector3().lerpVectors(start, end, newT);
//     ref.current.position.copy(pos);
//     ref.current.rotation.x = -Math.PI / 10;

//     setT(newT);
//     if (newT >= 1) {
//       onLanded();
//     }
//   });

//   return <primitive ref={ref} object={scene} scale={0.01} />;
// }

// // Car moves through path
// function Car({ pathPoints, cameraRef, move }) {
//   const carRef = useRef();
//   const { scene } = useGLTF("/images/car_model.glb");
//   const [progress, setProgress] = useState(0);

//   useFrame((_, delta) => {
//     if (!move || !carRef.current) return;

//     const t = (progress + delta * 0.02) % 1;
//     const index = Math.floor(t * (pathPoints.length - 1));
//     const next = index + 1;

//     const curr = pathPoints[index];
//     const nextPoint = pathPoints[next];

//     const pos = new THREE.Vector3().lerpVectors(
//       curr,
//       nextPoint,
//       (t * (pathPoints.length - 1)) % 1
//     );

//     carRef.current.position.copy(pos);

//     const dir = new THREE.Vector3().subVectors(nextPoint, curr).normalize();
//     carRef.current.rotation.y = Math.atan2(dir.x, dir.z);

//     if (cameraRef.current) {
//       const camPos = new THREE.Vector3(pos.x, pos.y + 5, pos.z + 10);
//       cameraRef.current.position.lerp(camPos, 0.1);
//       cameraRef.current.lookAt(pos);
//     }

//     setProgress(t);
//   });

//   return <primitive ref={carRef} object={scene} scale={0.015} />;
// }

// // Background SVG map as a plane
// function MapPlane() {
//   const texture = useTexture("/images/hyderabadmap.svg"); // convert SVG to PNG for simplicity

//   return (
//     <mesh position={[25, -0.01, 10]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
//       <planeGeometry args={[100, 100]} />
//       <meshBasicMaterial map={texture} />
//     </mesh>
//   );
// }

// // Full animation scene
// export default function CarAnimation() {
//   const cameraRef = useRef();
//   const [planeLanded, setPlaneLanded] = useState(false);

//   // Update this path based on the actual locations on the map
//   const path = [
//     new THREE.Vector3(5, 0.1, 5),   // Airport
//     new THREE.Vector3(10, 0.1, 8),
//     new THREE.Vector3(20, 0.1, 10),
//     new THREE.Vector3(35, 0.1, 12),
//     new THREE.Vector3(50, 0.1, 15), // Aliens Hub
//   ];

//   return (
//     <Canvas camera={{ position: [0, 10, 30], fov: 50 }} onCreated={({ camera }) => (cameraRef.current = camera)}>
//   <ambientLight />
//   <pointLight position={[10, 10, 10]} />
  
//   <MapPlane />
//   <Plane onLanded={() => setPlaneLanded(true)} />
//   <Car pathPoints={path} cameraRef={cameraRef} move={planeLanded} />

//   {/* OrbitControls for dragging */}
//   <OrbitControls
//     enableZoom={false}
//     enableRotate={false}
//     enablePan={true}
//     mouseButtons={{
//       LEFT: null,
//       RIGHT: THREE.MOUSE.PAN,
//       MIDDLE: null,
//     }}
//   />
// </Canvas>
//   );
// }










// "use client";

// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
// import * as THREE from "three";
// import { useRef, useState } from "react";

// // ✳️ New: Handles camera zoom on scroll
// function CameraZoomController({ zoomed, cameraRef }) {
//   useFrame(() => {
//     if (cameraRef.current) {
//       const targetZ = zoomed ? 15 : 30;
//       const current = cameraRef.current.position;
//       cameraRef.current.position.lerp(new THREE.Vector3(current.x, current.y, targetZ), 0.05);
//     }
//   });
//   return null;
// }

// function Plane({ onLanded }) {
//   const ref = useRef();
//   const { scene } = useGLTF("/images/aeroplane.glb");
//   const [t, setT] = useState(0);

//   useFrame((_, delta) => {
//     if (!ref.current) return;
//     const newT = Math.min(t + delta * 0.2, 1);
//     const start = new THREE.Vector3(-30, 20, 0);
//     const end = new THREE.Vector3(5, 0.1, 5);
//     const pos = new THREE.Vector3().lerpVectors(start, end, newT);

//     ref.current.position.copy(pos);
//     ref.current.rotation.x = -Math.PI / 10;

//     setT(newT);
//     if (newT >= 1) onLanded();
//   });

//   return <primitive ref={ref} object={scene} scale={0.005} />;  // Decreased size of plane
// }

// function Car({ pathPoints, cameraRef, move }) {
//   const carRef = useRef();
//   const { scene } = useGLTF("/images/car_model.glb");
//   const [progress, setProgress] = useState(0);

//   useFrame((_, delta) => {
//     if (!move || !carRef.current) return;

//     const t = (progress + delta * 0.02) % 1;
//     const index = Math.floor(t * (pathPoints.length - 1));
//     const next = index + 1;
//     const curr = pathPoints[index];
//     const nextPoint = pathPoints[next];

//     const pos = new THREE.Vector3().lerpVectors(
//       curr,
//       nextPoint,
//       (t * (pathPoints.length - 1)) % 1
//     );

//     carRef.current.position.copy(pos);
//     const dir = new THREE.Vector3().subVectors(nextPoint, curr).normalize();
//     carRef.current.rotation.y = Math.atan2(dir.x, dir.z);

//     if (cameraRef.current) {
//       const camPos = new THREE.Vector3(pos.x, pos.y + 5, pos.z + 10);
//       cameraRef.current.position.lerp(camPos, 0.1);
//       cameraRef.current.lookAt(pos);
//     }

//     setProgress(t);
//   });

//   return <primitive ref={carRef} object={scene} scale={0.1} />;  // Increased size of car
// }

// function MapPlane() {
//   const texture = useTexture("/images/hyderabadmap.svg"); // use PNG version of map
//   return (
//     <mesh position={[25, -0.01, 10]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
//       <planeGeometry args={[80, 50]} />  {/* Decreased size of map plane */}
//       <meshBasicMaterial map={texture} />
//     </mesh>
//   );
// }

// export default function CarAnimation({ zoomed }) {
//   const cameraRef = useRef();
//   const [planeLanded, setPlaneLanded] = useState(false);

//   const path = [
//     new THREE.Vector3(5, 0.1, 5),
//     new THREE.Vector3(10, 0.1, 25),
//     new THREE.Vector3(20, 0.1, 10),
//     new THREE.Vector3(35, 0.1, 12),
//     new THREE.Vector3(50, 0.1, 15),
//   ];

//   return (
//     <Canvas camera={{ position: [0, 10, 30], fov: 50 }} onCreated={({ camera }) => (cameraRef.current = camera)}>
//       <ambientLight />
//       <pointLight position={[10, 10, 10]} />


//       <MapPlane />
//       <Plane onLanded={() => setPlaneLanded(true)} />
//       <Car pathPoints={path} cameraRef={cameraRef} move={planeLanded} />
//       <CameraZoomController zoomed={zoomed} cameraRef={cameraRef} />

//       <OrbitControls
//         enableZoom={false}
//         enableRotate={false}
//         enablePan={true}
//         mouseButtons={{
//           LEFT: THREE.MOUSE.PAN,
//           RIGHT: null,
//           MIDDLE: null,
//         }}
//       />
//     </Canvas>
//   );
// }






//working code



// "use client";

// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
// import * as THREE from "three";
// import { useRef, useState, useEffect } from "react";


// // 🔧 Grid helper
// function GridOverlay() {
//   const { scene } = useThree();
//   useEffect(() => {
//     const grid = new THREE.GridHelper(100, 100);
//     scene.add(grid);
//     return () => scene.remove(grid);
//   }, [scene]);
//   return null;
// }

// // 🔧 Axes helper
// function AxesOverlay() {
//   const { scene } = useThree();
//   useEffect(() => {
//     const axes = new THREE.AxesHelper(10);
//     scene.add(axes);
//     return () => scene.remove(axes);
//   }, [scene]);
//   return null;
// }

// // 🔴 Visual marker
// function Marker({ position, color = "red" }) {
//   return (
//     <mesh position={position}>
//       <sphereGeometry args={[0.3, 16, 16]} />
//       <meshStandardMaterial color={color} />
//     </mesh>
//   );
// }

// // 📍 Clickable map plane
// function MapPlane({ onClick }) {
//   const texture = useTexture("/images/hyderabadmap.svg"); // convert to PNG if SVG fails
//   return (
//     <mesh
//       position={[25, -0.01, 10]}
//       rotation={[-Math.PI / 2, 0, 0]}
//       receiveShadow
//       onClick={(e) => {
//         e.stopPropagation();
//         console.log("🟢 Clicked point:", e.point);
//         onClick?.(e.point);
//       }}
//     >
//       <planeGeometry args={[80, 50]} />
//       <meshBasicMaterial map={texture} />
//     </mesh>
//   );
// }

// // ✈️ Plane lands once
// function Plane({ onLanded, planeRef }) {
//   const { scene } = useGLTF("/images/aeroplane.glb");
//   const [t, setT] = useState(0);

//   useFrame((_, delta) => {
//     if (!planeRef.current) return;
//     const newT = Math.min(t + delta * 0.2, 1);
//     const start = new THREE.Vector3(-30, 20, 0);
//     const end = new THREE.Vector3(21.87071, -0.01, 14.76060); // Airport position
//     const pos = new THREE.Vector3().lerpVectors(start, end, newT);

//     planeRef.current.position.copy(pos);
//     planeRef.current.rotation.x = -Math.PI / 10;

//     setT(newT);
//     if (newT >= 1) onLanded();
//   });

//   return <primitive ref={planeRef} object={scene} scale={0.005} />;
// }


// // 🚗 Car follows path
// function Car({ pathPoints, cameraRef, move, carRef }) {
//   const { scene } = useGLTF("/images/car_model.glb");
//   const [progress, setProgress] = useState(0);

//   useFrame((_, delta) => {
//     if (!move || !carRef.current) return;

//     const t = (progress + delta * 0.02) % 1;
//     const index = Math.floor(t * (pathPoints.length - 1));
//     const next = index + 1;
//     const curr = pathPoints[index];
//     const nextPoint = pathPoints[next];

//     const pos = new THREE.Vector3().lerpVectors(
//       curr,
//       nextPoint,
//       (t * (pathPoints.length - 1)) % 1
//     );

//     carRef.current.position.copy(pos);
//     const dir = new THREE.Vector3().subVectors(nextPoint, curr).normalize();
//     carRef.current.rotation.y = Math.atan2(dir.x, dir.z);

//     setProgress(t);
//   });

//   return <primitive ref={carRef} object={scene} scale={0.1} />;
// }


// // 🎥 Camera animation
// function FollowCameraController({ cameraRef, planeRef, carRef, planeLanded }) {
//   useFrame(() => {
//     if (!cameraRef.current) return;

//     const targetObj = planeLanded ? carRef.current : planeRef.current;
//     if (!targetObj) return;

//     const pos = targetObj.position;
//     const desiredPos = new THREE.Vector3(pos.x, pos.y + 5, pos.z + 10);

//     cameraRef.current.position.lerp(desiredPos, 0.1);
//     cameraRef.current.lookAt(pos);
//   });

//   return null;
// }


// // 🧠 Main Scene
// export default function CarAnimation({ zoomed }) {
//   const cameraRef = useRef();
//   const planeRef = useRef();
//   const carRef = useRef();
//   const [planeLanded, setPlaneLanded] = useState(false);
//   const [clickedPoints, setClickedPoints] = useState([]);

//   const path = [
//     new THREE.Vector3(21.87071, -0.01, 14.76060,), // Airport
//     new THREE.Vector3(25.40446891075206, -0.010000000000001067, 14.8013508928331),
//     new THREE.Vector3(25.27299520145588, -0.010000000000001754, 13.8962050755864),
//     new THREE.Vector3(20.74185681707165, -0.010000000000000255, 7.14461118959707),
//     new THREE.Vector3(22.48340529072881, -0.009999999999998638, 7.86400141707121),
//     new THREE.Vector3(25.991426670166206,-0.009999999999999929, 9.681906057183765),
//     new THREE.Vector3(28.14397167093565, -0.010000000000001043, 14.691632244969833),
//     new THREE.Vector3(28.778081048505527, -0.010000000000001194, 15.375606440943246),
//     new THREE.Vector3(28.003950691098442, -0.010000000000001258, 15.66365583125892),
//     new THREE.Vector3(27.209714555328695, -0.010000000000001253, 15.642485814814073),
//     new THREE.Vector3(27.234910277570474, -0.010000000000001558, 17.012173059240894),
//     new THREE.Vector3(25.45163919619982, -0.010000000000002458, 17.07409253623958),
//     new THREE.Vector3(24.89603815063164, -0.010000000000003013,19.571767904621773),
//     new THREE.Vector3(24.814737860439234,-0.010000000000002628,21.83313306656),
//     new THREE.Vector3(29.07077476862063, -0.010000000000003974, 23.901946729432936),
//     new THREE.Vector3(25.864580171960835,-0.010000000000003038, 23.676822286795726),
//     new THREE.Vector3(26.74837888835824, -0.010000000000002764, 26.44571299587229),
//     new THREE.Vector3(25.701101317683314, -0.010000000000003216,28.486722010446297),
//   ];
  


//   const handleMapClick = (point) => {
//     setClickedPoints((prev) => [...prev, point.clone()]);
//   };

//   return (
//     <Canvas camera={{ position: [0, 10, 30], fov: 50 }} onCreated={({ camera }) => (cameraRef.current = camera)}>
//       <ambientLight />
//       <pointLight position={[10, 10, 10]} />

//       <GridOverlay />
//       <AxesOverlay />

//       <MapPlane onClick={handleMapClick} />
//       <Marker position={new THREE.Vector3(5, 0.1, 5)} color="blue" />
//       {clickedPoints.map((p, i) => (
//         <Marker key={i} position={p} color="green" />
//       ))}

//       <Plane onLanded={() => setPlaneLanded(true)} planeRef={planeRef} />
//       <Car pathPoints={path} cameraRef={cameraRef} move={planeLanded} carRef={carRef} />

//       <FollowCameraController
//         cameraRef={cameraRef}
//         planeRef={planeRef}
//         carRef={carRef}
//         planeLanded={planeLanded}
//       />

//       <OrbitControls
//         enableZoom
//         enableRotate
//         enablePan
//         mouseButtons={{
//           LEFT: THREE.MOUSE.PAN,
//           RIGHT: null,
//           MIDDLE: null,
//         }}
//       />
//     </Canvas>
//   );
// }



"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture, Html } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useEffect } from "react";

// 🧱 Grid & Axes
function GridOverlay() {
  const { scene } = useThree();
  useEffect(() => {
    const grid = new THREE.GridHelper(100, 100);
    scene.add(grid);
    return () => scene.remove(grid);
  }, [scene]);
  return null;
}

function AxesOverlay() {
  const { scene } = useThree();
  useEffect(() => {
    const axes = new THREE.AxesHelper(10);
    scene.add(axes);
    return () => scene.remove(axes);
  }, [scene]);
  return null;
}

// 🔴 Visual marker
function Marker({ position, color = "red" }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// 🗺️ Clickable map plane
function MapPlane({ onClick }) {
  const texture = useTexture("/images/hyderabadmap.svg");
  return (
    <mesh
      position={[25, -0.01, 10]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e.point);
      }}
    >
      <planeGeometry args={[80, 50]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

// ✈️ Plane lands
function Plane({ onLanded, planeRef }) {
  const { scene } = useGLTF("/images/aeroplane.glb");
  const [t, setT] = useState(0);

  useFrame((_, delta) => {
    if (!planeRef.current) return;
    const newT = Math.min(t + delta * 0.2, 1);
    const start = new THREE.Vector3(-30, 20, 0);
    const end = new THREE.Vector3(21.87071, -0.01, 14.7606);
    const pos = new THREE.Vector3().lerpVectors(start, end, newT);
    planeRef.current.position.copy(pos);
    planeRef.current.rotation.x = -Math.PI / 10;
    setT(newT);
    if (newT >= 1) onLanded();
  });

  return <primitive ref={planeRef} object={scene} scale={0.005} />;
}

// 🏷️ 3D Text Popup
function NamePopup({ text, position, visible }) {
  if (!visible) return null;
  return (
    <Html position={[position.x, position.y + 2, position.z]} center>
      <div className="popup-label animate-popup bg-white px-2 py-1 rounded shadow text-xs font-semibold">
        {text}
      </div>
    </Html>
  );
}

// 🚗 Car animation
function Car({ pathPoints, cameraRef, move, carRef, onReachPoint }) {
  const { scene } = useGLTF("/images/car_model.glb");
  const [progress, setProgress] = useState(0);

  useFrame((_, delta) => {
    if (!move || !carRef.current) return;

    const t = (progress + delta * 0.02) % 1;
    const index = Math.floor(t * (pathPoints.length - 1));
    const next = index + 1;
    const curr = pathPoints[index];
    const nextPoint = pathPoints[next];

    const pos = new THREE.Vector3().lerpVectors(
      curr,
      nextPoint,
      (t * (pathPoints.length - 1)) % 1
    );

    carRef.current.position.copy(pos);

    const dir = new THREE.Vector3().subVectors(nextPoint, curr).normalize();
    carRef.current.rotation.y = Math.atan2(dir.x, dir.z);

    setProgress(t);
    onReachPoint(index);
  });

  return <primitive ref={carRef} object={scene} scale={0.1} />;
}

// 🎥 Camera follow
function FollowCameraController({ cameraRef, planeRef, carRef, planeLanded }) {
  useFrame(() => {
    if (!cameraRef.current) return;
    const targetObj = planeLanded ? carRef.current : planeRef.current;
    if (!targetObj) return;

    const pos = targetObj.position;
    const desiredPos = new THREE.Vector3(pos.x, pos.y + 5, pos.z + 10);
    cameraRef.current.position.lerp(desiredPos, 0.1);
    cameraRef.current.lookAt(pos);
  });

  return null;
}

// 🧠 Main Scene
export default function CarAnimation() {
  const cameraRef = useRef();
  const planeRef = useRef();
  const carRef = useRef();
  const [planeLanded, setPlaneLanded] = useState(false);
  const [clickedPoints, setClickedPoints] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const path = [
    { pos: new THREE.Vector3(21.87071, -0.01, 14.7606), label: "Airport" },
    { pos: new THREE.Vector3(25.4044, -0.01, 14.8013), label: "Point A" },
    { pos: new THREE.Vector3(25.2730, -0.01, 13.8962), label: "Point B" },
    { pos: new THREE.Vector3(20.7418, -0.01, 7.1446), label: "Point C" },
    { pos: new THREE.Vector3(22.4834, -0.01, 7.8640), label: "Point D" },
    { pos: new THREE.Vector3(25.9914, -0.01, 9.6819), label: "Point E" },
    { pos: new THREE.Vector3(28.1439, -0.01, 14.6916), label: "Point F" },
    { pos: new THREE.Vector3(28.7780, -0.01, 15.3756), label: "Point G" },
    { pos: new THREE.Vector3(28.0039, -0.01, 15.6636), label: "Point H" },
    { pos: new THREE.Vector3(27.2097, -0.01, 15.6424), label: "Point I" },
    { pos: new THREE.Vector3(27.2349, -0.01, 17.0121), label: "Point J" },
    { pos: new THREE.Vector3(25.4516, -0.01, 17.0740), label: "Point K" },
    { pos: new THREE.Vector3(24.8960, -0.01, 19.5717), label: "Point L" },
    { pos: new THREE.Vector3(24.8147, -0.01, 21.8331), label: "Point M" },
    { pos: new THREE.Vector3(29.0707, -0.01, 23.9019), label: "Point N" },
    { pos: new THREE.Vector3(25.8645, -0.01, 23.6768), label: "Point O" },
    { pos: new THREE.Vector3(26.7483, -0.01, 26.4457), label: "Point P" },
    { pos: new THREE.Vector3(25.7011, -0.01, 28.4867), label: "Destination" },
  ];

  const handleMapClick = (point) => {
    setClickedPoints((prev) => [...prev, point.clone()]);
  };

  return (
    <Canvas camera={{ position: [0, 10, 30], fov: 50 }} onCreated={({ camera }) => (cameraRef.current = camera)}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <GridOverlay />
      <AxesOverlay />
      <MapPlane onClick={handleMapClick} />
      {clickedPoints.map((p, i) => (
        <Marker key={i} position={p} color="green" />
      ))}

      <Plane onLanded={() => setPlaneLanded(true)} planeRef={planeRef} />
      <Car
        pathPoints={path.map((p) => p.pos)}
        cameraRef={cameraRef}
        move={planeLanded}
        carRef={carRef}
        onReachPoint={setCurrentIndex}
      />

      {path.map((p, i) => (
        <NamePopup key={i} text={p.label} position={p.pos} visible={i === currentIndex} />
      ))}

      <FollowCameraController
        cameraRef={cameraRef}
        planeRef={planeRef}
        carRef={carRef}
        planeLanded={planeLanded}
      />

      <OrbitControls />
    </Canvas>
  );
}
