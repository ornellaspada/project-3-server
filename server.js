import app from './app.js'
import connectToDb from './db/connectToDb.js'
import { port } from './config/environment.js'

async function startApp() {
  try {
    await connectToDb()
    console.log('Success Database Has connected My padowan')
    
    // ? .listen will listen to request when app is run
    app.listen(port, () => console.log('Express is running'))
  } catch (e) {
    console.log('Something went wrong starting app')
    console.log(e)
  }
}
startApp()