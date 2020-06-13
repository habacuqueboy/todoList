import {https} from 'firebase-functions'
import {initializeApp} from 'firebase-admin'
import * as express from 'express'

import {Todos} from './routers/Todos' 

initializeApp()
const app = express()

app.use(express.json())

app.use('/todos',Todos)

export const api = https.onRequest(app)
