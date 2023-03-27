import {
    useGLTF,
    useAnimations,
    Center,
    Plane,
    ContactShadows,
} from "@react-three/drei";
import { useEffect, useRef } from "react";
import { DoubleSide } from "three";

interface Props {
    src: string;
    animate: boolean;
}

const Model = ({ src, animate }: Props) => {
    const { scene, animations } = useGLTF(src);
    const group = useRef<THREE.Group>(null);
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        if (actions["Animation"] == null) {
            return;
        }
        actions["Animation"].play();
    }, [actions]);

    if (actions["Animation"] != null) {
        actions["Animation"].paused = !animate;
    }

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
                <meshBasicMaterial color="#ff9999" side={DoubleSide} />
            </Plane>
        </>
    );
};

export default Model;
