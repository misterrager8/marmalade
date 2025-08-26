import { useContext, useEffect } from "react";
import { MultiContext } from "../../contexts";
import AddSong from "../forms/AddSong";
import AddTag from "../forms/AddTag";
import SongItem from "../items/SongItem";
import TagItem from "../items/TagItem";
import Button from "../atoms/Button";

export default function Songs({ className = "" }) {
  const multiCtx = useContext(MultiContext);

  useEffect(() => {
    multiCtx.getAll();
  }, []);

  useEffect(() => {
    multiCtx.recommend();
  }, []);

  return (
    <div className={className}>
      <div className="row">
        <div className="col-10">
          <div className="row">
            <div className="col-8">
              <AddSong className="mb-4" />
              <div
                // className="border-bottom"
                style={{ height: "70vh", overflowY: "auto" }}>
                {multiCtx.songs
                  .sort((a, b) => b.tags.length - a.tags.length)
                  .map((x) => (
                    <SongItem className="m-1 p-1" item={x} key={x.id} />
                  ))}
              </div>
            </div>
            <div className="col-4">
              {multiCtx.selectedSong && (
                <div>
                  <div className="mb-4">
                    <div
                      className="p-3 border-bottom"
                      style={{ height: "40vh", overflowY: "auto" }}>
                      {multiCtx.tags.map((x) => (
                        <Button
                          className="m-1"
                          key={x.id}
                          onClick={() =>
                            multiCtx.tagSong(multiCtx.selectedSong?.id, x.id)
                          }
                          text={x.name}
                          icon="tag"
                          active={multiCtx.selectedSong.tags.includes(x.name)}
                        />
                      ))}
                    </div>
                    <div
                      className="p-3"
                      style={{ height: "40vh", overflowY: "auto" }}>
                      {multiCtx.recs
                        .filter((z) => z.name === multiCtx.selectedSong?.name)
                        .map((x) => (
                          <>
                            {x.matches
                              .filter((a) => a.other_song !== x.name)
                              .map((y) => (
                                <div className="between small item">
                                  <div>{y.other_song}</div>
                                  <div>{Math.round(y.similarity * 100)}%</div>
                                </div>
                              ))}
                          </>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-2">
          <AddTag className="mb-4" />
          <div style={{ height: "70vh", overflowY: "auto" }}>
            {multiCtx.tags.map((x) => (
              <TagItem item={x} key={x.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
