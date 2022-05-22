import { useUI } from "components/context";
import { Container, Header, Connect } from "./components";

function App() {
  const { wallet } = useUI();

  return (
    <div className="bg-slate-800 min-h-screen">
      <Container>
        {wallet ? (
          <>{wallet}</>
        ) : (
          <>
            <Header />
            <Connect />
          </>
        )}
      </Container>
    </div>
  );
}

export default App;
