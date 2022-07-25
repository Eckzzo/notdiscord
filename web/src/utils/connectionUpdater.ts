import { ConnectionHandler, RecordProxy, RecordSourceProxy } from 'relay-runtime';

interface ConnectionUpdaterArgs {
  store: RecordSourceProxy;
  parentId: string;
  connectionName: string;
  edge: RecordProxy;
  before?: boolean;
}

const connectionUpdater = ({ store, parentId, connectionName, edge, before = false }: ConnectionUpdaterArgs) => {
  if (edge) {
    if (!parentId) {
      return;
    }
  }

  const parentProxy = store.get(parentId);

  if (!parentProxy) {
    return;
  }

  const conn = ConnectionHandler.getConnection(parentProxy, connectionName);

  if (!conn) {
    return;
  }

  if (before) {
    ConnectionHandler.insertEdgeBefore(conn, edge);
  } else {
    ConnectionHandler.insertEdgeAfter(conn, edge);
  }
};

export { connectionUpdater };
