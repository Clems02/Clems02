import BlaguesAPI from "blagues-api";
import { Category } from "blagues-api/dist/types/types";
import * as dotenv from "dotenv";
dotenv.config();

export const generateBlague = async (cat: Category) => {
  const token = process.env.TOKEN_API;
  const blagues = new BlaguesAPI(token);

  const blague = await blagues.randomCategorized(cat);

  return blague;
};
