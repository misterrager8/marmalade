import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Artist from './components/Artist';
import Album from './components/Album';
import Song from './components/Song';

function App() {
	return (
		<div className="p-4">
			<Navbar/>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="/search/:query" element={<Search/>}/>
					<Route path="/artist/:artistid" element={<Artist/>}/>
					<Route path="/album/:albumid" element={<Album/>}/>
					<Route path="/song/:songid" element={<Song/>}/>
				</Routes>
			</BrowserRouter>
		</div>
		);
}

export default App;