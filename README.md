# netology
nodejs backend

1.
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

2.
const select = db.collection('books').find({ title: '2' });

3.
await db.collection('books').updateOne(
  { id: '123456789' },
  {
    $set: { 'description': 'About', authors: 'Somebody' }
  }
);
