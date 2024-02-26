from . import db


class Artist(db.Model):
    __tablename__ = "artists"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    genius_id = db.Column(db.Text)
    tags = db.Column(db.Text)
    songs = db.relationship("Song", backref="artists", lazy="dynamic")
    albums = db.relationship("Album", backref="artists", lazy="dynamic")

    def __init__(self, **kwargs):
        super(Artist, self).__init__(**kwargs)

    @classmethod
    def all(cls):
        return sorted([i for i in Artist.query.all()], key=lambda x: x.id, reverse=True)

    def add(self):
        db.session.add(self)
        db.session.commit()

    def edit(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def asdict(self):
        return {
            "id": self.id,
            "name": self.name,
            "genius_id": self.genius_id,
            "tags": (self.tags or "").split(","),
        }


class Album(db.Model):
    __tablename__ = "albums"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    genre = db.Column(db.Text)
    release_date = db.Column(db.Date)
    artist_id = db.Column(db.Integer, db.ForeignKey("artists.id"))
    genius_id = db.Column(db.Text)
    tags = db.Column(db.Text)
    songs = db.relationship("Song", backref="albums", lazy="dynamic")

    def __init__(self, **kwargs):
        super(Album, self).__init__(**kwargs)

    @classmethod
    def all(cls):
        return sorted([i for i in Album.query.all()], key=lambda x: x.id, reverse=True)

    @property
    def rating(self):
        rated = [i.rating for i in self.songs if i.rating != 0]
        sum_ = sum(rated)

        avg = sum_ / (len(rated) if len(rated) > 0 else 1)
        return round(avg, 1)

    def add(self):
        db.session.add(self)
        db.session.commit()

    def edit(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def asdict(self):
        return {
            "id": self.id,
            "name": self.name,
            "genre": self.genre,
            "release_date": (
                self.release_date.strftime("%Y") if self.release_date else None
            ),
            "artist_id": self.artist_id,
            "artist": self.artists.asdict() if self.artists else {},
            "genius_id": self.genius_id,
            "tags": (self.tags or "").split(","),
            "rating": self.rating,
        }


class Song(db.Model):
    __tablename__ = "songs"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    artist_id = db.Column(db.Integer, db.ForeignKey("artists.id"))
    album_id = db.Column(db.Integer, db.ForeignKey("albums.id"))
    genius_id = db.Column(db.Text)
    lyrics = db.Column(db.Text)
    tags = db.Column(db.Text)
    track_num = db.Column(db.Integer)
    rating = db.Column(db.Integer, default=0)

    def __init__(self, **kwargs):
        super(Song, self).__init__(**kwargs)

    @classmethod
    def all(cls):
        return sorted([i for i in Song.query.all()], key=lambda x: x.id, reverse=True)

    def add(self):
        db.session.add(self)
        db.session.commit()

    def edit(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def asdict(self):
        return {
            "id": self.id,
            "name": self.name,
            "artist": self.artists.asdict() if self.artists else {},
            "album": self.albums.asdict() if self.albums else {},
            "genius_id": self.genius_id,
            "lyrics": self.lyrics,
            "tags": (self.tags or "").split(","),
            "rating": self.rating,
            "trackNum": self.track_num,
        }
