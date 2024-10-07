'use client'
import { ItemsApi } from '@/api/ItemsFetccher'
import { useState, useEffect } from 'react'
import Item from '../ui/Item'

const MoreProducts = (creatorId) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()

  useEffect(() => {
    setLoading(true)
    ItemsApi.getItems({ creatorId: creatorId.creatorId }).then((data) => {
      if ('data' in data) {
        setData(data.data)
      } else {
        notification.error({
          message: 'Có Lỗi Xảy Ra!',
          description: 'Lỗi Items Gợi Ý Hôm Nay',
        })
      }
    })
    setLoading(false)
  }, [])
  return (
    <div className="  flex flex-col gap-3  min-w-[200px]">
      <h3 className="bg-white p-3 text-sm font-medium border-base-03">
        CÁC SẢN PHẨM KHÁC
      </h3>
      {loading && <Skeleton />}
      {!loading && data && data.slice(0, 2).map((item) => <Item item={item} />)}
    </div>
  )
}

export default MoreProducts
