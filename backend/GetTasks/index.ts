import { CosmosClient } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { cosmosDbConfig } from '../config';
import { httpAuthorizationTrigger } from "../httpAuthorizationTrigger";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest) => await httpAuthorizationTrigger(context, req, async (context, _req, user) => {
  console.log(cosmosDbConfig)
  const { endpoint, key, databaseId, containerId } = cosmosDbConfig;
  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);
  
  try {
    const querySpec = { 
      query: 'SELECT c.id, c.name, c.complete FROM c WHERE c.userId = @userId',
      "parameters": [
        { name: "@userId", value: user.userId },
      ]
    };

    const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();

    context.res = { body: items };
  } catch (e) {
      console.log(e);
      context.res = { body: [], status: 500 };
  }
});

export default httpTrigger;