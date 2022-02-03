import { LINK_REPOSITORY } from "src/constant";
import { links } from "./models";

export const linkProvider = [
  {
    provide: LINK_REPOSITORY,
    useValue: links,
  },
];
