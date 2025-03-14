import { useState } from "react";
import Button from "../atoms/Button";

export default function LineItem({ item, className = "" }) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const copyLine = () => {
    navigator.clipboard.writeText(`"${item}"`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div onClick={() => copyLine()} className={className + " line"}>
      <span className="">
        {copied && <i className="bi bi-check-lg me-3"></i>}
        {item}
      </span>
    </div>
  );
}
