
import styled from "styled-components";
import { useState, useEffect } from "react";
import './SingleCard.css';

const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center"
}));

const Card = styled.div`
  position: relative;
  flex-basis: 100%;
  max-width: 220px;
`;

const CardTemplate = styled("div")(() => ({
  width: "100%",
  backfaceVisibility: "hidden",
  height: "200px",
  borderRadius: "6px",
  transformStyle: "preserve-3d",
  transition: "transform 1s cubic-bezier(0.8, 0.3, 0.3, 1)"
}));

const CardFront = styled(CardTemplate)(({ flip }) => ({
  backgroundImage: "url('images/cardimage.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  transform: flip ? "rotateY(-180deg)" : "rotateY(0deg)"
}));

const CardBack = styled(CardTemplate)(({ flip }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  background: "linear-gradient(0deg, #00adb5 20%,#596a72 100%)",
  transform: flip ? "rotateY(0deg)" : "rotateY(180deg)"
}));

const CardContent = styled("div")(() => ({
  top: "50%",
  position: "absolute",
  left: 0,
  width: "100%",
  backfaceVisibility: "hidden",
  transform: "translateZ(70px) scale(0.90)"
}));

const BGFade = styled("div")(() => ({
  position: "absolute",
  right: 0,
  bottom: 0,
  left: 0,
  height: "200px",
  background: "linear-gradient(to bottom, rgba(0,0,0,0) 20%,rgba(0,0,0,.8) 90%)"
}));
export default function App() {
  const [flip, setFlip] = useState(false);
  const [memories, setMemories] = useState([]);
  const dbUrl = "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app/memories.json"

  useEffect(() => {  
    fetch(dbUrl).then(response => response.json())
    .then(responseBody => {
      const memoriesFromDb = [];
      for (const key in responseBody) {
          memoriesFromDb.push(responseBody[key]);
        }
      setMemories(memoriesFromDb);
    })
  },[]);

  return (
    <div className="App">
        
        
        
        { memories.map(element =>
        <div className="card-wrapper"> 
        <Container>
            <Card
            onMouseEnter={() => setFlip(true)}
            onMouseLeave={() => setFlip(false)}
            >   
            <div>
                <CardFront flip={flip}>
                    <CardContent>
                        <div>
                            {element.what}
                        </div>
                    </CardContent>
                    <BGFade />
                </CardFront>
            </div>
            <div>
                <CardBack flip={flip}>
                    <CardContent>
                        <div>
                            {element.how}
                        </div>
                    </CardContent>
                </CardBack>
            </div>
            </Card>
        </Container>
        </div>)}
        
    </div>
  );
}