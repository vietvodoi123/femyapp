'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Empty, Pagination, Skeleton, Spin, message } from 'antd'
import { ItemsApi } from '@/api/ItemsFetccher'
import Item from './Item'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import NavSort from './NavSort'

interface Props {
  pagination?: boolean
  pageSize?: number
  nav?: boolean
  col?: number
  width?: number
  category?: string
}

function ListItems({ pagination, nav, pageSize, col, width, category }: Props) {
  const isPagi = pagination ? true : false

  const param = useParams()
  const searchParams = useSearchParams()
  const searchKey = searchParams.get('search')
  const sortBy = searchParams.get('sortBy') || undefined
  const sortOrder = searchParams.get('sortOrder') || ''

  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<SuccessResponse<IItem[]>>({
    data: [],
    page: 1,
    pageSize: pageSize || 18,
    totalPages: 0,
    totalRecords: 0,
  })

  const fetchData = useCallback(async () => {
    setLoading(true)

    const query: IGetItems = {
      page: items.page,
      pageSize: items.pageSize,
      sortBy: sortBy,
      sortOrder: sortOrder,
    }

    if (param && 'slug' in param) {
      query['category'] = decodeURIComponent(param['slug'][0])
    } else {
      if (typeof category === 'string') {
        if (category === 'all') {
          query['category'] = ''
        } else {
          query['category'] = category
        }
      }
    }

    if (param && 'shopId' in param) {
      query['creatorId'] = param['shopId'][0]
      query.sortBy = 'unitsSold'
      query.sortOrder = 'desc'
      if (!pageSize) {
        query.pageSize = 12
      }
    }

    if (searchKey) {
      query['name'] = decodeURIComponent(searchKey)
    }

    try {
      const data = await ItemsApi.getItems(query)
      setItems(data)
    } catch (error) {
      message.error('Failed to fetch items')
    }

    setLoading(false)
  }, [
    items.page,
    items.pageSize,
    sortBy,
    sortOrder,
    param,
    category,
    searchKey,
  ])

  // Fetch data when component mounts or query parameters change
  useEffect(() => {
    fetchData()
  }, [fetchData, searchParams])

  const handleChangePage = (page: number, pageSize: number) => {
    setItems((prevItems) => ({
      ...prevItems,
      page: page,
      pageSize: pageSize,
    }))
  }

  return (
    <section className=" pt-5">
      {(param['slug'] || nav) && (
        <NavSort
          page={items.page}
          totalPages={items.totalPages}
          width={width}
        />
      )}
      {searchKey && (
        <div className="w-[1280px] m-auto flex items-center gap-3  my-5 text-lg">
          <p className=" flex items-center gap-3">
            <IoIosInformationCircleOutline className=" text-xl" />
            Kết quả tìm kiếm cho từ khóa:
          </p>
          <span className=" text-red-500">"{searchKey}"</span>
        </div>
      )}
      <div
        className={`w-[${width || 1280}px]  ${
          col ? `grid-cols-5` : 'grid-cols-6'
        } gap-3 mt-8 mx-auto ${!loading ? 'grid' : 'flex justify-center items-start h-[200px]'}`}
      >
        {loading && <Spin size="large" />}
        {!loading && items.data && items.data.length === 0 && <Empty />}
        {!loading && items.data && items.data.length !== 0 && (
          <>
            {items.data.map((item) => (
              <Item item={item} />
            ))}
          </>
        )}
      </div>
      {isPagi && (
        <div
          className={` w-[${
            width || 1280
          }px] mx-auto flex justify-center items-center mt-5 `}
        >
          <Pagination
            pageSize={18}
            total={items.totalPages * 10}
            current={items.page}
            onChange={handleChangePage}
          />
        </div>
      )}
    </section>
  )
}

export default ListItems
