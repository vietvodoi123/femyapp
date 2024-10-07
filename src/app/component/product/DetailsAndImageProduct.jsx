import React from 'react'
import ImageProduct from '@/app/component/product/ImageProduct'
import DetailsProduct from '@/app/component/product/DetailsProduct'

const DetailsAndImageProduct = ({ detailsProduct }) => {
  return (
    <div className="flex justify-[2fr_3fr] gap-4 bg-white w-full p-5 border-base-03">
      <ImageProduct
        imageUrl={detailsProduct.imageUrl}
        name={detailsProduct.name}
      />
      <DetailsProduct item={detailsProduct} />
    </div>
  )
}

export default DetailsAndImageProduct
