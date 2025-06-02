const express = require("express")
const app = express()
const PORT = 3000


//MIDDLEWARE
app.use(express.json())

//RUTAS
app.use("/users", require("./routes/users"))
app.use("/orders", require("./routes/orders"))
app.use('/products', require('./routes/products'))
app.use('/categories', require('./routes/categories'))





// Middleware de errores (después de TODAS las rutas)











//SERVIDOR
app.listen(PORT, ()=>{
    console.log(`Server listening on http://localhost:${PORT}`)
})