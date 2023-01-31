import { Link } from 'react-router-dom';

function ArtistItem(props) {
	return (
		<div className="col-4 mb-4 text-center">
			<Link to={`../artist/${props.artist.result.id}`}>
				<img width="200" height="200" className="border rounded-circle mb-3"/>
				<div className="heading">{props.artist.result.name}</div>
			</Link>
		</div>
		);
}

export default ArtistItem;