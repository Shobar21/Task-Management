   import cookieParser from 'cookie-parser'
   import cors from 'cors'
   import dotenv from 'dotenv'
   import express from 'express'
   import morgan from 'morgan'
   import { errorHandler, routeNotFound } from './middlewares/errorMiddlewaves.js'
   import routes from './routes/index.js'
   import { dbConnection } from './utils/index.js'

   dotenv.config()

   dbConnection()

   const PORT = process.env.PORT || 5000

   const app = express()

   app.use(
     cors({
       origin: [
         'http://localhost:3000',
         'http://localhost:3001',
         'http://localhost:5173',
         // deployed client address(es), comma separated, set in Vercel env vars
         ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : []),
       ],
       methods: ['GET', 'POST', 'DELETE', 'PUT'],
       credentials: true,
     }),
   )

   // bigger limit because task images are sent as base64 text
   app.use(express.json({ limit: '15mb' }))
   app.use(express.urlencoded({ extended: true, limit: '15mb' }))

   app.use(cookieParser())

   app.use(morgan('dev'))

   // quick check that the server is alive: open https://your-server.vercel.app/
   app.get('/', (req, res) => res.json({ status: true, message: 'API is running' }))

   app.use('/api', routes)

   app.use(routeNotFound)
   app.use(errorHandler)

   // On Vercel the platform starts the app itself, so we only listen locally
   if (!process.env.VERCEL) {
     app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
   }

   export default app
