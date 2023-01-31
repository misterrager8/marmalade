import Player from './Player';
import { Link, useParams } from 'react-router-dom';
import $ from 'jquery';
import { useEffect, useState } from 'react';

function Song() {
	const [loading, setLoading] = useState(false);
	const [track, setTrack] = useState([]);
	const [copied, setCopied] = useState(false);
	const [lyrics, setLyrics] = useState('');
	const { songid } = useParams();

	useEffect(() => {
		setLoading(true);
		$.get('/get_track', {
			id: songid
		}, function(data) {
			setTrack(data.song);
			setLoading(false);
		});
	}, []);

	const getLyrics = () => {
		setLoading(true);
		$.get('/get_lyrics', {
			id: songid
		}, function(data) {
			setLyrics(data);
			setLoading(false);
		});
	}

	const copyLyrics = () => {
		window.navigator.clipboard.writeText(lyrics);
		setCopied(true);
		setTimeout(function() { setCopied(false); }, 1500);
	}

	return (
		<div className="mt-4">
			{loading&&<span className="spinner-border spinner-border-sm"></span>}
			<Player song={track} />
				<div className="btn-group btn-group-sm">
					<a onClick={() => lyrics === '' ? getLyrics() : setLyrics('') } className={'btn btn-outline-secondary' + (lyrics != '' ? ' active' : '') }><i className="bi bi-quote"></i> Lyrics</a>
					{lyrics != '' && <a onClick={() => copyLyrics()} className={'btn btn-outline-'+ (copied?'success':'secondary')}><i className={'bi bi-'+ (copied?'check-lg':'clipboard')}></i> Copy</a>}
				</div>
			<div className="mt-4 fst-italic" style={{ whiteSpace:'pre-wrap' }}>{lyrics}</div>
		</div>
		);
}

export default Song;