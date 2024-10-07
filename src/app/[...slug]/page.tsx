import React, { Suspense, useState } from 'react'
import MainHeader from '../component/home/MainHeader'
import ListItems from '../component/ui/ListItems'

type Props = {}

function page({}: Props) {
  return (
    <main className=" bg-gray1 h-full pb-9">
      <MainHeader />

      <ListItems />
    </main>
  )
}

export default page
