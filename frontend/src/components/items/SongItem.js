import { useContext, useState } from "react";
import { MultiContext } from "../../contexts";
import ButtonGroup from "../molecules/ButtonGroup";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";

export default function SongItem({ item, className = "" }) {
  const multiCtx = useContext(MultiContext);
  const [deleting, setDeleting] = useState(false);

  return (
    <div
      className={
        className +
        " row item" +
        (multiCtx.selectedSong?.id === item.id ? " active" : "")
      }>
      <a
        className="col me-3"
        onClick={() =>
          multiCtx.setSelectedSong(
            multiCtx.selectedSong?.id === item.id ? null : item
          )
        }>
        <span className="small">{item.name}</span>
      </a>
      <div className="col">
        <span className="me-3">{item.artist}</span>
      </div>
      <div className="col-1">
        <Icon name="tag" className="me-2" />
        <span>{item.tags.length}</span>
      </div>
      <div className="col-1 between">
        <div></div>
        <ButtonGroup>
          {deleting && (
            <Button
              border={false}
              icon="question-lg"
              onClick={() => multiCtx.deleteSong(item.id)}
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
