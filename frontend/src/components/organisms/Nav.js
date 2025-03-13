import { useContext } from "react";
import { MultiContext } from "../../contexts";
import Button from "../atoms/Button";
import ButtonGroup from "../molecules/ButtonGroup";

export default function Nav({ className = "" }) {
  const multiCtx = useContext(MultiContext);

  return (
    <div className={className + " between"}>
      <Button border={false} icon="rewind-fill" text="marmalade" />
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
  );
}
