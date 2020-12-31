import { mergeTypeDefs } from "@graphql-tools/merge";
import todoType from "./todoType";
import userType from "./userType";

const types = [todoType, userType];

export default mergeTypeDefs(types);
