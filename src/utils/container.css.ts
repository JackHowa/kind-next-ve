import { styleVariants } from "@vanilla-extract/css";
import {
  blackColor,
  primaryColor,
  secondaryColor,
  shadeBlue700Color,
  shadeGreen700Color,
  whiteColor,
} from "./vars.css";

export const container = styleVariants({
  textBody: { background: whiteColor, color: blackColor },
  invertedTextBody: { background: blackColor, color: whiteColor },
  primary: { background: whiteColor, color: shadeBlue700Color }, // core blue 500 is not high enough contrast for text with white background
  invertedPrimary: { background: primaryColor, color: whiteColor },
  secondary: { background: whiteColor, color: shadeGreen700Color }, // core green 500 is not high enough contrast for text with white background
  invertedSecondary: { background: secondaryColor, color: whiteColor },
});
