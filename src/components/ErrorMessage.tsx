import React from 'react'

export default function ErrorMessage({children}:{children:React.ReactNode} ) {
  return (
    <div className=" text-center my-4 bg-red-100 border border-red-400 text-red-700 font-bold p-3 uppercase text-sm">
        {children}
    </div>
  )
}
