import { CosmosClient } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { cosmosDbConfig } from "../config";
import { httpAuthorizationTrigger } from '../httpAuthorizationTrigger';

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest) => await httpAuthorizationTrigger(context, req, async (context, req, clientPrincipal) => {
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

    if (updatedValue.userId === clientPrincipal.clientPrincipal.userId) {
    if (name !== undefined) updatedValue.name = name;
    if (complete !== undefined) updatedValue.complete = (complete == true || complete === 'true');
      await item.replace(updatedValue);
      context.res = { body: { message:  `Edited task with id: ${id}` }, status: 200 };
    } else {
        context.res = { body: { message: 'Cannot edit another user\'s task' }, status: 401 };
    }
  } catch (e) {
    console.log(e);
    context.res = { body: { message: `Failed to delete task with id: ${id}` }, status: 500 };
  }
});

export default httpTrigger;