import fs from "fs";
import { README_to_edit } from "./README_to_edit";

export const foundIndexToChange = (rows: string[], key: string) => {
  return rows.findIndex((r) => Boolean(r.match(new RegExp(`<#${key}>`))));
};

export const getReadMeArray = () => {
  const readmeRow = README_to_edit.split("\n");
  return readmeRow;
};

export const setReadMeFile = (content: string) => {
  fs.writeFile("./README.md", content, (err) => {
    if (err) console.log("Erreur création README: ", err);
    else console.log("Création README réussi.");
  });
};

export const updateId = (rows: string[], key: string, value: any) => {
  const index = foundIndexToChange(rows, key);

  if (!rows[index]) return;

  rows[index] = rows[index].replace(`<#${key}>`, value);
};
