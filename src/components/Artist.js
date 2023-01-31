import AlbumItem from './AlbumItem';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import $ from 'jquery';

function Artist() {
	const [loading, setLoading] = useState(true);
	const [artist, setArtist] = useState([]);
	const [albums, setAlbums] = useState([]);
	const { artistid } = useParams();

	useEffect(() => {
		$.get('/get_artist', {
			id: artistid
		}, function(data) {
			setArtist(data.artist.artist);
			setAlbums(data.albums);
			setLoading(false);
			setTimeout(function() { document.title = artist.name; }, 500);
		});
	}, []);

	return (
		<div>{!loading?<div className="row mt-5">
			<div className="col-4">
				<div className="text-center sticky-top pt-5">
					<img width="300" height="300" src={artist.image_url} className="rounded-circle mb-3"/>
					<div className="heading">
						<p className="heading fs-1">{artist.name}</p>
					</div>
				</div>
			</div>
			<div className="col-8">
				<div className="row">{albums.map((x, id) => (<AlbumItem album={x} key={id}/>) )}</div>
			</div>
		</div>:<span className="spinner-border spinner-border-sm"></span>}</div>
		);
}

export default Artist;