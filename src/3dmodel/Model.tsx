import {
    useGLTF,
    useAnimations,
    Center,
    Plane,
    ContactShadows,
} from "@react-three/drei";
import { useEffect, useRef } from "react";

interface Props {
    src: string;
}

const Model = ({ src }: Props) => {
    const { scene, animations } = useGLTF(src);
    const group = useRef<THREE.Group>(null);
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        actions["Animation"]?.play();
    }, []);

    return (
        <>
            <Center>
                <group ref={group}>
                    <primitive object={scene} scale={1} />
                </group>
            </Center>
            <ContactShadows
                position={[0, -1, 0]}
                scale={10}
                far={3}
                blur={3}
                rotation={[Math.PI / 2, 0, 0]}
            />
            <Plane
                args={[10, 10]}
                position={[0, -1.001, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
            >
                <meshBasicMaterial color="#ff9999" />
            </Plane>
        </>
    );
};

export default Model;
