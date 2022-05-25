import { useUI } from "components/context";
import Form from "components/Form";
import Switch from "components/Switch";
import { Container, Header, Connect } from "./components";

function App() {
  const { wallet } = useUI();

  return (
    <div className="relative bg-slate-800 min-h-screen">
      <Container>
        <Header />

        {wallet ? <Form /> : <Connect />}
      </Container>
      <Switch />
    </div>
  );
}

export default App;
