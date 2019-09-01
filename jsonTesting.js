

const book = {
    author:'prabhu kumar',
    noofpages:23
}

const jsonString = JSON.stringify(book)

console.log(jsonString)
console.log(JSON.parse(jsonString))

