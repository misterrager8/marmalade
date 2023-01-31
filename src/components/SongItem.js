
import { Link } from 'react-router-dom';

function SongItem(props) {
	return (
		<div className="py-1 px-3 hover">
			<Link className="heading fst-italic" to={`/song/${props.song.song.id}`}><span className="fw-bold me-1">{props.num} </span> {props.song.song.title_with_featured}</Link>
		</div>
		);
}

export default SongItem;