from lyricsgenius import Genius

genius = Genius()


def search_artists(query):
    return genius.search_artists(query)["sections"][0]["hits"]


def get_artist(id_: int):
    return dict(artist=genius.artist(id_), albums=genius.artist_albums(id_)["albums"])


def get_album(id_: int):
    return dict(album=genius.album(id_), tracks=genius.album_tracks(id_)["tracks"])


def get_track(id_: int):
    return genius.song(id_)


def get_lyrics(id_: int):
    return genius.lyrics(id_)
