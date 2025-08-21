import { useContext, useState } from "react";
import Input from "../atoms/Input";
import { api } from "../../util";
import { MultiContext } from "../../contexts";
import Button from "../atoms/Button";
import LineItem from "./LineItem";

export default function Lyrics({ className = "" }) {
  const multiCtx = useContext(MultiContext);

  const [term, setTerm] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [results, setResults] = useState([]);
  const [lyrics, setLyrics] = useState([]);
  const [lyricData, setLyricData] = useState([]);
  const [mode, setMode] = useState("text");

  const [copied, setCopied] = useState(false);

  const onChangeTerm = (e) => setTerm(e.target.value);

  const reset = () => {
    setTerm("");
    setSelectedAlbum(null);
    setResults([]);
    setLyrics("");
    setLyricData([]);
  };

  const search = (e) => {
    e.preventDefault();
    multiCtx.setLoading(true);
    api("search_albums", { term: term }, (data) => {
      setResults(data.results);
      multiCtx.setLoading(false);
    });
  };

  const getLyrics = (id) => {
    multiCtx.setLoading(true);
    api("get_lyrics", { id: id }, (data) => {
      setLyrics(data.lyrics);
      setLyricData(data.lyricData);
      multiCtx.setLoading(false);
    });
  };

  const copyLyrics = () => {
    let allLyrics = lyrics.join("\n");
    navigator.clipboard.writeText(allLyrics);

    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className={className}>
      <div className="d-flex">
        <div className="w-50 -end px-3">
          <form className="input-group" onSubmit={(e) => search(e)}>
            {results.length > 0 && (
              <Button text="Exit" icon="arrow-left" onClick={() => reset()} />
            )}
            <Input
              placeholder="Search Album"
              value={term}
              onChange={onChangeTerm}
            />
          </form>
          <div className="row mt-4 overflow-auto">
            {results.map((x) => (
              <div
                onClick={() => {
                  setSelectedAlbum(x);
                  getLyrics(x.id);
                }}
                className={
                  "album col-6 d-flex mb-4" +
                  (selectedAlbum?.id === x.id ? " selected" : "")
                }>
                <img
                  className="rounded m-auto"
                  src={x.cover_art_url}
                  width={300}
                  height={300}
                />
                <div className="overlay h-50 w-100">
                  <div className="h2 text-truncate fst-italic">{x.name}</div>
                  <div className="h4">{x.artist.name}</div>
                  <div className="h6">{x.release_date_for_display}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedAlbum && (
          <div className="w-50 px-3 ">
            <div className="d-flex">
              <Button
                text="Copy"
                icon={copied ? "check-lg" : "clipboard"}
                onClick={() => copyLyrics()}
              />
              <span className="btn btn-sm non-btn">{selectedAlbum.name}</span>
              {lyrics !== "" && lyricData.length > 0 && (
                <Button
                  text={mode === "text" ? "See Stats" : "See Full Lyrics"}
                  onClick={() => setMode(mode === "text" ? "stats" : "text")}
                />
              )}
            </div>
            <div className="mt-4 overflow-auto" style={{ height: "75vh" }}>
              <div className="">
                {lyrics.map((x) => (
                  <LineItem item={x} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
