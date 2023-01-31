import { Link } from 'react-router-dom';

function AlbumItem(props) {
	return (
		<div className="col-4 mb-4 text-center">
			<Link to={`../album/${props.album.id}`}>
				<img width="200" height="200" className="border rounded mb-3"/>
				<div className="heading fst-italic">{props.album.name}</div>
			</Link>
		</div>
		);
}

export default AlbumItem;