const cosmosDbConfig = {
  endpoint: process.env.COSMOSDB_ENDPOINT,
  key: process.env.COSMOSDB_KEY,
  databaseId: process.env.COSMOSDB_DATABASE_ID,
  containerId: process.env.COSMOSDB_CONTAINER_ID,
  partitionKey: { kind: 'Hash', paths: ['/id'] },
};

export default cosmosDbConfig;