import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

// Last connection error, so we can show the real reason in the browser
export let lastDbError = null

let connecting = null

// Safe for Vercel: it connects once, remembers the connection, and
// every request can "await" it before touching the database.
export const dbConnection = async () => {
  if (mongoose.connection.readyState === 1) return true

  if (!connecting) {
    connecting = mongoose
      .connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 8000 })
      .then(() => {
        lastDbError = null
        console.log('DB connection established')
      })
      .catch((error) => {
        lastDbError = error.message
        console.log('DB Error: ' + error)
      })
      .finally(() => {
        connecting = null // allow a fresh try on the next request
      })
  }

  await connecting
  return mongoose.connection.readyState === 1
}

export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })

  // Change sameSite from strict to none when you deploy your app
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict', //prevent CSRF attack
    maxAge: 1 * 24 * 60 * 60 * 1000, //1 day
  })
}
