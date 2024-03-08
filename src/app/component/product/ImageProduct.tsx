"use client";

import React, { useState } from "react";
import Image from "next/image";
type Props = {
  imageUrl: string[];
  name: string;
};

function ImageProduct({ imageUrl, name }: Props) {
  const [url, setUrl] = useState<string>(imageUrl[0]);
  return (
    <div className=" w-[450px]">
      <Image src={url} alt={name} width={450} height={450} />
      <div className=" flex flex-wrap gap-3 justify-between mt-2">
        {imageUrl.map((item, i) => (
          <Image
            onMouseEnter={() => setUrl(item)}
            onClick={() => setUrl(item)}
            src={item}
            alt={name}
            width={85}
            height={85}
            key={i}
            className=" hover:border-blue-500 hover:border-[2px] hover:border-solid"
          />
        ))}
      </div>
    </div>
  );
}

export default ImageProduct;
