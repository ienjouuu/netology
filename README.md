запрос(ы) для вставки данных минимум о двух книгах в коллекцию books,
запрос для поиска полей документов коллекции books по полю title,
запрос для редактирования полей: description и authors коллекции books по _id записи.
*Каждый документ коллекции books должен содержать следующую структуру данных:

{
  title: "string",
  description: "string",
  authors: "string"
}

1
await db.collection('books').insertMany([
    {
    title: "1",
    description: "1",
    authors: "a"
    },
    {
    title: "2",
    description: "2",
    authors: "b"
    }
])

2
const select = db.collection('books').find({ title: '2' });
3
await db.collection('books').updateMany(
  { id: '123456789' },
  {
    $set: { 'description': 'About', authors: 'Somebody' }
  }
);
