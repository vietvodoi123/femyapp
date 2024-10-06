'use client'
import Link from 'next/link'
import List from './List'
import React, { ChangeEvent, Suspense, useEffect, useState } from 'react'
import Search from 'antd/es/input/Search'
import { IoSearch } from 'react-icons/io5'
import User from './User'
import { Button, Spin, message } from 'antd'
import { ItemsApi } from '@/api/ItemsFetccher'
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'

type Props = {}

function Headers({}: Props) {
  const [searchLists, setSearchList] =
    useState<{ id: string; name: string }[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')

  const router = useRouter()
  const pathName = usePathname()
  const params = useParams()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)

    setLoading(true)
    ItemsApi.getItems({ name: e.target.value, pageSize: 9 })
      .then((d: ApiResponse<IItem[]>) => {
        if ('data' in d) {
          const arr = d.data.map((item) => {
            return {
              id: item._id,
              name: item.name,
            }
          })
          setSearchList(arr)
        }
      })
      .catch((e) => message.error(e))
    setLoading(false)
  }
  const handleSearch = (value: string) => {
    router.push(`/daily_discovery/?search=${value}`)
  }
  return (
    <header className=" pt-3 pb-1 border-b-[#ccc] border-b-[1px] bg-primary text-white relative">
      <div className="m-auto w-[1280px] h-[50px] text-base flex justify-between items-center ">
        <Link href="/" className=" mr-3">
          <h1 className=" text-2xl text-start">MYSHOP</h1>
        </Link>
        <Search
          onSearch={handleSearch}
          onChange={handleChange}
          loading={loading}
          onFocus={() => setOpen(true)}
          // onBlur={() => setOpen(false)}
          placeholder="Miễn Phí Ship 0đ - Mua Ngay!"
          enterButton={
            <Button loading={loading}>
              <IoSearch className=" text-lg text-white" />
            </Button>
          }
          className=" w-full"
        />
        <List />
        <Suspense fallback={<p>loading...</p>}>
          <User />
        </Suspense>
      </div>
      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className=" absolute left-[230px] text-gray-500 top-full bg-white w-[430px] z-10 text-sm py-3 px-4 rounded-md shadow-md"
        >
          <div className="flex items-center gap-6 mb-3 ">
            <p>Tìm kiếm:</p>
            <p>"{searchValue}"</p>
          </div>
          {loading && <Spin />}
          {!loading &&
            searchLists &&
            searchLists.map((item) => (
              <Link
                href={`/product/${item.id}`}
                key={item.id}
                className=" hover:bg-gray1 block mb-1 whitespace-nowrap overflow-hidden py-2"
              >
                {item.name}
              </Link>
            ))}
        </div>
      )}
    </header>
  )
}

export default Headers
