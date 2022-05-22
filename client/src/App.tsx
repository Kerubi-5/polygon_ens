import { useUI } from "components/context";
import Form from "components/Form";
import { Container, Header, Connect } from "./components";

function App() {
  const { wallet } = useUI();

  return (
    <div className="bg-slate-800 min-h-screen">
      <Container>
        <Header />

        {wallet ? <Form /> : <Connect />}
      </Container>
    </div>
  );
}

export default App;
