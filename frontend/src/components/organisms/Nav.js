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
          {/* <Button border={false} icon="rewind-fill" text="marmalade" /> */}
          <Link to={"/"} className="btn btn-sm border-0">
            <i className="bi bi-rewind-fill me-2"></i>
            marmalade
          </Link>
          <Link
            to={"/search"}
            className={
              "btn btn-sm" + (location.pathname === "/search" ? " active" : "")
            }>
            <i className="bi bi-quote me-2"></i>
            Lyrics
          </Link>
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
