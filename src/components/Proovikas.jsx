import {useRef, useEffect} from 'react';

export default function Proovikas() {
  const ref = useRef();

  console.log(ref.current); // 👈️ undefined here

  useEffect(() => {
    const el2 = ref.current;
    console.log(el2); // 👈️ element here
  }, []);

  return (
    <div>
      <div ref={ref}>
        <h2>Hello</h2>
      </div>
    </div>
  );
}