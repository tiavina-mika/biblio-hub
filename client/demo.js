const books =['a', 'b', 'c', 'd', 'e']
const booksMap = books.map(n => n)
const firstBooks = booksMap.slice(0, 3)
console.log('firstBooks: ', firstBooks);
const lastBooks = booksMap.slice(3, 5)
console.log('lastBooks: ', lastBooks);
// console.log('books: ', books.map(n => n).splice(0, 2));