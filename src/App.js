import { useEffect, useRef, useState } from "react";
import { Background } from "./components/Background";
import { Canvas } from "./scene/Canvas";
import styled from "styled-components";
import { Manager } from "./scene/three/Manager";
import { meta } from "./scene/meta";

const Main = styled.div``;

const Link = styled.a`
  position: absolute;
  z-index: 1000000000;
  bottom: 10px;
  right: 10px;
  color: #4AF626;
`;

function App() {
  const [, setManager] = useState(); 
  const ref = useRef();

  useEffect(()=>{
    if (ref.current) {
      setManager(new Manager({
        canvas: ref.current,
      }));
    }
  }, [ref]);

  return(
    <Main>
      <Background>
        <Canvas
          forwardRef={ref}
          height={`${window.innerHeight}px`}
          width={`${window.innerWidth}px`}
        />
      </Background>
      <Link href={meta.src}>View Code</Link>
    </Main>
  )
}

export default App;
