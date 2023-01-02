import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Viewer } from "./three/Viewer";

const CanvasContainer = styled.div`
    background: green;
    height: ${props=>props.height};
    widht: ${props=>props.width};
`;

export function Canvas({
    height,
    width,
    forwardRef
}) {
    return (
        <CanvasContainer
            height={height}
            width={width}
        >
            <canvas
                ref={forwardRef}
                height={height}
                width={width}
            ></canvas>
        </CanvasContainer>
    );
}