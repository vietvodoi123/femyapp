'use client'
import React, { useState } from 'react'
import { Upload as AntUpload } from 'antd'
import { LuImagePlus } from 'react-icons/lu'
import { storage } from '../../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

// const { Dragger } = Upload

const Upload1 = ({ multiple = false, imageUrl, setImageUrl }) => {
  const [loading, setLoading] = useState(false)
  // const [imageUrl, setImageUrl] = useState('')

  const uploadToFirebase = async (file, onSuccess) => {
    if (!file) return
    const storageRef = ref(storage, `posts/${file.name}`)

    const uploadTask = uploadBytesResumable(storageRef, file)

    // Theo dõi trạng thái tải lên
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Bạn có thể thêm logic để cập nhật tiến độ nếu muốn
      },
      (error) => {
        console.error('Error uploading file:', error)
        setLoading(false) // Tắt loading khi gặp lỗi
      },
      async () => {
        // Khi tải lên hoàn tất
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        console.log(url)

        setImageUrl(url)
        setLoading(false) // Tắt loading khi tải xong
        onSuccess('ok')
      },
    )
  }

  const customRequest = async ({ file, onSuccess }) => {
    setLoading(true)
    uploadToFirebase(file, onSuccess)
  }

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      setLoading(false)
      // uploadToFirebase(info.file.originFileObj) // Upload the file to Firebase
    }
  }

  const props = {
    name: 'file',
    multiple: multiple,
    onChange: handleChange,
    customRequest,
  }

  return (
    <AntUpload {...props}>
      <div className=" px-[300px] rounded-md border-base-03 py-3 flex bg-slate-100 items-center justify-center">
        {loading ? (
          <p className="text-center w-full">
            <AiOutlineLoading3Quarters size={24} className="animate-spin" />
            Đang tải lên...
          </p>
        ) : (
          <div>
            <p className="flex items-center justify-center">
              <LuImagePlus size={38} />
            </p>
            <p className="ant-upload-text text-center font-semibold">
              Bấm hoặc kéo thả hình ảnh mô tả bài viết vào đây
            </p>
            <p className="ant-upload-hint text-center">
              Chỉ tải lên duy nhất 1 hình ảnh mô tả đại diện cho bài viết
            </p>
          </div>
        )}
      </div>
    </AntUpload>
  )
}

export default Upload1
