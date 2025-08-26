import { createContext, useEffect, useState } from "react";
import { api } from "./util";

export const MultiContext = createContext();

export default function MultiProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("marmalade-theme") || "dark"
  );
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [tags, setTags] = useState([]);
  const [recs, setRecs] = useState([]);

  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    localStorage.setItem("marmalade-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const getAll = () => {
    setLoading(true);
    api("get_all", {}, (data) => {
      setSongs(data.songs);
      setTags(data.tags);
      setLoading(false);
    });
  };

  const addSong = (e, name, artist) => {
    e.preventDefault();
    api("add_song", { name: name, artist: artist }, (data) => {
      setSongs(data.songs);
      setTags(data.tags);
      setSelectedSong(data.song);
    });
  };

  const deleteSong = (id) => {
    api("delete_song", { id: id }, (data) => {
      setSongs(data.songs);
      setTags(data.tags);
    });
  };

  const tagSong = (songId, tagId) => {
    setLoading(true);
    api("tag_song", { songId: songId, tagId: tagId }, (data) => {
      setSongs(data.songs);
      setTags(data.tags);
      setSelectedSong(data.song);
      // recommend();
      setLoading(false);
    });
  };

  const addTag = (e, name) => {
    e.preventDefault();
    api("add_tag", { name: name }, (data) => {
      setSongs(data.songs);
      setTags(data.tags);
    });
  };

  const deleteTag = (id) => {
    api("delete_tag", { id: id }, (data) => {
      setSongs(data.songs);
      setTags(data.tags);
    });
  };

  const recommend = () => {
    setLoading(true);
    api("recommend", {}, (data) => {
      setRecs(data.recs);
      setLoading(false);
    });
  };

  const contextValue = {
    theme: theme,
    setTheme: setTheme,
    loading: loading,
    setLoading: setLoading,

    songs: songs,
    setSongs: setSongs,
    getAll: getAll,
    addSong: addSong,
    deleteSong: deleteSong,
    tagSong: tagSong,

    tags: tags,
    setTags: setTags,
    addTag: addTag,
    deleteTag: deleteTag,

    selectedSong: selectedSong,
    setSelectedSong: setSelectedSong,

    recommend: recommend,
    recs: recs,
    setRecs: setRecs,
  };

  return (
    <MultiContext.Provider value={contextValue}>
      {children}
    </MultiContext.Provider>
  );
}
