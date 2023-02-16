import { pathExistsSync, readJSONSync, ensureFileSync, writeJSONSync } from "fs-extra/esm";
import { TEMP_ANSWERS_FILE } from "./const.js";
import { promptReuseTempSaveFile, promptSaveFile } from "./prompts.js";
import { Answers } from "./types.js";

export const getTempAnswers = (path: string): Pick<Answers, "saveFile"> | null => {
  if (!pathExistsSync(path)) {
    return null;
  }

  return readJSONSync(path);
};

export const getSaveFile = async () => {
  const tempAnswers = getTempAnswers(TEMP_ANSWERS_FILE);

  if (tempAnswers) {
    const reuse = await promptReuseTempSaveFile(tempAnswers.saveFile);
    if (reuse) {
      return tempAnswers.saveFile;
    }
  }

  const saveFile = await promptSaveFile();
  ensureFileSync(TEMP_ANSWERS_FILE);
  writeJSONSync(TEMP_ANSWERS_FILE, { saveFile });

  return saveFile;
};
