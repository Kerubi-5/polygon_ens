import { useEffect } from "react";
import { Container, Header, Connect } from "./components";

function App() {
  const getEthereum = () => {
    const { ethereum } = window;

    if (!ethereum) {
      return alert("Make sure you have MetaMask!");
    }

    return ethereum;
  };

  useEffect(() => {
    getEthereum();
  }, []);

  return (
    <div className="bg-slate-800 min-h-screen">
      <Container>
        <Header />
        <Connect />
      </Container>
    </div>
  );
}

export default App;
