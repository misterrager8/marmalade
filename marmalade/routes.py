import datetime
import click
from flask import current_app, render_template, request
from sqlalchemy import func

from marmalade.models import Artist, Song, Album


@current_app.route("/")
def index():
    return render_template(
        "index.html", debug=current_app.config.get("ENV") == "development"
    )


@current_app.post("/add_song")
def add_song():
    success = True
    try:
        song_ = Song(name=request.json.get("name"))
        song_.add()
    except Exception as e:
        click.secho(str(e), fg="blue")
        success = False

    return {"success": success}


@current_app.post("/get_songs")
def get_songs():
    success = True
    songs_ = []
    try:
        songs_ = [i.asdict() for i in Song.all()]
    except Exception as e:
        click.secho(str(e), fg="blue")
        success = False

    return {"success": success, "songs": songs_}


@current_app.post("/edit_song")
def edit_song():
    success = True

    try:
        song_ = Song.query.get(int(request.json.get("id")))

        song_.name = request.json.get("name")
        # song_.artist_id = request.json.get("artist")

        album_ = Album.query.filter(
            func.lower(Album.name) == request.json.get("album")
        ).first()
        song_.album_id = album_.id if album_ else None
        song_.artist_id = album_.artist_id

        song_.genius_id = request.json.get("genius")
        song_.tags = request.json.get("tags")
        song_.lyrics = request.json.get("lyrics")

        song_.edit()
    except Exception as e:
        click.secho(str(e), fg="blue")
        success = False

    return {"success": success}


@current_app.post("/delete_song")
def delete_song():
    success = True

    try:
        song_ = Song.query.get(int(request.json.get("id")))
        song_.delete()
    except Exception as e:
        click.secho(str(e), fg="blue")
        success = False

    return {"success": success}


@current_app.post("/rate_song")
def rate_song():
    success = True

    try:
        song_ = Song.query.get(int(request.json.get("id")))
        song_.rating = int(request.json.get("rating"))
        song_.edit()
    except Exception as e:
        click.secho(str(e), fg="blue")
        success = False

    return {"success": success}


@current_app.post("/add_album")
def add_album():
    success = True
    try:
        album_ = Album(name=request.json.get("name"))

        artist_ = Artist.query.filter(
            func.lower(Artist.name) == request.json.get("artist")
        ).first()
        album_.artist_id = artist_.id if artist_ else None
        album_.release_date = (
            datetime.date(int(request.json.get("releaseYear")), 1, 1)
            if request.json.get("releaseYear")
            else None
        )

        album_.add()
    except Exception as e:
        click.secho(str(e), fg="blue")
        success = False

    return {"success": success}


@current_app.post("/get_albums")
def get_albums():
    success = True
    albums_ = []
    try:
        albums_ = [i.asdict() for i in Album.all()]
    except Exception as e:
        click.secho(str(e), fg="blue")
        success = False

    return {"success": success, "albums": albums_}


@current_app.post("/edit_album")
def edit_album():
    success = True

    try:
        album_ = Album.query.get(int(request.json.get("id")))

        album_.name = request.json.get("name")
        album_.genre = request.json.get("genre")
        album_.release_date = (
            datetime.date(int(request.json.get("releaseYear")), 1, 1)
            if request.json.get("releaseYear")
            else None
        )

        artist_ = Artist.query.filter(
            func.lower(Artist.name) == request.json.get("artist")
        ).first()
        album_.artist_id = artist_.id if artist_ else None

        album_.edit()
    except Exception as e:
        click.secho(str(e), fg="blue")
        success = False

    return {"success": success}


@current_app.post("/delete_album")
def delete_album():
    success = True

    try:
        album_ = Album.query.get(int(request.json.get("id")))
        album_.delete()
    except Exception as e:
        click.secho(str(e), fg="blue")
        success = False

    return {"success": success}


@current_app.post("/add_artist")
def add_artist():
    success = True
    try:
        artist_ = Artist(name=request.json.get("name"))
        artist_.add()
    except Exception as e:
        click.secho(str(e), fg="blue")
        success = False

    return {"success": success}


@current_app.post("/get_artists")
def get_artists():
    success = True
    artists_ = []
    try:
        artists_ = [i.asdict() for i in Artist.all()]
    except Exception as e:
        click.secho(str(e), fg="blue")
        success = False

    return {"success": success, "artists": artists_}


@current_app.post("/edit_artist")
def edit_artist():
    success = True

    try:
        artist_ = Artist.query.get(int(request.json.get("id")))

        artist_.name = request.json.get("name")

        artist_.edit()
    except Exception as e:
        click.secho(str(e), fg="blue")
        success = False

    return {"success": success}


@current_app.post("/delete_artist")
def delete_artist():
    success = True

    try:
        artist_ = Artist.query.get(int(request.json.get("id")))
        artist_.delete()
    except Exception as e:
        click.secho(str(e), fg="blue")
        success = False

    return {"success": success}
