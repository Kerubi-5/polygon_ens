import { createContext, FC, useContext, useEffect, useState } from "react";
import { networks } from "utils/networks";

// context props
interface IApiProvider {
  children: React.ReactNode;
}

interface IContext {
  wallet: string;
  network: string;
  connectAccount: () => void;
}

const initialContext: IContext = {
  wallet: "",
  network: "",
  connectAccount: () => {},
};

const ApiContext = createContext<Partial<IContext>>({
  ...initialContext,
});

export const ApiProvider: FC<IApiProvider> = ({ children }) => {
  const [wallet, setWallet] = useState<string>();
  const [network, setNetwork] = useState<string>();

  const connectAccount = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        throw new Error("Ethereum not found");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts && Array.isArray(accounts)) {
        if (accounts.length !== 0) {
          const account = accounts[0];
          setWallet(account);
        }
      } else {
        throw new Error("Accounts not found");
      }

      const chainId = await ethereum.request({ method: "eth_chainId" });

      if (chainId && typeof chainId === "string") {
        setNetwork(networks[chainId]);
      }

      ethereum.on("chainChanged", handleChainChanged);
    } catch (_e: any) {
      const msg = _e.message ?? "Something went wrong";
      alert(msg);
    }
  };

  // Reload the page when they change networks
  function handleChainChanged(_chainId: string | unknown) {
    window.location.reload();
  }

  useEffect(() => {
    connectAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    wallet,
    network,
    connectAccount,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useUI = () => {
  return useContext(ApiContext);
};
