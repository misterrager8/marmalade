const SongContext = React.createContext();
const AlbumContext = React.createContext();
const ArtistContext = React.createContext();

const api = (url, params, callback) =>
  fetch("/" + url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(params),
  })
    .then((response) => response.json())
    .then((data) => (!data.success ? alert("Error") : callback(data)));

function Icon({ className, name }) {
  return <i className={className + " bi bi-" + name}></i>;
}

function Button({ className, type_, onClick, icon, text, size }) {
  return (
    <button
      type={type_}
      className={className + " btn" + (size === "sm" ? " btn-sm" : "")}
      onClick={onClick}>
      {icon && <i className={"bi bi-" + icon + (text ? " me-2" : "")}></i>}
      {text}
    </button>
  );
}

function Input({
  className,
  onChange,
  value,
  placeholder,
  required,
  type_,
  size,
}) {
  return (
    <input
      onChange={onChange}
      value={value}
      className={
        className + " form-control" + (size === "sm" ? " form-control-sm" : "")
      }
      placeholder={placeholder}
      required={required}
      autoComplete="off"
      type={type_}
    />
  );
}

function ButtonGroup({ className, size, children }) {
  return (
    <div
      className={
        className + " btn-group" + (size === "sm" ? " btn-group-sm" : "")
      }>
      {children}
    </div>
  );
}

function InputGroup({ className, size, children }) {
  return (
    <div
      className={
        className + " input-group" + (size === "sm" ? " input-group-sm" : "")
      }>
      {children}
    </div>
  );
}

function Spinner({ className }) {
  return (
    <span className={className + " spinner-border spinner-border-sm"}></span>
  );
}

function Badge({ className, icon, text }) {
  return (
    <span className={className + " badge"}>
      {icon && <i className={"bi bi-" + icon + (text ? " me-1" : "")}></i>}
      {text}
    </span>
  );
}

function Dropdown({
  className,
  classNameBtn,
  classNameMenu,
  target,
  icon,
  children,
  text,
}) {
  return (
    <div className={className + " dropdown"}>
      <a
        data-bs-target={"#" + target}
        data-bs-toggle="dropdown"
        className={classNameBtn + " dropdown-toggle"}>
        {icon && <Icon name={icon} className="me-2" />}
        {text}
      </a>
      <div id={target} className={classNameMenu + " dropdown-menu"}>
        {children}
      </div>
    </div>
  );
}

function SongItem({ className, item }) {
  const songCtx = React.useContext(SongContext);
  const [deleting, setDeleting] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [selected, setSelected] = React.useState(false);

  const [name, setName] = React.useState("");
  const [artist, setArtist] = React.useState("");
  const [album, setAlbum] = React.useState("");
  const [genius, setGenius] = React.useState("");
  const [lyrics, setLyrics] = React.useState("");
  const [tags, setTags] = React.useState("");

  const onChangeName = (e) => setName(e.target.value);
  const onChangeArtist = (e) => setArtist(e.target.value);
  const onChangeAlbum = (e) => setAlbum(e.target.value);
  const onChangeGenius = (e) => setGenius(e.target.value);
  const onChangeLyrics = (e) => setLyrics(e.target.value);
  const onChangeTags = (e) => setTags(e.target.value);

  React.useEffect(() => {
    setName(item.name);
    setArtist(item.artist.name);
    setAlbum(item.album.name);
    setGenius(item.genius_id);
    setLyrics(item.lyrics);
    setTags(item.tags);
  }, []);

  return (
    <>
      <div className={className + " row hover mb-1"}>
        <a
          className="col text-truncate col-3"
          onClick={() => setSelected(!selected)}>
          {item.name}
        </a>
        <div className="col text-truncate">{item.artist.name}</div>
        <div className="col text-truncate fst-italic">{item.album.name}</div>
        <div className="col-3">
          <a onClick={() => songCtx.rateSong(item.id, 0)}>
            <Icon name="record" className="me-2" />
          </a>
          {Array(5)
            .fill(1)
            .map((x, idx) => (
              <a key={idx} onClick={() => songCtx.rateSong(item.id, idx + 1)}>
                <Icon name={idx + 1 <= item.rating ? "star-fill" : "star"} />
              </a>
            ))}
        </div>
        <div className="col">
          <ButtonGroup size="sm" className={"float-end"}>
            {deleting && (
              <Button
                className="border-0"
                onClick={() => songCtx.deleteSong(item.id)}
                icon="question-lg"
              />
            )}
            <Button
              className="border-0"
              onClick={() => setDeleting(!deleting)}
              icon="trash2"
            />
          </ButtonGroup>
        </div>
      </div>
      {selected && (
        <div className="my-3 p-4">
          <form
            onSubmit={(e) => {
              songCtx.editSong(
                e,
                item.id,
                name,
                artist,
                album,
                genius,
                tags,
                lyrics
              );
              setSaved(true);
              setTimeout(() => setSaved(false), 1000);
            }}>
            <InputGroup size="sm" className="mb-2">
              <span className="form-text me-3">Name:</span>
              <Input
                value={name}
                onChange={onChangeName}
                required={true}
                className="border-0"
              />
            </InputGroup>
            <InputGroup size="sm" className="mb-2">
              <span className="form-text me-3">Artist:</span>
              <Input
                value={artist || ""}
                onChange={onChangeArtist}
                className="border-0"
              />
            </InputGroup>
            <InputGroup size="sm" className="mb-2">
              <span className="form-text me-3">Album:</span>
              <Input
                value={album || ""}
                onChange={onChangeAlbum}
                className="border-0"
              />
            </InputGroup>
            <InputGroup size="sm" className="mb-2">
              <span className="form-text me-3">Genius:</span>
              <Input
                value={genius || ""}
                onChange={onChangeGenius}
                className="border-0"
              />
            </InputGroup>
            <span className="form-text me-3">Tags:</span>
            {item.tags.map((x, idx) => (
              <React.Fragment key={x}>
                <Badge text={x} icon="tags-fill" />
                <a className="me-2">
                  <Icon name="x" />
                </a>
              </React.Fragment>
            ))}
            <InputGroup size="sm" className="my-2">
              <Input
                value={tags}
                onChange={onChangeTags}
                className="border-0 border-start"
                placeholder="Tags"
              />
            </InputGroup>
            <InputGroup size="sm">
              <span className="form-text me-3">Lyrics:</span>
              <textarea
                value={lyrics || ""}
                onChange={onChangeLyrics}
                className="form-control border-0"
                placeholder="Lyrics"></textarea>
            </InputGroup>
            <Button
              size="sm"
              type_="submit"
              className="w-100 mt-3"
              icon={saved ? "check-lg" : "floppy2"}
            />
          </form>
        </div>
      )}
    </>
  );
}

function AlbumItem({ className, item }) {
  const albumCtx = React.useContext(AlbumContext);
  const [deleting, setDeleting] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [selected, setSelected] = React.useState(false);

  const [name, setName] = React.useState("");
  const [artist, setArtist] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [releaseYear, setReleaseYear] = React.useState("");

  const onChangeName = (e) => setName(e.target.value);
  const onChangeArtist = (e) => setArtist(e.target.value);
  const onChangeGenre = (e) => setGenre(e.target.value);
  const onChangeReleaseYear = (e) => setReleaseYear(e.target.value);

  React.useEffect(() => {
    setName(item.name);
    setArtist(item.artist.name);
    setGenre(item.genre);
    setReleaseYear(item.release_date);
  }, []);

  return (
    <>
      <div className={className + " row hover mb-1"}>
        <div className="col text-truncate">
          <a className="fst-italic" onClick={() => setSelected(!selected)}>
            {item.name}
          </a>
        </div>
        <div className="col text-truncate">{item?.artist.name}</div>
        <div className="col">{item?.release_date}</div>
        <div className="col">
          <Icon name="star-fill" className="me-2" />
          {item.rating}
        </div>
        <div className="col">
          <ButtonGroup size="sm" className="float-end">
            {deleting && (
              <Button
                className="border-0"
                onClick={() => albumCtx.deleteAlbum(item.id)}
                icon="question-lg"
              />
            )}
            <Button
              className="border-0"
              onClick={() => setDeleting(!deleting)}
              icon="trash2"
            />
          </ButtonGroup>
        </div>
      </div>
      {selected && (
        <div className="my-2 p-3">
          <form
            onSubmit={(e) => {
              albumCtx.editAlbum(e, item.id, name, artist, genre, releaseYear);
              setSaved(true);
              setTimeout(() => setSaved(false), 1000);
            }}>
            <InputGroup size="sm" className="mb-2">
              <span className="form-text me-3">Name:</span>
              <Input
                value={name}
                onChange={onChangeName}
                required={true}
                className="border-0"
              />
            </InputGroup>
            <InputGroup size="sm" className="mb-2">
              <span className="form-text me-3">Artist:</span>
              <Input
                value={artist || ""}
                onChange={onChangeArtist}
                className="border-0"
              />
            </InputGroup>
            <InputGroup size="sm" className="mb-2">
              <span className="form-text me-3">Genre:</span>
              <Input
                value={genre || ""}
                onChange={onChangeGenre}
                className="border-0"
              />
            </InputGroup>
            <InputGroup size="sm" className="mb-2">
              <span className="form-text me-3">Release Year:</span>
              <Input
                value={releaseYear || ""}
                onChange={onChangeReleaseYear}
                className="border-0"
              />
            </InputGroup>
            <Button
              size="sm"
              type_="submit"
              className="w-100 mt-3"
              icon={saved ? "check-lg" : "floppy2"}
            />
          </form>
        </div>
      )}
    </>
  );
}

function ArtistItem({ className, item }) {
  const artistCtx = React.useContext(ArtistContext);
  const [deleting, setDeleting] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [selected, setSelected] = React.useState(false);

  const [name, setName] = React.useState("");

  const onChangeName = (e) => setName(e.target.value);

  React.useEffect(() => {
    setName(item.name);
  }, []);

  return (
    <>
      <div className={className + " row hover mb-1"}>
        <div className="col text-truncate">
          <a className="fst-italic" onClick={() => setSelected(!selected)}>
            {item.name}
          </a>
        </div>
        <div className="col">
          <ButtonGroup size="sm" className="float-end">
            {deleting && (
              <Button
                className="border-0"
                onClick={() => artistCtx.deleteArtist(item.id)}
                icon="question-lg"
              />
            )}
            <Button
              className="border-0"
              onClick={() => setDeleting(!deleting)}
              icon="trash2"
            />
          </ButtonGroup>
        </div>
      </div>
      {selected && (
        <div className="my-2 p-3">
          <form
            onSubmit={(e) => {
              artistCtx.editArtist(e, item.id, name);
              setSaved(true);
              setTimeout(() => setSaved(false), 1000);
            }}>
            <InputGroup size="sm" className="mb-2">
              <span className="form-text me-3">Name:</span>
              <Input
                value={name}
                onChange={onChangeName}
                required={true}
                className="border-0"
              />
            </InputGroup>
            <Button
              size="sm"
              type_="submit"
              className="w-100 mt-3"
              icon={saved ? "check-lg" : "floppy2"}
            />
          </form>
        </div>
      )}
    </>
  );
}

function AddSongForm({ className }) {
  const songCtx = React.useContext(SongContext);
  const [name, setName] = React.useState("");

  const onChangeName = (e) => setName(e.target.value);

  return (
    <form
      onSubmit={(e) => {
        songCtx.addSong(e, name);
        setName("");
      }}>
      <InputGroup size="sm">
        <Button
          type_="button"
          icon="arrow-clockwise"
          className="border-0"
          onClick={() => songCtx.getSongs()}
        />
        <Input
          value={name}
          onChange={onChangeName}
          placeholder="New Song"
          required={true}
        />
      </InputGroup>
    </form>
  );
}

function AddAlbumForm({ className }) {
  const albumCtx = React.useContext(AlbumContext);
  const [name, setName] = React.useState("");
  const [artist, setArtist] = React.useState("");
  const [releaseYear, setReleaseYear] = React.useState("");

  const onChangeName = (e) => setName(e.target.value);
  const onChangeArtist = (e) => setArtist(e.target.value);
  const onChangeReleaseYear = (e) => setReleaseYear(e.target.value);

  return (
    <form
      onSubmit={(e) => {
        albumCtx.addAlbum(e, name, artist, releaseYear);
        setName("");
        setArtist("");
        setReleaseYear("");
      }}>
      <InputGroup size="sm">
        <Button
          type_="button"
          icon="arrow-clockwise"
          className="border-0"
          onClick={() => albumCtx.getAlbums()}
        />
        <Input
          value={name}
          onChange={onChangeName}
          placeholder="New Album"
          required={true}
        />
        <Input value={artist} onChange={onChangeArtist} placeholder="Artist" />
        <Input
          value={releaseYear}
          onChange={onChangeReleaseYear}
          placeholder="Year"
        />
      </InputGroup>
      <button type="submit" className="invisible"></button>
    </form>
  );
}

function AddArtistForm({ className }) {
  const artistCtx = React.useContext(ArtistContext);
  const [name, setName] = React.useState("");

  const onChangeName = (e) => setName(e.target.value);

  return (
    <form
      onSubmit={(e) => {
        artistCtx.addArtist(e, name);
        setName("");
      }}>
      <InputGroup size="sm">
        <Button
          type_="button"
          icon="arrow-clockwise"
          className="border-0"
          onClick={() => artistCtx.getArtists()}
        />
        <Input
          value={name}
          onChange={onChangeName}
          placeholder="New Artist"
          required={true}
        />
      </InputGroup>
    </form>
  );
}

function Songs({ className }) {
  const [songs, setSongs] = React.useState([]);

  const getSongs = () =>
    api("get_songs", {}, (data) =>
      !data.success ? alert("Error") : setSongs(data.songs)
    );

  const addSong = (e, name) => {
    e.preventDefault();
    api("add_song", { name: name }, (data) =>
      !data.success ? alert("Error") : getSongs()
    );
  };

  const deleteSong = (id) => {
    api("delete_song", { id: id }, (data) =>
      !data.success ? alert("Error") : getSongs()
    );
  };

  const rateSong = (id, rating) => {
    api("rate_song", { id: id, rating: rating }, (data) =>
      !data.success ? alert("Error") : getSongs()
    );
  };

  const editSong = (e, id, name, artist, album, genius, tags, lyrics) => {
    e.preventDefault();
    api(
      "edit_song",
      {
        id: id,
        name: name,
        artist: artist,
        album: album,
        genius: genius,
        tags: tags,
        lyrics: lyrics,
      },
      (data) => (!data.success ? alert("Error") : getSongs())
    );
  };

  const contextValue = {
    songs: songs,
    setSongs: setSongs,
    getSongs: getSongs,
    addSong: addSong,
    deleteSong: deleteSong,
    rateSong: rateSong,
    editSong: editSong,
  };

  React.useEffect(() => {
    getSongs();
  }, []);

  return (
    <div className={className}>
      <SongContext.Provider value={contextValue}>
        <AddSongForm />
        <div className="screen">
          {songs.map((x) => (
            <SongItem className="py-1 mx-1" key={x.id} item={x} />
          ))}
        </div>
        <div className="text-center mt-5">
          <Badge text={songs.length.toString() + " songs"} />
        </div>
      </SongContext.Provider>
    </div>
  );
}

function Albums({ className }) {
  const [albums, setAlbums] = React.useState([]);

  const getAlbums = () =>
    api("get_albums", {}, (data) =>
      !data.success ? alert("Error") : setAlbums(data.albums)
    );

  const addAlbum = (e, name, artist, releaseYear) => {
    e.preventDefault();
    api(
      "add_album",
      { name: name, artist: artist, releaseYear: releaseYear },
      (data) => (!data.success ? alert("Error") : getAlbums())
    );
  };

  const deleteAlbum = (id) => {
    api("delete_album", { id: id }, (data) =>
      !data.success ? alert("Error") : getAlbums()
    );
  };

  const editAlbum = (e, id, name, artist, genre, releaseYear) => {
    e.preventDefault();
    api(
      "edit_album",
      {
        id: id,
        name: name,
        artist: artist,
        genre: genre,
        releaseYear: releaseYear,
      },
      (data) => (!data.success ? alert("Error") : getAlbums())
    );
  };

  const contextValue = {
    albums: albums,
    setAlbums: setAlbums,
    getAlbums: getAlbums,
    addAlbum: addAlbum,
    deleteAlbum: deleteAlbum,
    editAlbum: editAlbum,
  };

  React.useEffect(() => {
    getAlbums();
  }, []);

  return (
    <div className={className}>
      <AlbumContext.Provider value={contextValue}>
        <AddAlbumForm />
        <div className="screen">
          {albums.map((x) => (
            <AlbumItem key={x.id} item={x} className="py-1 mx-1" />
          ))}
        </div>
        <div className="text-center mt-5">
          <Badge text={albums.length.toString() + " albums"} />
        </div>
      </AlbumContext.Provider>
    </div>
  );
}

function Artists({ className }) {
  const [artists, setArtists] = React.useState([]);

  const getArtists = () =>
    api("get_artists", {}, (data) =>
      !data.success ? alert("Error") : setArtists(data.artists)
    );

  const addArtist = (e, name) => {
    e.preventDefault();
    api("add_artist", { name: name }, (data) =>
      !data.success ? alert("Error") : getArtists()
    );
  };

  const deleteArtist = (id) => {
    api("delete_artist", { id: id }, (data) =>
      !data.success ? alert("Error") : getArtists()
    );
  };

  const editArtist = (e, id, name) => {
    e.preventDefault();
    api(
      "edit_artist",
      {
        id: id,
        name: name,
      },
      (data) => (!data.success ? alert("Error") : getArtists())
    );
  };

  const contextValue = {
    artists: artists,
    setArtists: setArtists,
    getArtists: getArtists,
    addArtist: addArtist,
    deleteArtist: deleteArtist,
    editArtist: editArtist,
  };

  React.useEffect(() => {
    getArtists();
  }, []);

  return (
    <div className={className}>
      <ArtistContext.Provider value={contextValue}>
        <AddArtistForm />
        <div className="screen">
          {artists.map((x) => (
            <ArtistItem key={x.id} item={x} className="py-1 mx-1" />
          ))}
        </div>
        <div className="text-center mt-5">
          <Badge text={artists.length.toString() + " artists"} />
        </div>
      </ArtistContext.Provider>
    </div>
  );
}

function Nav({ className }) {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "light"
  );

  const themes = ["light", "dark", "ocean"];

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={className + " between"}>
      <ButtonGroup size="sm">
        <Button className="border-0" text="marmalade" icon="rewind-fill" />
      </ButtonGroup>
      <ButtonGroup size="sm">
        <Dropdown
          className="btn-group btn-group-sm"
          text={theme}
          icon="paint-bucket"
          classNameBtn="btn text-capitalize"
          classNameMenu="text-center"
          target="themes">
          {themes.map((x) => (
            <React.Fragment key={x}>
              {x !== theme && (
                <button
                  className="dropdown-item text-capitalize small"
                  onClick={() => setTheme(x)}>
                  {x}
                </button>
              )}
            </React.Fragment>
          ))}
        </Dropdown>
        <Button text="Settings" icon="gear" />
        <Button text="About" icon="info-circle" />
      </ButtonGroup>
    </div>
  );
}

function App() {
  return (
    <div className="p-4">
      <Nav />
      <hr />
      <div className="row">
        <Artists className="col-4" />
        <Albums className="col-4" />
        <Songs className="col-4" />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
