import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/executor/command.executor.js";
import { ICommandExec } from "../../core/executor/command.types.js";
import { IStreamLogger } from "../../core/handlers/stream-logger.interface.js";
import { PromptService } from "../../core/prompt/prompt.service.js";
import { DirBuilder } from "./dir.builder.js";
import { StreamHandler } from "../../core/handlers/stream.handler.js";
import { IDirInput } from "./dir.types.js";

export class DirExecutor extends CommandExecutor<IDirInput> {
  private promptService: PromptService = new PromptService();
  constructor(logger: IStreamLogger) {
    super(logger);
  }
  protected async prompt(): Promise<IDirInput> {
    let path = await this.promptService.input<string>("Путь", "input");
    return { path };
  }
  protected build({ path }: IDirInput): ICommandExec {
    const args = new DirBuilder().output();
    return { command: "ls", args: args.concat(path) };
  }
  protected spawn({
    command,
    args,
  }: ICommandExec): ChildProcessWithoutNullStreams {
    return spawn(command, args, { shell: true });
  }
  protected processStream(
    stream: ChildProcessWithoutNullStreams,
    logger: IStreamLogger
  ): void {
    const handler = new StreamHandler(logger);
    handler.processOutput(stream);
  }
}
