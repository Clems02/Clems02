import { Category } from "blagues-api/dist/types/types";
import { generateBlague } from "./blague";

const msInOneDay = 24 * 60 * 60 * 1000;

const today = new Date();

export const generateDataToUpdate = async () => {
  const idPromises = Object.entries(IdToUpdate).map(async ([key, value]) => {
    if (key.includes("blague")) {
      const blague = await generateBlague(value as Category);
      return { key, blague };
    } else {
      return { key, value };
    }
  });

  const resultsPromises = await Promise.all(idPromises);

  const jokes = resultsPromises
    .filter((result) => result.blague !== undefined)
    .map((result) => {
      const objet = {
        key: `${result.key}_joke`,
        value: result.blague.joke,
      };

      return objet;
    });

  const answers = resultsPromises
    .filter((result) => result.blague !== undefined)
    .map((result) => {
      const objet = {
        key: `${result.key}_answer`,
        value: result.blague.answer,
      };

      return objet;
    });

  const other = resultsPromises.filter((result) => result.blague === undefined);

  return [...other, ...answers, ...jokes];
};

export const lastUpdateDate = () => {
  const date = today.getDate();
  const month = today.getMonth() + 1;

  const dateFormated = date < 10 ? `0${date}` : date;
  const monthFormated = month < 10 ? `0${month}` : month;

  return `${dateFormated}/${monthFormated}`;
};

export const lastUpdateHours = () => {
  const hours = today.getHours();
  const minutes = today.getMinutes();

  const hoursFormated = hours < 10 ? `0${hours}` : hours;
  const minutesFormated = minutes < 10 ? `0${minutes}` : minutes;

  return `${hoursFormated}:${minutesFormated}`;
};

export const dayCount = () => {
  const actualYear = today.getFullYear();
  const nextYear = actualYear + 1;
  const nextYearDate = new Date(String(nextYear));

  const timeUntilNewYear = nextYearDate.getTime() - today.getTime();
  const dayUntilNewYear = Math.round(timeUntilNewYear / msInOneDay);

  return `Il reste ${dayUntilNewYear} jours de blagues avant la fin de l'année ${actualYear} !`;
};

/**
 * Pour une blague, inclure id joke & id answer
 *
 * IdFormat: <#ID>
 */
export const IdToUpdate = {
  promise_blague_dev_1: "dev",
  promise_blague_dark_2: "dark",
  promise_blague_limit_3: "limit",
  promise_blague_beauf_4: "beauf",
  dayCount: dayCount(),
  lastUpdateDate: lastUpdateDate(),
  lastUpdateHours: lastUpdateHours(),
};
