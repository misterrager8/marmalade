import $ from 'jquery';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArtistItem from './ArtistItem';

function Search() {
	const [loading, setLoading] = useState(true);
	const [results, setResults] = useState([]);
	const { query } = useParams();

	useEffect(() => {
		$.post('/search_artists', {
			query: query
		}, function(data) {
			setResults(data.results);
			setLoading(false);
		});
	}, []);

	return (
		<div>{!loading?<div className="row mt-4">{results.map((x, id) => (<ArtistItem artist={x} key={id}/>) )}</div>:<span className="spinner-border spinner-border-sm"></span>}</div>
		);
}

export default Search;