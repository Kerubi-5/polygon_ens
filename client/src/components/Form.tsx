import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { abi, CONTRACT_ADDRESS } from "const";
import { ethers } from "ethers";
import { ProviderRpcError } from "types";
import { useUI } from "./context";

const Form = () => {
  const { network } = useUI();
  const [domain, setDomain] = useState("");
  const [record, setRecord] = useState("");
  const mintDomain = async () => {
    // Don't run if the domain is empty
    if (!domain) {
      return alert("Please enter a domain");
    }
    // Alert the user if the domain is too short
    if (domain.length < 3) {
      return alert("Domain must be at least 3 characters long");
    }
    // Calculate price based on length of domain (change this to match your contract)
    // 3 chars = 0.5 MATIC, 4 chars = 0.3 MATIC, 5 or more = 0.1 MATIC
    const price =
      domain.length === 3 ? "0.5" : domain.length === 4 ? "0.3" : "0.1";
    console.log("Minting domain", domain, "with price", price);

    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum as any);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

        console.log("Going to pop wallet now to pay gas...");
        let tx = await contract.register(domain, {
          value: ethers.utils.parseEther(price),
        });
        // Wait for the transaction to be mined
        const receipt = await tx.wait();

        // Check if the transaction was successfully completed
        if (receipt.status === 1) {
          console.log(
            "Domain minted! https://mumbai.polygonscan.com/tx/" + tx.hash
          );

          // Set the record for the domain
          tx = await contract.setRecord(domain, record);
          await tx.wait();

          console.log(
            "Record set! https://mumbai.polygonscan.com/tx/" + tx.hash
          );

          setRecord("");
          setDomain("");
        } else {
          alert("Transaction failed! Please try again");
        }
      }
    } catch (error: ProviderRpcError | unknown) {
      if ((error as ProviderRpcError).code) {
        alert((error as ProviderRpcError).message);
      } else {
        alert("Something went wrong. Please try again");
      }
    }
  };

  return (
    <div className="grid justify-center gap-5">
      <div>
        <span className="text-zinc-50">Your eth name</span>
        <Input
          label=".kk"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
      </div>
      <div>
        <span className="text-zinc-50">Description of your eth name</span>
        <Input
          label=""
          value={record}
          onChange={(e) => setRecord(e.target.value)}
        />
      </div>
      <Button
        onClick={mintDomain}
        variant={network !== "Polygon Mumbai Testnet" ? "disabled" : "primary"}
      >
        Submit
      </Button>
    </div>
  );
};

export default Form;
