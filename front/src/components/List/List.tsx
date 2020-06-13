import React from 'react'

import {ListItem} from './ListItem'
import {ListStyles} from 'styles/List/ListStyles'
import {useList} from 'hooks/List/useList'

export const List = () => {
    const { items , form , onFormChange , onFormSubmit , filter , onFilterChange , onItemDelete , onItemChange , onTagDelete } = useList()
    return <main style={ListStyles.container}>
        <form onSubmit={onFormSubmit()}>
            <input required type="text" name="title" placeholder="Título" value={form.title} onChange={onFormChange()} />
            <input required type="text" name="dsc" placeholder="Descrição" value={form.dsc} onChange={onFormChange()} />
            <input type="text" name="tags" placeholder="Tags" value={form.tags?.join(',')} onChange={onFormChange()} />
            <input type="submit" value="Salvar"/>
        </form>
        <form>
            <input type="text" name="filter" placeholder="Filtro" value={filter} onChange={onFilterChange()}/>
        </form>
        <div style={ListStyles.items}>
            { items.length > 0 ? items.map( (item) => <ListItem key={item.id} onDelete={onItemDelete} onChange={onItemChange} onTagDelete={onTagDelete} {...item} /> ) : <span>Nenhum Item</span> }
        </div>
    </main>

}
