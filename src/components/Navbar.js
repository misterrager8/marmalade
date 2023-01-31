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
								<a data-bs-target="#login" data-bs-toggle="modal" className="dropdown-item small">Log In</a>
								<a data-bs-target="#signup" data-bs-toggle="modal" className="dropdown-item small">Sign Up</a>
							</div>
						</li>
					</ul>
				</div>
			</div>

			<div className="modal" id="login">
				<div className="modal-dialog">
					<div className="modal-content p-4">
						<form>
							<label className="heading mb-1 small">Username</label>
							<input autoComplete="off" className="form-control form-control-sm mb-2" />

							<label className="heading mb-1 small">Password</label>
							<input type="password" autoComplete="off" className="form-control form-control-sm mb-4" />
							<button type="submit" className="btn btn-sm btn-outline-secondary w-100">Log In</button>
						</form>
					</div>
				</div>
			</div>

			<div className="modal" id="signup">
				<div className="modal-dialog">
					<div className="modal-content p-4">
						<form>
							<label className="heading mb-1 small">Username</label>
							<input autoComplete="off" className="form-control form-control-sm mb-2" />

							<label className="heading mb-1 small">Password</label>
							<input type="password" autoComplete="off" className="form-control form-control-sm mb-4" />
							<button type="submit" className="btn btn-sm btn-outline-secondary w-100">Sign Up</button>
						</form>
					</div>
				</div>
			</div>

		</nav>
		);
}

export default Navbar;