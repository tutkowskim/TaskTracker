import { CosmosClient } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { cosmosDbConfig } from "../config";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const id = (req.query.id || (req.body && req.body.id));
    const name = (req.query.name || (req.body && req.body.name));
    const complete = (req.query.complete || (req.body && req.body.complete));

    const { endpoint, key, databaseId, containerId } = cosmosDbConfig;
    const client = new CosmosClient({ endpoint, key });

    const database = client.database(databaseId);
    const container = database.container(containerId);

    try {
        const item = container.item(id, id);
        const updatedValue = (await item.read()).resource;
        
        if (name !== undefined) updatedValue.name = name;
        if (complete !== undefined) updatedValue.complete = (complete == 'true');

        await item.replace(updatedValue);

        context.res = { body: `Deleted task with id: ${id}`, status: 200 };
    } catch (e) {
        console.log(e);
        context.res = { body: `Failed to delete task with id: ${id}`, status: 500 };
    }
};

export default httpTrigger;