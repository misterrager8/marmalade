import SongItem from './SongItem';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import $ from 'jquery';

function Album() {
	const [loading, setLoading] = useState(true);
	const [album, setAlbum] = useState([]);
	const [tracks, setTracks] = useState([]);
	const { albumid } = useParams();

	useEffect(() => {
		$.get('/get_album', {
			id: albumid
		}, function(data) {
			setAlbum(data.album.album);
			setTracks(data.tracks);
			setLoading(false);
			setTimeout(function() { document.title = album.name; }, 500);
		})
	}, []);

	return (
		<div>{!loading?<div className="row mt-5">
			<div className="col-6">
				<div className="text-center sticky-top pt-5">
					<img width="300" height="300" src={album.cover_art_url} className="rounded mb-3"/>
					<div className="heading fs-1 fst-italic">{album.name}</div>
					<div className="heading mb-1"><Link to={`/artist/${album.artist.id}`}>{album.artist.name}</Link></div>
					<div className="heading mb-2">{album.release_date_components.year}</div>
					<div className="heading small">{tracks.length} track(s)</div>
				</div>
			</div>
			<div className="col-6">
				<div>{tracks.map((x, id) => (<SongItem song={x} key={id} num={id+1}/>) )}</div>
			</div>
		</div>:<span className="spinner-border spinner-border-sm"></span>}</div>
		);
}

export default Album;