import {
    useGLTF,
    useAnimations,
    Center,
    Plane,
    ContactShadows,
} from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { DoubleSide, KeyframeTrack } from "three";
import { getXYZ, getValues } from "../Helper";

interface Props {
    animate: boolean;
    zValues?: number[];
}

const humanModelSrc = "./model.gltf";
const barbellModelSrc = "./barbell.gltf";
const actionName = "Animation";
const barbellActionName = "BarbellAnimation";

const Model = ({ animate, zValues }: Props): JSX.Element => {
    // Human
    const { scene, animations } = useGLTF(humanModelSrc);
    const humanRef = useRef<THREE.Group>(null);
    const { actions } = useAnimations(animations, humanRef);

    // Barbell
    const { scene: barbellScene, animations: barbellAnimations } =
        useGLTF(barbellModelSrc);
    const barbellRef = useRef<THREE.Group>(null);
    const { actions: barbellActions } = useAnimations(
        barbellAnimations,
        barbellRef
    );
    const [defaultPositionTrack, setDefaultPositionTrack] =
        useState<KeyframeTrack | null>(null);

    // const animationSpeed = 1;

    const interpolateValues = (z: number[] | undefined, defaultZ: number[]) => {
        if (z == null || z.length == 0) {
            return defaultZ;
        }

        const length = defaultZ.length;
        let values: number[] = [];

        // Normalize to have last value as defaultZMax
        const defaultZMax = Math.max(...defaultZ);
        const scale = defaultZMax / z[z.length - 1];
        for (let i = 0; i < z.length; i++) {
            let value = z[i] * scale;
            values.push(value);
        }

        // Offset values
        const offset = defaultZ[0] - values[0];
        for (let i = 0; i < z.length; i++) {
            values[i] += offset;
        }

        if (z.length === length) {
            return values;
        }

        const step = (z.length - 1) / (length - 1);
        const interpolatedValues: number[] = [values[0]];

        // Interpolation
        for (let i = 0; i < length - 1; i++) {
            const x = i * step;
            const j = Math.floor(x);
            const t = x - j;

            interpolatedValues.push((1 - t) * values[j] + t * values[j + 1]);
        }

        interpolatedValues.push(values[z.length - 1]);

        return interpolatedValues;
    };

    useEffect(() => {
        if (
            actions[actionName] == null ||
            barbellActions[barbellActionName] == null
        ) {
            return;
        }

        actions[actionName].play();
        barbellActions[barbellActionName].getClip().duration =
            actions[actionName].getClip().duration;
        barbellActions[barbellActionName].play();

        // Get position track
        const clip = barbellActions[barbellActionName].getClip();
        let track = clip.tracks[0];

        console.log(track);
        console.log(KeyframeTrack.toJSON(track));

        // Set default positions
        if (defaultPositionTrack == null) {
            setDefaultPositionTrack(track.clone());
        }

        const [defaultX, defaultY, defaultZ] =
            defaultPositionTrack != null
                ? getXYZ(Array.from(defaultPositionTrack.values))
                : getXYZ(Array.from(track.values));
        let z = interpolateValues(zValues, defaultZ);

        // Update positions
        const values = getValues(defaultX, defaultY, z);
        for (let i = 0; i < track.values.length; i++) {
            track.values[i] = values[i];
        }

        // track.times[0] = 1;
        // track.values[0] = 1;
        // track.values[100] = -5;
        // console.log(track);

        // actions["Animation"].setDuration(clip.duration / animationSpeed);
    }, [actions, barbellActions, defaultPositionTrack, zValues]);

    useFrame((state, delta) => {
        if (
            actions[actionName] != null &&
            barbellActions[barbellActionName] != null
        ) {
            actions[actionName].paused = !animate;
            barbellActions[barbellActionName].paused = !animate;
        }
    });

    return (
        <>
            <Center>
                <primitive object={scene} scale={1} ref={humanRef} />
                <primitive
                    object={barbellScene}
                    scale={1.0001}
                    ref={barbellRef}
                />
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
