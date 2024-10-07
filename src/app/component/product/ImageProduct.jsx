'use client'

import React, { useState } from 'react'
import Image from 'next/image'

function ImageProduct({ imageUrl, name }) {
  const [url, setUrl] = useState(imageUrl[0])
  return (
    <div className=" w-[450px]">
      <Image src={url} alt={name} width={450} height={450} />
      <div className=" flex flex-wrap gap-3 justify-start mt-2">
        {imageUrl.map((item, i) => (
          <Image
            onMouseEnter={() => setUrl(item)}
            onClick={() => setUrl(item)}
            src={item}
            alt={name}
            width={85}
            height={85}
            key={i}
            className={
              url == item ? 'border-primary border-2 border-solid' : ''
            }
          />
        ))}
      </div>
    </div>
  )
}

export default ImageProduct
