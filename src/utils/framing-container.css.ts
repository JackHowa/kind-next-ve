import { styleVariants } from "@vanilla-extract/css";
import { primaryColor, secondaryColor } from "./vars.css";

export const framing = styleVariants({
  topPrimary: { borderTop: `10px solid ${primaryColor}` },
  topSecondary: { borderTop: `10px solid ${secondaryColor}` },
  none: { borderTop: "none" }, // not sure if this is needed
});
