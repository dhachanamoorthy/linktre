import { TREE_REPOSITORY } from "src/constant";
import { trees } from "./models";

export const treeProviders = [
  {
    provide: TREE_REPOSITORY,
    useValue: trees,
  },
];