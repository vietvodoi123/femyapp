'use client'
import { Carousel } from 'antd'
import React from 'react'
import Image from 'next/image'
type Props = {}

function MainHeader({}: Props) {
  const items = []
  for (let i = 1; i <= 4; i++) {
    items.push(`/banner/banner${i}.jpg`)
  }

  const onChange = (currentSlide: number) => {}
  return (
    <div className=" bg-white">
      <div className=" w-[1280px] mx-auto py-7">
        <Carousel afterChange={onChange} autoplay autoplaySpeed={2000}>
          {items.map((item, i) => (
            <div key={i}>
              <Image src={item} alt={item} width={1280} height={350} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default MainHeader
