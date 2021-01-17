import { CosmosClient } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { cosmosDbConfig } from "../config";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const name = (req.query.name || (req.body && req.body.name));
    if (name) {
        const { endpoint, key, databaseId, containerId } = cosmosDbConfig;
        const client = new CosmosClient({ endpoint, key });
      
        const database = client.database(databaseId);
        const container = database.container(containerId);
    
        await container.items.create({ name, complete: false });

        context.res = { body: `Created task ${name}`, status: 200 };
    } else {
        context.res = { body: 'Name not specified for task', status: 500 };
    }
};

export default httpTrigger;