import { CosmosClient } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { cosmosDbConfig } from "../config";
import { httpAuthorizationTrigger } from "../httpAuthorizationTrigger";
import { UserTasks } from "../tasks";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest) => await httpAuthorizationTrigger(context, req, async (context, req, user) => {
    const { endpoint, key, databaseId, containerId } = cosmosDbConfig;
    const client = new CosmosClient({ endpoint, key });

    const database = client.database(databaseId);
    const container = database.container(containerId);

    const resource: UserTasks = { id: user.userId, tasks: req.body };
    await container.items.create(resource);
    context.res = { body: { message: 'Update complete' }, status: 200 };
});

export default httpTrigger;
