const http = require('http')
const fs = require('fs')
const fetch = require('node-fetch')
const ObjectsToCsv = require('objects-to-csv')


const dataFile = fs.readFileSync('index.html')
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end(dataFile)
})

server.listen(3000, () => {
    console.log("Server Started")
})


const getData = async () => {
    try {
        const response = await fetch(`https://random-data-api.com/api/v2/users?size=5`);
        const data = await response.json()
        const data2 = data.map(element =>
        ({
            UserName: element.username,
            First_Name: element.first_name,
            Last_Name: element.last_name,
            Email: element.email
        }))
        //console.log(data2)
        const csv = new ObjectsToCsv(data2)
        await csv.toDisk('./users.csv', { append: true })
        console.log('Data Added')
    }
    catch (err) {
        console.log(err)
    }
}
getData()
