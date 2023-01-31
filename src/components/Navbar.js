import { useState, useEffect } from 'react';

function Navbar() {
	const [theme, setTheme] = useState(localStorage.getItem('marmalade'));

	const changeTheme = (theme_) => {
		localStorage.setItem('marmalade', theme_);
		document.documentElement.setAttribute('data-theme', theme_);
		setTheme(theme_);
	}

	useEffect(() => {
		changeTheme(theme);
	}, []);

	return (
		<nav className="navbar navbar-expand-sm">
			<div className="container-fluid">
				<a href="/" className="navbar-brand"><i className="bi bi-rewind-fill me-1" style={{ color: 'darkorange' }}></i> <span className="fst-italic">marmalade</span></a>
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item btn-group btn-group-sm">
							<a onClick={() => changeTheme(theme==='light'?'dark':'light')} className="btn btn-outline-secondary text-capitalize"><i className={'bi bi-'+(theme==='light'?'moon':'sun')+'-fill'}></i> {theme==='light'?'dark':'light'}</a>
							<a data-bs-target="#user" data-bs-toggle="dropdown" className="btn btn-outline-secondary dropdown-toggle"><i className={'bi bi-person-fill'}></i> Log In / Sign Up</a>
							<div id="user" className="dropdown-menu dropdown-menu-end text-center">
								<a className="dropdown-item small">Log In</a>
								<a className="dropdown-item small">Sign Up</a>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		);
}

export default Navbar;