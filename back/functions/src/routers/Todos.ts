import {Router} from "express"
import {firestore} from "firebase-admin"

const router = Router()
const db = firestore().collection("todos")

//Create
router.post('/',async (req, res) => {
    try {
        await db.add(req.body)
        res.status(200).json(req.body)
    } catch (e) {
        res.status(400).json({err:e})
    }
})

//Read
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

//Update
router.put('/',async (req,res) => {
    const id = req.body.id
    try {
        await db.doc(id).update(req.body)
        res.status(200).json(req.body)
    } catch(e) {
        res.status(400).json({err:e})
    }
})


//Delete
router.delete('/',async (req,res) => {
    const id = req.body.id
    try {
        await db.doc(id).delete()
        res.status(200).json(req.body)
    } catch(e) {
        res.status(400).json({err:e})
    }
})



export const Todos = router 
