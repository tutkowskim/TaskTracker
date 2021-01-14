import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import MockTasks from "../MockData";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const id = (req.query.id || (req.body && req.body.id));
    if (id) {
        // Since this is mock data don't worry if it doesn't exist
        MockTasks.tasks = MockTasks.tasks.filter(task => task.id != id);
        context.res = { body: `Task ${id} removed` };
    } else {
        context.res = { body: 'id not specified' };
    }
};

export default httpTrigger;