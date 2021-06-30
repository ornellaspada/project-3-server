import dotenv from 'dotenv'
dotenv.config()

export const dbUrl =
  process.env.DB_URI || 'mongodb://localhost/placesdb'
export const port = process.env.PORT || 4000
export const secret = process.env.SECRET || 'horsebatterystapleredbaloon'