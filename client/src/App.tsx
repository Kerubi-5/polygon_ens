import {
  Container,
  Header,
  Connect,
  useUI,
  ModalForm,
  DomainContainer,
  Switch,
  Form,
} from "./components";

function App() {
  const { wallet } = useUI();

  return (
    <div className="relative bg-slate-800 min-h-screen">
      <Container>
        <Header />

        {wallet ? (
          <>
            <Form />
            <DomainContainer />
            <ModalForm />
          </>
        ) : (
          <Connect />
        )}
      </Container>
      <Switch />
    </div>
  );
}

export default App;
