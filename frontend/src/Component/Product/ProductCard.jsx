import React from 'react'

const ProductCard = ({ product }) => {
  // const options = {
  //   value: product.ratings,
  //   readOnly: true,
  //   precision: 0.5,
  // };
  console.log(product)
  return (
    <div >
   
    <p >{product.name}</p>
   
  </div>
  )
}

export default ProductCard