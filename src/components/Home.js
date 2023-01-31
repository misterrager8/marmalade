import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import $ from 'jquery';
import { Outlet, useNavigate } from 'react-router-dom';

function Home() {
	const [hot, setHot] = useState([]);
	const navigate = useNavigate();

	const search = (e) => {
		e.preventDefault();
		navigate(`/search/${document.getElementById('query').value}`);
	}

	const getHot = () => {
		$.get('/get_hot', function(data) {
			setHot(data.hot);
		})
	}

	useEffect(() => {
		getHot();
	}, []);

	return (
		<div>
			{hot.length > 0 &&
			<div className="mt-4">
				<p className="fs-1 text-center"><i className="bi bi-rewind-fill me-1" style={{ color: 'darkorange' }}></i> <span className="fst-italic">marmalade</span></p>
				<form className="input-group input-group-sm my-3" onSubmit={(e) => search(e)}>
					<input required id="query" autoComplete="off" className="form-control" placeholder="Search Artists" />
					<button type="submit" className="btn btn-outline-secondary"><i className="bi bi-search"></i> Search</button>
				</form>
				<div className="row">
					<div className="col-12 mb-4">
						<div className="p-3 border border-secondary rounded" style={{ height: '200px' }}>
							<a target="_blank" href={hot[0].url}>{hot[0].title}</a>
						</div>
					</div>
					{hot.slice(1, 5).map((x, id) => (
					<div key={id} className="col-3">
						<div className="p-3 border border-secondary rounded" style={{ height: '200px' }}>
							<a target="_blank" href={x.url}>{x.title}</a>
						</div>
					</div>
						) )}
				</div>
				<div className="mt-4">{hot.slice(5, 15).map((x, id) => (
					<div className="heading px-3 py-1 hover" key={id}>
						<a target="_blank" href={x.url}>{x.title}</a>
					</div>
					) )}</div>
			</div>}
		</div>
		);
}

export default Home;