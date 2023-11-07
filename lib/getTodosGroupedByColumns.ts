import { databases } from "@/appwrite";

export const getTodosGroupedByColumns = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );

  const todos = data.documents;

  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }

    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });

    return acc;
  }, new Map<TypedColumns, Column>());

  const columnsType: TypedColumns[] = ["todo", "inprogress", "done"];

  // Add anothers column types that don't exists on database
  for (const columnType of columnsType) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  // Sort columns
  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnsType.indexOf(a[0]) - columnsType.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: sortedColumns,
  };

  return board;
};
