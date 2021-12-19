import mongoose, { ConnectOptions } from 'mongoose'

const connectdb = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      process.env.dbUri!,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions,
      (err) => {
        if (err) {
          reject(err)
        } else {
          resolve('Database connected.')
        }
      },
    )
  })
}

export default connectdb
