import { useState , useEffect } from 'react'
import { ListItemType } from 'components/List/ListItem'

const initialForm = { id: 0 , title: '' , dsc: '' , tags: [] }

export const useList = () => {

    const [items,setItems] = useState<ListItemType[]>([])
    const [unfilteredItems,setUnfilteredItems] = useState<ListItemType[]>([])
    const [filter,setFilter] = useState<string>('')
    const [form,setForm] = useState<ListItemType>(initialForm)

    // get new todos
    useEffect( () => {
        const todos = localStorage.getItem('todos')
        if(todos) { setUnfilteredItems( JSON.parse(todos) ) }
    },[])

    // runs when we change the filter or get new todos
    useEffect( () => {
        const todos = unfilteredItems.filter( (item) => item.title.includes(filter) || ( item.dsc && item.dsc.includes(filter) ) )
        setItems(todos)
    },[unfilteredItems,filter])


    const onFormChange = () => {
        return (e: any) => {
            const { name , value } = e.target
            if(name === 'tags') {
                setForm( form => ({ ...form , [name]: value.split(',') }) ) 
            } else {
                setForm( form => ({...form,[name]: value}) ) 
            }
        }
    }

    const onFormSubmit = () => {
        return (e:any) => {
            e.preventDefault()
            setUnfilteredItems( (oldItems) => {
               const newItems = [ ...oldItems , {...form,id: Date.now() } ] 
               localStorage.setItem( 'todos' , JSON.stringify(newItems) )
               setForm(initialForm)
               return newItems
            })
        }
    }

    const onItemDelete = (id: number) =>  {
        return () => {
            setUnfilteredItems( (oldItems) => oldItems.filter( (item) => item.id !== id ) )
        }
    }

    const onTagDelete = (itemId:number ,tagIndex: number) => {
        return (e: any) => {
            setUnfilteredItems( (oldItems) => {
                const oldIndex = oldItems.findIndex( (item) => item.id === itemId)
                const oldItem = oldItems[oldIndex]
                const newItem = {...oldItem, tags: oldItem?.tags?.filter( (tag,idx) => idx !== tagIndex )}
                const newItems = [ ...oldItems.slice(0,oldIndex) , newItem , ...oldItems.slice(oldIndex+1) ]
                localStorage.setItem('todos',JSON.stringify(newItems))
                return newItems
            })
        }
    }

    const onFilterChange = () => {
        return (e:any) => {
            const { value } = e.target
            setFilter(value)
        }
    }


    return { items , form , onFormChange , onFormSubmit , filter , onFilterChange , onItemDelete , onTagDelete }

}
