from collections import Counter, OrderedDict
import json
import click
from flask import current_app, request, send_from_directory
import billboard

from marmalade import lyrics
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
