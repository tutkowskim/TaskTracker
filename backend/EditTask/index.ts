import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import MockTasks from "../MockData";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const id = (req.query.id || (req.body && req.body.id));
    const name = (req.query.name || (req.body && req.body.name));
    const complete = (req.query.complete || (req.body && req.body.complete));

    let responseMessage: string;
    const task = MockTasks.tasks.find(task => id == task.id);
    if (task) {
        if (name !== undefined) task.name = name;
        if (complete !== undefined) task.complete = (complete == 'true');
        responseMessage = 'Task updated';
    } else {
        responseMessage = `Task not found for id: ${id}`;
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
};

export default httpTrigger;