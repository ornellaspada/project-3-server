import app from './app.js'
import connectToDb from './db/connectToDb.js'

async function startApp() {
  try {
    await connectToDb()
    console.log('Success Database Has connected My padowan')
    
    // ? .listen will listen to request when app is run
    app.listen(4000, () => console.log('Express is running'))
  } catch (e) {
    console.log('An error occurred!!!!!!')
    console.log(e)
  }
}
startApp()