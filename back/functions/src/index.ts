import {initializeApp} from 'firebase-admin'
initializeApp()

import {https} from 'firebase-functions'
import * as express from 'express'

import {Todos} from './routers/Todos' 

const app = express()

app.use(express.json())

app.use('/todos',Todos)

export const api = https.onRequest(app)
