import { Raleway, Quattrocento_Sans } from "next/font/google";

export const quattrocento_sans = Quattrocento_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  style: ["italic", "normal"],
});

export const raleway = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  style: ["italic", "normal"],
});

export const fonts = {
  quattrocento_sans: quattrocento_sans.className,
  raleway: raleway.className,
};
