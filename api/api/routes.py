from flask import current_app, request

from api import genius, reddit


@current_app.route("/")
def index():
    return "Marmalade API v0.9.9"


@current_app.route("/search_artists", methods=["POST"])
def search_artists():
    return dict(results=genius.search_artists(request.form.get("query")))


@current_app.route("/get_artist")
def get_artist():
    return genius.get_artist(int(request.args.get("id")))


@current_app.route("/get_album")
def get_album():
    return genius.get_album(int(request.args.get("id")))


@current_app.route("/get_track")
def get_track():
    return genius.get_track(int(request.args.get("id")))


@current_app.route("/get_lyrics")
def get_lyrics():
    return genius.get_lyrics(int(request.args.get("id")))


@current_app.route("/get_hot")
def get_hot():
    return dict(hot=[i.title for i in reddit.get_hot()])
