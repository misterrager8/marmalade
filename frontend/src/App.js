import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";
import Nav from "./components/organisms/Nav";
import MultiProvider from "./contexts";
import { useEffect } from "react";
import { api } from "./util";

function App() {
  useEffect(() => {
    api("test_route", {}, (data) => {});
  }, []);

  return (
    <MultiProvider>
      <div className="p-4">
        <Nav />
      </div>
    </MultiProvider>
  );
}

export default App;
