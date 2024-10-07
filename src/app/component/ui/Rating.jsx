'use client'
import { Rate } from 'antd'
import React from 'react'

const Rating = ({ rating }) => {
  return <Rate allowHalf value={rating === 0 ? 5 : rating} disabled />
}

export default Rating
