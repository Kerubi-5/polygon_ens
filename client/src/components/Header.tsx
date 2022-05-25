import { useUI } from "components";

const Header = () => {
  const { wallet } = useUI();
  return (
    <div className="text-zinc-50 text-center p-5">
      <h1 className="font-extrabold text-lg md:text-3xl">
        KK Ethereum Name Service 💕
      </h1>
      <small className="text-sm text-zinc-300">Get your api on the chain</small>

      <div>👛: {wallet ?? "You must sign in to continue"}</div>
    </div>
  );
};

export default Header;
