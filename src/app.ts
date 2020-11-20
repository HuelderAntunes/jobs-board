import express from 'express'
import { Application } from 'express'

class App {
    public app: Application
    public port: number

    constructor (appInit: { port: number; middlewares: any }) {
        this.app = express()
        this.app.use(express.json())
        this.port = appInit.port

        this.middlewares(appInit.middlewares)
    }

    public middlewares (middlewares: {
        forEach: (arg0: (middleware: any) => void) => void
    }) {
        middlewares.forEach(middleware => {
            this.app.use(middleware)
        })
    }

    public listen () {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App
