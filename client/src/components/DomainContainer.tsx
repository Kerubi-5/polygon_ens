import { DomainCard } from "components";
import { useUI } from "./context";

const DomainContainer = () => {
  const { mints } = useUI();
  return (
    <div className="flex justify-center gap-5 flex-wrap p-5">
      {mints &&
        mints.map((mint) => <DomainCard key={mint.id} payload={mint} />)}
    </div>
  );
};

export default DomainContainer;
