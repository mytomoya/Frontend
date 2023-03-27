import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";

interface Props {
    src: string;
}

const Model = ({ src }: Props) => {
    const { scene, animations } = useGLTF(src);
    const group = useRef<any>();
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        actions["Animation"]?.play();
    }, []);

    return (
        <group ref={group} dispose={null}>
            <primitive object={scene} />
        </group>
    );
};

export default Model;
