import { MetaMaskInpageProvider } from "@metamask/providers";
import { ApiProvider } from "components/context";
import { useEffect, useState } from "react";
import { Container, Header, Connect } from "./components";

function App() {
  const [windowEth, setWindowEth] = useState<MetaMaskInpageProvider>();
  const getEthereum = () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        throw new Error("No ethereum");
      }

      return ethereum;
    } catch {
      alert("Please install MetaMask");
    }
  };

  useEffect(() => {
    setWindowEth(getEthereum());
  }, []);

  return (
    <ApiProvider ethereum={windowEth}>
      <div className="bg-slate-800 min-h-screen">
        <Container>
          <Header />
          <Connect />
        </Container>
      </div>
    </ApiProvider>
  );
}

export default App;
