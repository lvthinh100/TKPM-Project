exports.testConnection = async function (db) {
  const c = await db.connect(); // try to connect
  c.done(); // success, release connection
  console.log(c.client.serverVersion);
  return c.client.serverVersion; // return server version
};
