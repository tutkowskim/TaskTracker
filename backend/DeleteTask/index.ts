import { CosmosClient } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { cosmosDbConfig } from "../config";
import { httpAuthorizationTrigger } from "../httpAuthorizationTrigger";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest) => await httpAuthorizationTrigger(context, req, async (context, req, user) => {
  const id = (req.query.id || (req.body && req.body.id));
  if (!id) {
    context.res = { body: { message:  'id not specified' }, status: 500 };
    return;
  }

  const { endpoint, key, databaseId, containerId } = cosmosDbConfig;
  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);

  try {
    const taskResource = (await container.item(id, id).read()).resource;
    if (taskResource.userId === user.userId) {
      await container.item(id, id).delete();
      context.res = { body: { message: `Deleted task with id: ${id}` }, status: 200 };
    } else {
      context.res = { body: { message: 'Cannot delete another user\'s task' }, status: 401 };
    }
  } catch (e) {
    console.log(e);
    context.res = { body: { message:  `Failed to delete task with id: ${id}` }, status: 500 };
  }
});

export default httpTrigger;