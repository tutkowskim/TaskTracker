import { CosmosClient } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { cosmosDbConfig } from '../config';
import { httpAuthorizationTrigger } from "../httpAuthorizationTrigger";
import { UserTasks } from '../tasks';

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest) => await httpAuthorizationTrigger(context, req, async (context, _req, user) => {
  const { endpoint, key, databaseId, containerId } = cosmosDbConfig;
  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);

  try {
    const userTasks = (await container.item(user.userId, user.userId).read()).resource as UserTasks;
    const tasks =  userTasks.tasks || [];
    context.res = { body: tasks };
  } catch (e) {
    console.log(e);
    context.res = { body: [] };
  }
});

export default httpTrigger;