import MainShop from '@/app/component/shop/MainShop'
import React from 'react'

async function getData(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/shop/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
export async function generateMetadata({ params }) {
  const data = await getData(params.shopId)
  return {
    title: data.name + ' - Gian hàng trực tuyến tại myshop',
  }
}

function page({ params }) {
  return <MainShop />
}

export default page
