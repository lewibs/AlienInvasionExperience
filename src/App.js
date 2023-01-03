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

const Loading = styled.div`
  position:absolute;
  left:0;
  right:0;
  margin-left:auto;
  margin-right:auto;
  color: #4AF626;
`;

function App() {
  const [, setManager] = useState();
  const [loadInfo, setLoadInfo] = useState();
  const ref = useRef();

  useEffect(()=>{
    if (ref.current) {        
      const manager = new Manager({
        canvas: ref.current,
      });

      manager.loader.onProgress = (url, itemsLoaded, itemsTotal)=>{
        url = url.split("/");
        url = url[url.length-1];
        setLoadInfo(`Loading item ${url}...`);

        if (itemsLoaded === itemsTotal) {
          setLoadInfo(undefined);
        }
      }

      setManager(manager);
    }
  }, [ref]);

  return(
    <Main>
      <Background>
        <Loading>{loadInfo}</Loading>
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
