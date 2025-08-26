import { useContext } from "react";
import { MultiContext } from "../../contexts";
import Button from "../atoms/Button";
import ButtonGroup from "../molecules/ButtonGroup";
import Spinner from "../atoms/Spinner";
import { Link, Outlet, useLocation } from "react-router";

export default function Nav({ className = "" }) {
  const multiCtx = useContext(MultiContext);
  const location = useLocation();

  return (
    <>
      <div className={className + " between mb-4"}>
        <div className="d-flex">
          {multiCtx.loading && (
            <button className="btn btn-sm non-btn">
              <Spinner />
            </button>
          )}
          <Link to={"/"} className="btn btn-sm border-0 me-2">
            <i className="bi bi-rewind-fill me-2"></i>
            marmalade
          </Link>
          <div className="btn-group">
            <Link
              to={"/lyrics"}
              className={
                "btn btn-sm" +
                (location.pathname === "/lyrics" ? " active" : "")
              }>
              <i className="bi bi-quote me-2"></i>
              Lyrics
            </Link>
            <Link
              to={"/charts"}
              className={
                "btn btn-sm" +
                (location.pathname === "/charts" ? " active" : "")
              }>
              <i className="bi bi-bar-chart-fill me-2"></i>
              Charts
            </Link>
            <Link
              to={"/songs"}
              className={
                "btn btn-sm" + (location.pathname === "/songs" ? " active" : "")
              }>
              <i className="bi bi-music-note me-2"></i>
              Songs
            </Link>
          </div>
        </div>
        <ButtonGroup>
          <Button
            text="About"
            link
            href="https://github.com/misterrager8/marmalade/"
            icon="info-circle"
          />
          <Button
            className="text-capitalize"
            onClick={() =>
              multiCtx.setTheme(multiCtx.theme === "light" ? "dark" : "light")
            }
            icon={multiCtx.theme === "light" ? "sun-fill" : "moon-fill"}
          />
        </ButtonGroup>
      </div>
      <Outlet />
    </>
  );
}
