import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import MockTasks from "../MockData";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: MockTasks.tasks,
  };
};

export default httpTrigger;