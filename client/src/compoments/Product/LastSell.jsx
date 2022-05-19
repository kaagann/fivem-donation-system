import React from 'react'

function LastSell({pp, name}) {
    return (
        <div className="flex items-center gap-1 ml-auto mr-auto m-1">
            <img className="w-8 h-8 rounded-full" src={pp}/>
            <p>{name}</p>
        </div>
    )
}

export default LastSell
