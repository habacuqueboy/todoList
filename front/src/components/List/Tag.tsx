import React from 'react' 

import {TagStyles} from 'styles/List/TagStyles'

type Props = { value: string , onDelete: (e: any) => void }
export const Tag = ({value,onDelete}:Props) => {
    return <span style={TagStyles.container}>
        {value}
        <button onClick={onDelete} >X</button>
    </span> 
}
