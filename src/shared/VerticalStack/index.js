import { container } from "../../utils/container.css";
import { flexContainer } from "./app.css";
import { framing } from "../../utils/framing-container.css";

// todo: make this ts to mimic eds
// will get the typehints then from its consumers
export default function VerticalStack({
  children,
  as = "div",
  themeColor = "textBody",
  framingStyle = "none",
}) {
  const Component = as;
  return (
    <Component
      className={[
        flexContainer,
        container[themeColor],
        framing[framingStyle],
      ].join(" ")}
    >
      {children}
    </Component>
  );
}
