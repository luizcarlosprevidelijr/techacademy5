import express from 'express'
import sequelize from './config/database'
import userRoutes from './routes/userRoutes'
import sellerRoutes from './routes/sellerRoutes'
import clientRoutes from './routes/clientRoutes'
import productRoutes from './routes/productRoutes'

const app = express()
const port = 3000

app.get('/', (req, res) =>{
    res.send('Hello, World! :)')
})

app.use(express.json())
app.use(userRoutes)
app.use(sellerRoutes)
app.use(productRoutes)
app.use(clientRoutes)


sequelize
    .sync({ alter: true })
    .then(() => {
        console.log('database foi sincronizado com sucesso')
    })
    .catch((error) => {
        console.log('deu zica no bagulho', error)
    })

app.listen(port, () =>{
    console.log('Server is running on port', port)
})