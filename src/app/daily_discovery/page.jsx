import React from 'react'
import MainHeader from '../component/home/MainHeader'
import ListItems from '../component/ui/ListItems.jsx'

export async function generateMetadata({ params, searchParams }) {
  if ('search' in searchParams) {
    return {
      title: `${searchParams.search} - Tìm kiếm sản phẩm`,
    }
  }
}

async function page({ params, searchParams }) {
  return (
    <main className=" bg-gray1">
      <MainHeader />

      <ListItems pagination={true} />
    </main>
  )
}

export default page
