import { FC } from "react";
import { useUI } from "./context";

interface IDomainCard {
  domain: string;
  record: string;
  owner: string;
}

const DomainCard: FC<IDomainCard> = ({ domain, record, owner }) => {
  const { toggleModal } = useUI();
  return (
    <div className="domainRoot hover:scale-105 transition-transform relative shadow-lg hover:shadow-xl">
      <div className="cardBg p-5 rounded-lg max-w-[250px] break-words">
        <h3 className="font-extrabold text-zinc-50 text-xl">{domain}</h3>
        <p className="text-gray-200 text-sm">{record}</p>

        <span className="text-gray-300 text-xs">
          <span>Owned by:</span> {owner}
        </span>
      </div>

      <button
        className="absolute top-2 right-3 cursor-pointer"
        onClick={toggleModal}
      >
        Edit
      </button>
    </div>
  );
};

export default DomainCard;
