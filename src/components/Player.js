import { Link } from 'react-router-dom';
import { useState } from 'react';

function Player(props) {
	const [paused, setPaused] = useState(true);

	return (
		<div className="text-center" style={{ fontSize:'2em' }}>
			<p>{props.song.title_with_featured}</p>
			<a className="btn text-secondary"><i className="bi bi-rewind-fill" style={{ fontSize:'2em' }}></i></a>
			<a onClick={() => setPaused(!paused)} className="btn text-secondary"><i className={'bi bi-'+(paused?'play':'pause')+'-fill'} style={{ fontSize:'2em' }}></i></a>
			<a className="btn text-secondary"><i className="bi bi-fast-forward-fill" style={{ fontSize:'2em' }}></i></a>
		</div>
		);
}

export default Player;