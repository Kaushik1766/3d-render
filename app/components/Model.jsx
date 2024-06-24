'use client'
import React, { useRef, useEffect } from 'react'
import { Center, Environment, Stage, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'



function Model({ file }) {
    const model = file ? file : '/rossbandiger.glb'
    // useGLTF.preload(model)
    const { nodes, materials, animations, scene } = useGLTF(model)
    const group = useRef()
    const { camera } = useThree()

    useEffect(() => {
        if (group.current) {
            const box = new THREE.Box3().setFromObject(group.current)
            const size = box.getSize(new THREE.Vector3())
            const center = box.getCenter(new THREE.Vector3())

            const maxDim = Math.max(size.x, size.y, size.z)
            const fov = camera.fov * (Math.PI / 180)
            let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))
            cameraZ *= 1.5;

            camera.position.set(center.x * 3, center.y * 3, cameraZ)
            camera.lookAt(center)
        }
    }, [scene, camera])
    return (
        // <Stage >
        <group ref={group} >
            <primitive object={scene} />
        </group>
        // </Stage >
    )
}

export default Model