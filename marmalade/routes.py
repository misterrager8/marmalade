import json

import billboard
import numpy as np
from flask import current_app, request, send_from_directory
from sklearn.metrics.pairwise import cosine_similarity

from marmalade import lyrics
from marmalade.models import Song, Tag

from .lyrics import genius


@current_app.route("/")
def index():
    return send_from_directory(current_app.static_folder, "index.html")


@current_app.post("/test_route")
def test_route():
    success = True
    msg = ""

    try:
        pass
    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg}


@current_app.post("/search_albums")
def search_albums():
    success = True
    msg = ""
    results = []

    try:
        results = lyrics.search_albums(request.json.get("term"))
    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg, "results": results}


@current_app.post("/get_lyrics")
def get_lyrics():
    success = True
    msg = ""
    lyrics = []
    lyric_data = []

    try:
        album_ = genius.album_tracks(request.json.get("id")).get("tracks")
        for i in album_:
            lyrics_ = genius.lyrics(i.get("song").get("id")).split("\n")
            for j in lyrics_:
                lyrics.append(j)

    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg, "lyrics": lyrics, "lyricData": []}


@current_app.post("/hot_100")
def hot_100():
    success = True
    msg = ""
    entries = []

    try:
        entries = json.loads(billboard.ChartData("hot-100").json()).get("entries")

    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg, "entries": entries}


# CRUD


@current_app.post("/add_song")
def add_song():
    success = True
    msg = ""
    songs = []
    tags = []
    song = None

    try:
        song = Song(
            name=request.json.get("name"),
            artist=request.json.get("artist"),
        )
        song.add()

        songs = [i.asdict() for i in Song.all()]
        tags = [i.asdict() for i in Tag.all()]

        song = song.asdict()
    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg, "songs": songs, "tags": tags, "song": song}


@current_app.post("/get_all")
def get_all():
    success = True
    msg = ""
    songs = []
    tags = []

    try:
        songs = [i.asdict() for i in Song.all()]
        tags = [i.asdict() for i in Tag.all()]

    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg, "songs": songs, "tags": tags}


@current_app.post("/edit_song")
def edit_song():
    success = True
    msg = ""
    songs = []
    tags = []

    try:
        song = Song.get(int(request.json.get("id")))

        song.name = request.json.get("name")
        song.artist = request.json.get("artist")

        song.edit()

        songs = [i.asdict() for i in Song.all()]
        tags = [i.asdict() for i in Tag.all()]

    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg, "songs": songs, "tags": tags}


@current_app.post("/delete_song")
def delete_song():
    success = True
    msg = ""
    songs = []
    tags = []

    try:
        song = Song.get(int(request.json.get("id")))
        song.delete()

        songs = [i.asdict() for i in Song.all()]
        tags = [i.asdict() for i in Tag.all()]

    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg, "songs": songs, "tags": tags}


@current_app.post("/tag_song")
def tag_song():
    success = True
    msg = ""
    songs = []
    tags = []
    song = None

    try:
        song = Song.get(int(request.json.get("songId")))
        tag = Tag.get(int(request.json.get("tagId")))

        if tag not in song.tags:
            song.tags.append(tag)
        else:
            song.tags.remove(tag)

        song.edit()

        songs = [i.asdict() for i in Song.all()]
        tags = [i.asdict() for i in Tag.all()]

        song = song.asdict()

    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg, "songs": songs, "tags": tags, "song": song}


# tags


@current_app.post("/add_tag")
def add_tag():
    success = True
    msg = ""
    songs = []
    tags = []

    try:
        name = request.json.get("name")
        if name not in [i.name for i in Tag.all()]:
            tag = Tag(
                name=name,
            )
            tag.add()

        songs = [i.asdict() for i in Song.all()]
        tags = [i.asdict() for i in Tag.all()]

    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg, "songs": songs, "tags": tags}


@current_app.post("/edit_tag")
def edit_tag():
    success = True
    msg = ""
    songs = []
    tags = []

    try:
        tag = Tag.get(int(request.json.get("id")))

        tag.name = request.json.get("name")

        tag.edit()

        songs = [i.asdict() for i in Song.all()]
        tags = [i.asdict() for i in Tag.all()]

    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg, "songs": songs, "tags": tags}


@current_app.post("/delete_tag")
def delete_tag():
    success = True
    msg = ""
    songs = []
    tags = []

    try:
        tag = Tag.get(int(request.json.get("id")))
        tag.delete()

        songs = [i.asdict() for i in Song.all()]
        tags = [i.asdict() for i in Tag.all()]

    except Exception as e:
        success = False
        msg = str(e)

    return {"success": success, "msg": msg, "songs": songs, "tags": tags}


@current_app.post("/recommend")
def recommend():
    success = True
    msg = ""
    rec_list_2 = []

    try:
        tags = [i.name for i in Tag.all()]
        songs = Song.all()

        tag_index = {tag: idx for idx, tag in enumerate(tags)}

        vectors = []

        for song in songs:
            vector = [0] * len(tags)
            for tag in song.tags:
                vector[tag_index[tag.name]] = 1
            vectors.append(vector)

        similarity_matrix = cosine_similarity(np.array(vectors))

        rec_list = []
        for idx, i in enumerate(similarity_matrix.tolist()):
            song_1 = songs[idx]
            for idxb, j in enumerate(i):
                song_2 = songs[idxb]
                if i[idxb] > 0.6:
                    rec_list.append(
                        {
                            "base_song": song_1.name,
                            "other_song": song_2.name,
                            "similarity": i[idxb],
                        },
                    )

        for i in songs:
            matches = [j for j in rec_list if j.get("base_song") == i.name]
            if len(matches) > 0:
                rec_list_2.append(
                    {
                        "name": i.name,
                        "matches": sorted(
                            matches, key=lambda x: x.get("similarity"), reverse=True
                        ),
                    }
                )

    except Exception as e:
        success = False
        msg = str(e)

    return {
        "success": success,
        "msg": msg,
        "recs": rec_list_2,
    }
