from . import db


class Song2:
    def __init__(self, name, tags=[], artist=None, album=None, year=None, rating=None):
        self.name = name
        self.tags = tags
        self.artist = artist
        self.album = album
        self.year = year
        self.rating = rating


song_tags = db.Table(
    "song_tags",
    db.Column("song_id", db.Integer, db.ForeignKey("songs.id")),
    db.Column("tag_id", db.Integer, db.ForeignKey("tags.id")),
)


class Song(db.Model):
    __tablename__ = "songs"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    artist = db.Column(db.Text)
    tags = db.relationship("Tag", secondary=song_tags, back_populates="songs")
    rating = db.Column(db.Integer, default=0)

    def __init__(self, **kwargs):
        super(Song, self).__init__(**kwargs)

    @classmethod
    def all(cls):
        return sorted([i for i in Song.query.all()], key=lambda x: x.id, reverse=True)

    @classmethod
    def get(cls, id):
        return Song.query.get(id)

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
            "artist": self.artist,
            "tags": [i.name for i in self.tags],
            "rating": self.rating,
        }


class Tag(db.Model):
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    songs = db.relationship("Song", secondary=song_tags, back_populates="tags")

    def __init__(self, **kwargs):
        super(Tag, self).__init__(**kwargs)

    @classmethod
    def all(cls):
        return sorted([i for i in Tag.query.all()], key=lambda x: x.id, reverse=True)

    @classmethod
    def get(cls, id):
        return Tag.query.get(id)

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
            "songCount": len(self.songs),
        }
