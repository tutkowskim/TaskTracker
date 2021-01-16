import { CosmosClient } from '@azure/cosmos';
import express from 'express';
import cosmosDbConfig from './cosmosDbConfig';
import checkJwt from './checkJwt';

const app = express();

app.get('/api/GetTasks', checkJwt, async (req: any, res) => {
  const {
    endpoint, key, databaseId, containerId,
  } = cosmosDbConfig;
  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);

  try {
    const querySpec = {
      query: 'SELECT c.id, c.name, c.complete FROM c WHERE c.userId = @userId',
      parameters: [
        { name: '@userId', value: req.user.sub },
      ],
    };

    const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();

    res.json(items);
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
  }
});

app.get('/api/AddTask', checkJwt, async (req: any, res) => {
  const name = (req.query.name || (req.body && req.body.name));
  if (name) {
    const {
      endpoint, key, databaseId, containerId,
    } = cosmosDbConfig;
    const client = new CosmosClient({ endpoint, key });

    const database = client.database(databaseId);
    const container = database.container(containerId);

    await container.items.create({ name, userId: req.user.sub, complete: false });
    res.send(`Created task ${name}`);
  } else {
    res.send('Name not specified for task');
  }
});

app.get('/api/DeleteTask', checkJwt, async (req: any, res) => {
  const id = (req.query.id || (req.body && req.body.id));
  if (!id) {
    res.send('Name not specified for task');
    return;
  }

  const {
    endpoint, key, databaseId, containerId,
  } = cosmosDbConfig;
  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);

  try {
    const taskItem = container.item(id, id);
    const task = (await taskItem.read()).resource;
    if (task.userId === req.user.sub) {
      await taskItem.delete();
      res.send(`Deleted task with id: ${id}`);
    } else {
      res.send('Cannot delete another user\'s tasks');
    }
  } catch (e) {
    console.log(e);
    res.send(`Failed to delete task with id: ${id}`);
  }
});

app.get('/api/EditTask', checkJwt, async (req: any, res) => {
  const id = (req.query.id || (req.body && req.body.id));
  const name = (req.query.name || (req.body && req.body.name));
  const complete = (req.query.complete || (req.body && req.body.complete));

  const {
    endpoint, key, databaseId, containerId,
  } = cosmosDbConfig;
  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);

  try {
    const item = container.item(id, id);
    const task = (await item.read()).resource;
    if (task.userId === req.user.sub) {
      if (name !== undefined) task.name = name;
      if (complete !== undefined) task.complete = (complete === 'true');
      await item.replace(task);
      res.send(`Deleted task with id: ${id}`);
    } else {
      res.send('Cannot edit another user\'s tasks');
    }
  } catch (e) {
    console.log(e);
    res.send(`Failed to delete task with id: ${id}`);
  }
});

const PORT = process.env.PORT || 7071;
app.listen(PORT);
console.log(`Listening on http://localhost:${PORT}`);
