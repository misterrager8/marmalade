import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";
import Nav from "./components/organisms/Nav";
import MultiProvider from "./contexts";
import { useEffect } from "react";
import { api } from "./util";
import Search from "./components/organisms/Search";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  useEffect(() => {
    api("test_route", {}, (data) => {});
  }, []);

  return (
    <MultiProvider>
      <div className="p-4">
        {/* <Nav /> */}
        <div className="mt-3">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Nav />}>
                <Route path="search" element={<Search />} />
              </Route>
            </Routes>
          </BrowserRouter>
          {/* <Search /> */}
        </div>
      </div>
    </MultiProvider>
  );
}

export default App;
