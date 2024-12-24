'use client'
import { BillApi } from '@/api/BillFetcher'
import { IRootState } from '@/app/store/store'
import { Empty, Skeleton, message } from 'antd'
import React, { Suspense, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import OrderItem from './OrderItem'
import { usePathname } from 'next/navigation'
import OrderShopItem from './OrderShopItem'

type Props = {
  typeOrder: string
  searchKey: string
}

function OrderList({ typeOrder, searchKey }: Props) {
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<SuccessResponse<IOrder[]> | null>(null)
  const pathName = usePathname()

  const user_id = useSelector((state: IRootState) => state.user.userCurrent?.id)
  useEffect(() => {
    setLoading(true)

    let query: IQueryOrder = { searchKey: searchKey }

    if (typeOrder !== 'all' && typeOrder !== '') {
      query['status'] = typeOrder
    }

    if (pathName.split('/')[2] === 'order') {
      if (user_id) {
        BillApi.getAllMyBill(query)
          .then((d: SuccessResponse<IOrder[]>) => {
            setOrders(d)
            setLoading(false) // Set loading to false after fetching data
          })
          .catch((e) => {
            message.error(e)
            setLoading(false) // Set loading to false in case of error
          })
      }
    } else {
      if (user_id) {
        BillApi.getAllMyStoreBill(query)
          .then((d: SuccessResponse<IOrder[]>) => {
            setOrders(d)
            setLoading(false) // Set loading to false after fetching data
          })
          .catch((e) => {
            message.error(e)
            setLoading(false) // Set loading to false in case of error
          })
      }
    }
    setLoading(false)
  }, [typeOrder, searchKey])

  return (
    <>
      {loading && (
        <div className="w-full h-[500px]">
          <Skeleton active />
        </div>
      )}
      {!loading && orders && orders.data.length === 0 && <Empty />}
      {!loading &&
        orders &&
        orders.data.map((item) => (
          <Suspense fallback={<Skeleton avatar />}>
            {pathName.split('/')[2] === 'order' ? (
              <OrderItem item={item} key={item._id} />
            ) : (
              <OrderShopItem item={item} key={item._id} />
            )}
          </Suspense>
        ))}
    </>
  )
}

export default OrderList
