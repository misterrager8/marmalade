import { useContext, useState } from "react";
import { MultiContext } from "../../contexts";
import ButtonGroup from "../molecules/ButtonGroup";
import Button from "../atoms/Button";

export default function TagItem({ item, className = "" }) {
  const multiCtx = useContext(MultiContext);
  const [deleting, setDeleting] = useState(false);

  return (
    <div className={className + " item between p-1 m-1"}>
      <a>{item.name}</a>
      <div className="d-flex">
        {item.songCount > 0 && (
          <div className="me-3 my-auto">{item.songCount}</div>
        )}
        <ButtonGroup>
          {deleting && (
            <Button
              border={false}
              icon="question-lg"
              onClick={() => multiCtx.deleteTag(item.id)}
            />
          )}
          <Button
            border={false}
            icon="trash2"
            onClick={() => setDeleting(!deleting)}
          />
        </ButtonGroup>
      </div>
    </div>
  );
}
