import inquirer from "inquirer";
import { PromptType } from "./prompt.types.js";

export class PromptService {
  public async input<T extends PromptType>(message: string, type: PromptType) {
    //   name defines key in the answer where the result is stored
    const { result } = await inquirer.prompt<{ result: T }>([
      {
        type,
        name: "result",
        message,
      },
    ]);
    return result;
  }
}
