const express = require('express')
const app = express()

const PORT = process.env.PORT ? process.env.PORT : 3000;



app.get('/', (request, response) =>{
    response.send('<h1>Hello World!</h1>')
})


app.listen(PORT, () => { 
console.log(`Server running on port ${PORT}`);
})
