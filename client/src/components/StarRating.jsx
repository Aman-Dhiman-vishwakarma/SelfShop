import React from 'react'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRating = ({rating}) => {

const starRating = Array.from({length:5}, (e, index)=> {
    const number = index + 0.8;
    const secondNumber = index + 0.4
    return rating >= index + 1 ? <FaStar key={index} /> : rating >= number ? <FaStar key={index} /> : rating >= secondNumber ? <FaStarHalfAlt key={index}/> : <FaRegStar key={index}/>
})
  return (
    <div className='flex gap-[1px]'>
      {starRating}
    </div>
  )
}

export default StarRating
