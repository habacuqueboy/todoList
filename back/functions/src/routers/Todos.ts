import {Router} from "express"
import {firestore} from "firebase-admin"

const router = Router()
const db = firestore().collection("todos")

router.get('/',async (req,res) => {
    try {
        const docs = await db.get()
        const todos: any = []
        docs.forEach( (doc) => todos.push( doc.data() ) )
        res.status(200).json(todos)
   } catch(e) {
        res.status(400).json({err: e})
   } 
})

router.post('/',async (request, response) => {
    try {
        await db.add(request.body)
        response.status(200).json(request.body)
    } catch (e) {
        response.status(400).json({err:e})
    }
})

export const Todos = router 
