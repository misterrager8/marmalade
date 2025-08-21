import { data } from "react-router";
import { api } from "../../util";
import { useContext, useEffect, useState } from "react";
import { MultiContext } from "../../contexts";

export default function Charts({ className = "" }) {
  const multiCtx = useContext(MultiContext);
  const [entries, setEntries] = useState([]);

  const getEntries = () => {
    multiCtx.setLoading(true);
    api("hot_100", {}, (data) => {
      setEntries(data.entries);
      multiCtx.setLoading(false);
    });
  };

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <div
      className={className + " row mt-3 overflow-auto"}
      style={{ height: "84vh" }}>
      {entries.map((x) => (
        <div className="row mb-1">
          <div className="col-1 d-flex">
            <div className="h2 m-auto">{x.rank}</div>
          </div>
          <div className="col-1">
            <img className="rounded" src={x.image} height={45} width={45} />
          </div>
          <div className="col-4 d-flex">
            <div className="h4 fst-italic my-auto">{x.title}</div>
          </div>
          <div className="col d-flex">
            <div className="h6 my-auto">{x.artist}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
