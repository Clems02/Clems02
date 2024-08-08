import { generateDataToUpdate } from "./data";
import { getReadMeArray, setReadMeFile, updateId } from "./utils";

const main = async () => {
  const rows = getReadMeArray();
  const dataToUpdate = await generateDataToUpdate();

  dataToUpdate.map((data) => updateId(rows, data.key, data.value));

  setReadMeFile(rows.join("\n"));
};

main();
