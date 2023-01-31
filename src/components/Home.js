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
			<div className="mt-4">
				<p className="fs-1 text-center"><i className="bi bi-rewind-fill me-1" style={{ color: 'darkorange' }}></i> <span className="fst-italic">marmalade</span></p>
				<form className="input-group input-group-sm my-3" onSubmit={(e) => search(e)}>
					<input required id="query" autoComplete="off" className="form-control" placeholder="Search Artists" />
					<button type="submit" className="btn btn-outline-primary"><i className="bi bi-search"></i> Search</button>
				</form>
				<div className="row">
					<div className="col-12 mb-4">
						<div className="p-3 border border-secondary rounded" style={{ height: '200px' }}>{hot[0]}</div>
					</div>
					<div className="col-4">
						<div className="p-3 border border-secondary rounded" style={{ height: '200px' }}>{hot[1]}</div>
					</div>
					<div className="col-4">
						<div className="p-3 border border-secondary rounded" style={{ height: '200px' }}>{hot[2]}</div>
					</div>
					<div className="col-4">
						<div className="p-3 border border-secondary rounded" style={{ height: '200px' }}>{hot[3]}</div>
					</div>
				</div>
			</div>
		</div>
		);
}

export default Home;