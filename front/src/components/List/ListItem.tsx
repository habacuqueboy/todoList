import React from 'react'

import {ListItemStyles} from 'styles/List/ListItemStyles'
import {Tag} from './Tag'

export type ListItemType = {
    id: number
    title: string
    dsc?: string
    due?: Date
    tags?: string[]
}

type Props = ListItemType & { onDelete: Function , onTagDelete: Function }
    
export const ListItem = ({title,dsc,id,due,tags,onDelete,onTagDelete}:Props) => {
    const fim = due?.toLocaleDateString('pt-BR')
    return <div style={ListItemStyles.container}>
        <header style={ListItemStyles.header}>
            <div style={ListItemStyles.title}>{title} </div>
            <button style={ListItemStyles.closeButton} onClick={onDelete(id)}>X</button>
        </header>
        <div>{dsc}</div>
        <div>{fim}</div>
        { tags?.map( (tag,idx) => <Tag key={idx} value={tag} onDelete={onTagDelete(id,idx)} /> ) }
    </div>
}
