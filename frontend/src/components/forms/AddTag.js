import { useContext, useState } from "react";
import { MultiContext } from "../../contexts";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

export default function AddTag({ className = "" }) {
  const multiCtx = useContext(MultiContext);

  const [name, setName] = useState("");

  const onChangeName = (e) => setName(e.target.value);

  return (
    <div className={className}>
      <form
        className="d-flex"
        onSubmit={(e) => {
          multiCtx.addTag(e, name);
          setName("");
        }}>
        <Input value={name} onChange={onChangeName} placeholder="Name" />
        <Button type_="submit" className="d-none" />
      </form>
    </div>
  );
}
