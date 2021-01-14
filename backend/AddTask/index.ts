import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import MockTasks from "../MockData";

let idCounter = 3;

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const name = (req.query.name || (req.body && req.body.name));
    if (name) {
        idCounter += 1;
        MockTasks.tasks = [...MockTasks.tasks, { id: idCounter, name, complete: false }];
        context.res = { body: `Created task '${name}'` };
    } else {
        context.res = { body: 'Name not specified for task' };
    }
};

export default httpTrigger;