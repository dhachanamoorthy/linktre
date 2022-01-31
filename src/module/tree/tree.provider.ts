import { TREE_REPOSITORY } from "src/constant";
import { tree } from "./models";

export const treeProviders = [
  {
    provide: TREE_REPOSITORY,
    useValue: tree,
  },
];