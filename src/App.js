import { useEffect, useRef, useState } from "react";
import { Background } from "./components/Background";
import { Canvas } from "./scene/Canvas";
import styled from "styled-components";
import { Manager } from "./scene/three/Manager";

const Main = styled.div``;

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
    </Main>
  )
}

export default App;
