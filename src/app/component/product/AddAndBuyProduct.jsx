'use client'
import { InputNumber, Button, message } from 'antd'
import React, { useState } from 'react'
import { BsCartPlus } from 'react-icons/bs'
import { CartApi } from '@/api/CartFetcher'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { setCheckout } from '@/app/store/slice/CartSlice'

const AddAndBuyProduct = ({ item }) => {
  const dispatch = useDispatch()
  const route = useRouter()
  const user = useSelector((state) => state.user.userCurrent)
  const [loading, setLoading] = useState(false)
  const [quantity, setQuantyti] = useState(1)
  const user_id = useSelector((state) => state.user.userCurrent?.id)

  const addItemToCart = () => {
    setLoading(true)
    if (user_id && item._id) {
      CartApi.addItemToCart({
        user_id: user_id,
        product_id: item._id,
        quantity: quantity || 1,
      })
        .then((d) => {
          message.success(d.message)
        })
        .catch((e) => {
          message.error(e)
        })
    } else {
      message.warning('Hãy đăng nhập để tiếp tục')
      setTimeout(() => {
        route.push('/login')
      }, 1000)
    }
    setLoading(false)
  }

  const handleBuying = () => {
    if (user) {
      dispatch(
        setCheckout([
          {
            key: item.name,
            name: { id: item._id, name: item.name, imageUrl: item.imageUrl },
            shop: { id: item.creatorInfo.id, name: item.creatorInfo.fullName },
            quantity: quantity,
            price: item.price,
            totals: item.price * quantity,
            category: item.category,
          },
        ]),
      )
      route.push('/checkout')
    }
  }
  return (
    <>
      <div className="flex items-center gap-5 text-sm my-7">
        <p>Số Lượng:</p>
        <InputNumber
          min={1}
          defaultValue={1}
          onChange={(e) => {
            if (e) {
              setQuantyti(e)
            }
          }}
          size="large"
        />
        <span>{item.countInStock} sản phẩm có sẵn</span>
      </div>
      <div>
        <Button
          icon={<BsCartPlus />}
          size="large"
          onClick={addItemToCart}
          loading={loading}
          className=" bg-red-100 mr-5 border-red-500 border-solid border-[2px] text-red-500"
        >
          Thêm Sản Phẩm Vào Giỏ
        </Button>
        <Button
          className=" bg-red-500 text-white hover:text-white"
          size="large"
          onClick={handleBuying}
        >
          Mua Ngay
        </Button>
      </div>
    </>
  )
}

export default AddAndBuyProduct
