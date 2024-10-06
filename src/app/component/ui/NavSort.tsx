'use client'
import { Button, Pagination, Select } from 'antd'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
  page: number
  totalPages: number
  width?: number
}

function NavSort({ page, width, totalPages }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateQuery = (
    newQuery: Record<string, string | number | undefined>,
  ) => {
    const queryParams = new URLSearchParams(searchParams.toString())

    // Update or add new query params
    Object.keys(newQuery).forEach((key) => {
      if (newQuery[key] !== undefined) {
        queryParams.set(key, String(newQuery[key]))
      } else {
        queryParams.delete(key)
      }
    })

    router.push(`?${queryParams.toString()}`)
  }

  const currentSort = searchParams.get('sortBy')
  const currentOrder = searchParams.get('sortOrder')

  // Điều kiện sắp xếp cho giá
  const handlePriceSort = (order: string) => {
    let sortBy = currentSort || ''
    let sortOrder = currentOrder || ''

    // Nếu sortBy đã có 'unitsSold' và 'price', chỉ thay đổi thứ tự của 'price'
    if (sortBy.includes('unitsSold') && sortBy.includes('price')) {
      // Tìm vị trí của 'price' trong chuỗi sortBy
      const sortByArray = sortBy.split(',')
      const sortOrderArray = sortOrder.split(',')

      // Thay đổi thứ tự sắp xếp của 'price' nhưng giữ nguyên 'unitsSold'
      const priceIndex = sortByArray.indexOf('price')
      sortOrderArray[priceIndex] = order

      // Cập nhật lại sortOrder
      sortOrder = sortOrderArray.join(',')
    } else {
      // Nếu chưa có 'price', thêm 'price' vào sau 'unitsSold'
      sortBy = sortBy.includes('unitsSold') ? `${sortBy},price` : 'price'
      sortOrder = sortOrder ? `${sortOrder},${order}` : order
    }

    updateQuery({ sortBy, sortOrder })
  }

  return (
    <div
      className={`bg-white w-[${
        width || '1280'
      }px] mx-auto flex justify-start items-center p-5 gap-5 text-sm border-solid border-[0.3px] border-gray-200`}
    >
      <p>Sắp xếp theo:</p>

      {/* Phổ Biến: không có điều kiện sắp xếp */}
      <Button
        size="large"
        onClick={() => updateQuery({ sortBy: undefined, sortOrder: undefined })}
        className={
          !currentSort?.includes('unitsSold')
            ? 'bg-red-100 border-solid border-[3px] border-red-500 text-red-500'
            : ''
        }
      >
        Phổ Biến
      </Button>

      {/* Bán Chạy: sắp xếp theo unitsSold giảm dần */}
      <Button
        size="large"
        onClick={() => updateQuery({ sortBy: 'unitsSold', sortOrder: 'desc' })}
        className={
          currentSort?.includes('unitsSold')
            ? 'bg-red-100 border-solid border-[3px] border-red-500 text-red-500'
            : ''
        }
      >
        Bán Chạy
      </Button>

      {/* Giá: sắp xếp theo giá */}
      <div className="flex justify-start items-center gap-5">
        <p>Giá: </p>
        <Select
          defaultValue="1"
          onChange={(e: string) => handlePriceSort(e)}
          value={
            currentSort?.includes('price')
              ? currentOrder?.split(',')[
                  currentSort.split(',').indexOf('price')
                ]
              : '1'
          }
          options={[
            { value: '1', label: 'Sắp xếp theo giá' }, // Không có điều kiện sắp xếp
            { value: 'asc', label: 'Giá: Thấp đến cao' }, // Sắp xếp tăng dần
            { value: 'desc', label: 'Giá: Cao đến thấp' }, // Sắp xếp giảm dần
          ]}
          style={{ width: '200px' }}
          size="large"
        />
      </div>

      {/* Pagination */}
      <Pagination
        simple
        defaultCurrent={1}
        pageSize={18}
        current={page}
        total={totalPages * 10}
        onChange={(pages: number) => {
          updateQuery({ page: pages })
        }}
        className="ml-auto"
      />
    </div>
  )
}

export default NavSort
