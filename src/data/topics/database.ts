import type { Topic } from '../types'

export const database: Topic = {
  id: 'database',
  title: 'Database',
  blurb: 'Basic SQL and NoSQL ideas: keys, joins, indexes and relationships.',
  questions: [
    {
      id: 'db-1',
      question: `SQL vs NoSQL, how do you choose?`,
      short: `SQL databases like Postgres and MySQL store data in tables with a fixed schema and relationships, and they're great when data is structured and connected, like users, orders and payments. NoSQL, like MongoDB, stores flexible documents, which is handy when the shape changes a lot or you read whole objects at once. I pick SQL by default because joins and transactions are solid. I'd go with MongoDB for things like content, logs or quick prototypes where the schema isn't settled.`,
      simple: `SQL is tables with strict columns and links between them. NoSQL is more flexible, like storing JSON-like documents.`,
      followUp: [`Can Postgres store JSON too?`, `What do you lose when you pick NoSQL?`],
    },
    {
      id: 'db-2',
      question: `What are the different types of SQL joins?`,
      short: `A join combines rows from two tables based on a related column. INNER JOIN returns only rows that match in both. LEFT JOIN returns everything from the left table plus matches from the right, with NULLs where there's no match. RIGHT JOIN is the mirror of that. FULL OUTER JOIN returns everything from both. I use INNER JOIN most, and LEFT JOIN when I want, for example, all users even if they have no orders.`,
      simple: `Inner keeps only matching rows. Left keeps all rows from the first table and fills blanks when there is no match.`,
      example: {
        code: `SELECT u.name, o.total
FROM users u
LEFT JOIN orders o ON o.user_id = u.id;`,
        lang: 'sql',
      },
      followUp: [`How do you find users with no orders?`],
    },
    {
      id: 'db-3',
      question: `What are primary keys and foreign keys?`,
      short: `A primary key uniquely identifies each row in a table. It can't be null or duplicated, and it's usually an auto-increment ID or a UUID. A foreign key is a column in one table that points to the primary key of another, like orders.user_id pointing to users.id. The database enforces it, so you can't create an order for a user that doesn't exist. You can also set what happens on delete, like CASCADE or RESTRICT.`,
      simple: `A primary key is a row's unique ID. A foreign key is a column that links to another table's ID.`,
      followUp: [`UUID vs auto-increment ID, which do you prefer?`, `What does ON DELETE CASCADE do?`],
    },
    {
      id: 'db-4',
      question: `What is an index and when should you add one?`,
      short: `An index is a separate structure, usually a B-tree, that lets the database find rows without scanning the whole table. It's like a book index. I add indexes on columns I filter, join or sort by a lot, like email or foreign keys. The tradeoff is writes get slower and it uses more storage, because every insert or update must update the index too. I don't index everything. I check slow queries with EXPLAIN and add indexes based on that. Also, a composite index follows left-to-right column order.`,
      simple: `An index is a shortcut so the database doesn't read every row. It speeds up reads but slows down writes a bit.`,
      example: { code: `CREATE INDEX idx_users_email ON users(email);`, lang: 'sql' },
      followUp: [`What is a composite index?`, `Why might the database ignore your index?`],
    },
    {
      id: 'db-5',
      question: `What are the types of relationships between tables?`,
      short: `One-to-one, like a user and their profile. One-to-many, the most common, like one user with many orders, where the order has a user_id foreign key. And many-to-many, like students and courses, which needs a join table holding both IDs, sometimes with extra fields like enrolled date. In MongoDB, I'd either embed for small bounded data or store references for big or shared data.`,
      simple: `One-to-one is one match, one-to-many is one parent with many children, many-to-many needs a middle table.`,
      example: {
        code: `CREATE TABLE enrollments (
  student_id INT REFERENCES students(id),
  course_id  INT REFERENCES courses(id),
  PRIMARY KEY (student_id, course_id)
);`,
        lang: 'sql',
      },
      followUp: [`Where does the foreign key go in one-to-one?`],
    },
    {
      id: 'db-6',
      question: `How does MongoDB store data and what are documents and collections?`,
      short: `MongoDB stores data as BSON documents, which look like JSON objects, inside collections, which are roughly like tables. Documents in one collection can have different fields, and you can nest arrays and objects inside, so related data can live in one document. Every document gets an _id. I use it when I read whole objects together a lot. The catch is that there are no joins by default, so relationships need thought: embed the data or store references.`,
      simple: `It saves JSON-like objects in collections, instead of rows in tables.`,
      example: { code: `db.users.insertOne({ name: 'Asha', skills: ['js', 'react'], address: { city: 'Pune' } })`, lang: 'js' },
      followUp: [`Embed or reference, how do you decide?`],
    },
  ],
}
