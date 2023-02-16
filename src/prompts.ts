import inquirer from "inquirer";
import { pathExistsSync, ensureFileSync, readJSONSync, writeJSONSync } from "fs-extra/esm";
import { Answers } from "./types.js";

export const promptAction = async () => {
  const { action } = await inquirer.prompt<Pick<Answers, "action">>([
    {
      type: "list",
      name: "action",
      message: "What do you wish to do?",
      choices: [
        {
          name: "Inspect my save",
          value: "inspect",
        },
        {
          name: "Update my save",
          value: "update",
        },
      ],
    },
  ]);

  return action;
};

export const promptSaveFile = async () => {
  const { saveFile } = await inquirer.prompt<Pick<Answers, "saveFile">>([
    {
      type: "input",
      name: "saveFile",
      message: "Enter the path to your save file",
      // TODO: confirm hint has the right path to save file
      // TODO: Maybe use process.APPDATA to get the right path to appdata?
      // suffix: " (e.g. C:/Users/XXX/AppData/Local/Hogwarts Legacy/Hogwarts Legacy/profiles/saves/HL-00-00.sav)",
      validate: (input) => {
        if (input.length === 0) {
          return "Please enter the save file path";
        }

        if (!pathExistsSync(input)) {
          return "The save file you entered does not exist";
        }

        const regex = /^HL-[0-9]{2}-[0-9]{2}.sav$/;
        const filename = input.split("/").pop();
        if (!regex.test(filename)) {
          return "The save file you entered is not valid";
        }

        return true;
      },
    },
  ]);

  return saveFile;
};

export const promptReuseTempSaveFile = async (saveFile: string) => {
  const { reuse } = await inquirer.prompt<Pick<Answers, "reuse">>([
    {
      type: "confirm",
      name: "reuse",
      message: " Do you wish to reuse the save file you used last?",
      suffix: saveFile,
      default: true,
    },
  ]);

  return reuse;
};
