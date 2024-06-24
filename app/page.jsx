'use client'
import Image from "next/image";
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Stage } from '@react-three/drei'
import Model from '@/app/components/Model'
import { Suspense, useRef, useState } from "react";

export default function Home() {
  const inputRef = useRef()
  const [file, changeFile] = useState()
  const [refresher, setRefresher] = useState(0)
  return (
    <>
      <div className="w-full h-screen">
        <Canvas key={refresher} camera={{ position: [0, 0, 5], fov: 75 }}>
          <Environment preset="apartment" />
          <OrbitControls enableZoom={true} />
          <Suspense fallback={null}>
            <Model file={file} />
          </Suspense>
        </Canvas>
      </div >
      <form onSubmit={(e) => {
        e.preventDefault()
        const data = e.target.model.files[0]
        console.log(data)
        changeFile(URL.createObjectURL(data))
        setRefresher(prev => prev + 1)
        // console.log(file)
      }}>
        <input ref={inputRef} type="file" name="model" id="model" />
        <button type="submit">submit</button>
      </form>
    </>
  );
}
