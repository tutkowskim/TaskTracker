import { CosmosClient } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { cosmosDbConfig } from "../config";
import { httpAuthorizationTrigger } from "../httpAuthorizationTrigger";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest) => await httpAuthorizationTrigger(context, req, async (context, req, user) => {
    const name = (req.query.name || (req.body && req.body.name));
    if (name) {
        const { endpoint, key, databaseId, containerId } = cosmosDbConfig;
        const client = new CosmosClient({ endpoint, key });

        const database = client.database(databaseId);
        const container = database.container(containerId);

        const userId = user.userId;
        await container.items.create({ userId, name, complete: false });
        context.res = { body: { message: `Created task ${name}` }, status: 200 };
    } else {
        context.res = { body: { message: 'Name not specified for task'}, status: 500 };
    }
});

export default httpTrigger;