import React from 'react'

function CardProvider({ src, name }) {
    return (
        <div className="relative flex items-center justify-center sm_1:w-full w-40 h-64 overflow-hidden bg-black-06 rounded-2xl">
            <div className="absolute w-[25px] h-[130%] bg-gradient-to-b from-[#408c75] to-white  animate-rotBGimg"></div>
            <div className="absolute inset-1 bg-black-06 rounded-xl p-4 flex items-center justify-center flex-col gap-5">
                <img src={src} className='w-full sm_1:w-40' />
                <h4 className='text-lg text-center'>{name}</h4>
            </div>
        </div>
    )
}

export default CardProvider