import React from 'react'

const SkeletonDetailProduct = () => {
  return (
    <div className='w-[80%] my-6 mx-auto flex justify-between gap-6'>
      <div className="flex gap-4 w-[50%]">
        <div className="flex flex-col gap-4">
            <div className="skeleton h-28 w-28"></div>
            <div className="skeleton h-28 w-28"></div>
            <div className="skeleton h-28 w-28"></div>
            <div className="skeleton h-28 w-28"></div>
        </div>
        <div className="skeleton h-[75vh] flex-1"></div>
      </div>
      <div className="w-[45%] h-[80vh] pr-6 flex flex-col gap-3">
        <div className="skeleton h-8 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-[60%]"></div>
        <div className="w-full flex items-end gap-12 mt-2">
        <div className="skeleton h-12 w-28"></div>
        <div className="skeleton h-6 w-24"></div>
        </div>
        <div className="skeleton h-14 w-28 mt-4"></div>
        <div className="skeleton h-12 w-full mt-4"></div>
        <div className="skeleton h-12 w-full mt-1"></div>
        <div className="skeleton h-28 w-full mt-4"></div>
      </div>
    </div>
  )
}

export default SkeletonDetailProduct
