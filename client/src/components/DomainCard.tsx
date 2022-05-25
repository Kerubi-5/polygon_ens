import { FC } from "react";
import { Domain } from "types/domain";
import { useUI } from "./context";

interface IDomainCard {
  payload: Domain;
}

const DomainCard: FC<IDomainCard> = ({ payload }) => {
  const { toggleModal } = useUI();
  return (
    <div className="domainRoot hover:scale-105 transition-transform relative shadow-lg hover:shadow-xl">
      <div className="cardBg p-5 rounded-lg max-w-[250px] break-words">
        <h3 className="font-extrabold text-zinc-50 text-xl">{payload.name}</h3>
        <p className="text-gray-200 text-sm">{payload.record}</p>

        <span className="text-gray-300 text-xs">
          <span>Owned by:</span> {payload.owner}
        </span>
      </div>

      <button
        className="absolute top-2 right-3 cursor-pointer text-zinc-50"
        onClick={() => toggleModal(payload)}
      >
        edit.
      </button>
    </div>
  );
};

export default DomainCard;
