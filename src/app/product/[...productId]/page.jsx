import React from 'react'
import DetailsAndImageProduct from '@/app/component/product/DetailsAndImageProduct'
import InforShop from '@/app/component/product/InforShop'
import ShortDetail from '@/app/component/product/ShortDetail'
import Reviews from '@/app/component/product/Reviews'
import MoreProducts from '@/app/component/product/MoreProducts'

async function getData(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
export async function generateMetadata({ params }) {
  const data = await getData(params.productId)
  return {
    title: data.name,
  }
}

async function page({ params }) {
  const data = await getData(params.productId)

  return (
    <div className="bg-gray1">
      <div className="  w-[1280px] mx-auto py-4">
        <DetailsAndImageProduct detailsProduct={data} />
        <InforShop shop={data.creatorInfo} />
        <div className="w-full mt-5  flex justify-[3.5fr_1fr] gap-5">
          <div className="w-full">
            <ShortDetail
              long_desc={data.long_desc}
              short_desc={data.short_desc}
              category={data.category}
            />
            <Reviews id={data.id} />
          </div>
          <MoreProducts creatorId={data.creatorId} />
        </div>
      </div>
    </div>
  )
}

export default page
