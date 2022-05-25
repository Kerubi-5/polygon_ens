import { FC } from "react";

interface IDomainCard {
  domain: string;
  record: string;
  owner: string;
}

const DomainCard: FC<IDomainCard> = ({ domain, record, owner }) => {
  return (
    <div className="domainRoot">
      <div className="cardBg p-5 rounded-lg max-w-[250px] break-words">
        <h3 className="font-extrabold text-zinc-50 text-xl">{domain}</h3>
        <p className="text-gray-200 text-sm">{record}</p>

        <span className="text-gray-300 text-xs">
          <span>Owned by:</span> {owner}
        </span>
      </div>
    </div>
  );
};

export default DomainCard;
