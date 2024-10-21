import React from 'react'
import MainHeader from '../component/home/MainHeader'
import ListItems from '../component/ui/ListItems'
import findTypeItem from '@/utils/dummyData'
export async function generateMetadata({ params }) {
  return {
    title: `${findTypeItem(params.slug)} - Tìm kiếm sản phẩm`,
  }
}

function page({ params }) {
  return (
    <main className=" bg-gray1 h-full pb-9">
      <MainHeader />

      <ListItems />
    </main>
  )
}

export default page
