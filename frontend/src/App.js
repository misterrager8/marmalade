import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";
import Nav from "./components/organisms/Nav";
import MultiProvider from "./contexts";
import Lyrics from "./components/organisms/Lyrics";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Charts from "./components/organisms/Charts";
import Songs from "./components/organisms/Songs";

function App() {
  return (
    <MultiProvider>
      <div className="p-4">
        <div className="mt-3">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Nav />}>
                <Route path="lyrics" element={<Lyrics />} />
                <Route path="charts" element={<Charts />} />
                <Route path="songs" element={<Songs />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </MultiProvider>
  );
}

export default App;
