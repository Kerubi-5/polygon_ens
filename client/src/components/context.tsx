import { abi, CONTRACT_ADDRESS } from "const";
import { ethers } from "ethers";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { isRpcError } from "types";
import { Domain } from "types/domain";
import { networks } from "utils/networks";

// context props
interface IApiProvider {
  children: React.ReactNode;
}

interface IContext {
  wallet: string;
  network: string;
  mints: Domain[];
  isOpen: boolean;
  modalData: Domain | null;
  connectAccount: () => void;
  toggleModal: (payload?: Domain) => void;
}

const initialContext: IContext = {
  wallet: "",
  network: "",
  isOpen: false,
  modalData: {} as Domain,
  mints: [] as Domain[],
  connectAccount: () => {},
  toggleModal: () => {},
};

const ApiContext = createContext<IContext>({
  ...initialContext,
});

export const ApiProvider: FC<IApiProvider> = ({ children }) => {
  const [wallet, setWallet] = useState<string>("");
  const [network, setNetwork] = useState<string>("");
  const [mints, setMints] = useState<Domain[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<Domain>({} as Domain);

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

  const fetchMints = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum as any);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

        // Get all the domain names from our contract
        const names = await contract.getAllNames();
        debugger;
        // For each name, get the record and the address

        const mintRecords = await Promise.all(
          names.map(async (name: any) => {
            debugger;
            const mintRecord = await contract.records(name);
            const owner = await contract.domains(name);

            debugger;
            const domain: Domain = {
              id: names.indexOf(name),
              name: name,
              record: mintRecord,
              owner: owner,
            };

            return domain;
          })
        );

        console.log("MINTS FETCHED ", mintRecords);
        setMints(mintRecords);
        debugger;
      }
    } catch (error) {
      if (isRpcError(error)) alert(error.message);
      else alert("Something went wrong");
    }
  };

  // Toggle modal
  const toggleModal = (payload?: Domain) => {
    setIsOpen(!isOpen);

    if (payload) setModalData(payload);
    debugger;
  };

  // Reload the page when they change networks
  function handleChainChanged(_chainId: string | unknown) {
    window.location.reload();
  }

  useEffect(() => {
    connectAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (network === "Polygon Mumbai Testnet") {
      fetchMints();
    }
  }, [wallet, network]);

  const value = {
    wallet,
    network,
    mints,
    isOpen,
    modalData,
    toggleModal,
    connectAccount,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useUI = () => {
  return useContext(ApiContext);
};
