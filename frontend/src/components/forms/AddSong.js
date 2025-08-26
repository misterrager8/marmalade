import { useContext, useState } from "react";
import { MultiContext } from "../../contexts";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

export default function AddSong({ className = "" }) {
  const multiCtx = useContext(MultiContext);

  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");

  const onChangeName = (e) => setName(e.target.value);
  const onChangeArtist = (e) => setArtist(e.target.value);

  return (
    <div className={className}>
      <form
        className="d-flex"
        onSubmit={(e) => {
          multiCtx.addSong(e, name, artist);
          setName("");
          setArtist("");
        }}>
        <Input
          className="me-3"
          value={name}
          onChange={onChangeName}
          placeholder="Name"
        />
        <Input value={artist} onChange={onChangeArtist} placeholder="Artist" />
        <Button type_="submit" className="d-none" />
      </form>
    </div>
  );
}
