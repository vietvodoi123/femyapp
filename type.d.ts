interface IUser {
  email: string
  password: string
  fullName: string
  avatar: string
}
interface Auth {
  id: string
  email?: string
  token?: string
  avatar?: string
  status?: string
  fullName?: string
}
interface IUpdated {
  message: string
  user: Auth
}
interface UserData {
  id: number
  fullName: string
  email: string
  avatar: string
}

interface ILoginBody {
  email: string
  password: string
}

type ThemeType = 'light' | 'dark'
interface MeData {
  id: number
  email: string
  avatar: string
  fullName: string
}
interface IUserCreate {
  avatar?: string
  email: string
  fullName: string
  password: string
}

interface SuccessResponse<T> {
  data: T
  page: number
  pageSize: number
  totalPages: number
  totalRecords?: number
}
interface ErrorResponse {
  code: string
  error: string
  message: string
  errors: Array<{ error: string; field: string }>
  traceId: string
}
interface Message {
  message: string
}
type ApiResponse<T> = SuccessResponse<T> | ErrorResponse

interface ICreateItem {
  name: string
  long_desc: string
  short_desc: string
  category: string
  price: number
  countInStock: number
  imageUrl: string[]
  unitsSold?: number
  rating?: number
  discount?: number
  creatorId?: string
}
interface IItem {
  _id: string
  name: string
  long_desc: string
  short_desc: string
  category: string
  price: number
  countInStock: number
  imageUrl: string[]
  unitsSold?: number
  rating?: number
  discount?: number
  creatorId?: string
}
interface ICreatorInfor {
  id: string
  fullName: string
  email: string
  avatar: string
}
interface IItemAndCreator extends IItem {
  creatorInfo: ICreatorInfor
}
interface IPage {
  page: number
  pageSize: number
  totalPages: number
  totalRecords?: number
}

interface IMes {
  message: string
}
interface IError {
  error: string
}

interface IGetItems {
  page?: number
  pageSize?: number
  name?: string
  category?: string
  creatorId?: string
  sortBy?: string | null
  sortOrder?: string
}
interface IUpdateMe {
  fullName?: string
  avatar?: string
}
interface IUpdateItemOptions {
  itemUpdate?: IItem
  setItemUpdate: (value: IItem) => void
  setItemForUpdate: (value: IItem) => void
}

interface IReviews {
  data: IReview[]
  page: number
  pageSize: number
  totalPages: number
}
interface IReview {
  productId: string
  reviewId: string
  user: {
    avatar: string
    fullName: string
  }
  rating: number
  comment: string
  date: Date
}

interface Cart {
  userId: string
  cartId: string
  items: [
    {
      item: IItem[]
      quantity: number
      shop: {
        id: string
        fullName: string
      }
    },
  ]
  status: string
  isPaid: boolean
}
interface IItemsCart extends IItem {
  quantity: number
  shop: {
    id: string
    name: string
  }
}
interface ICart {
  data: IItemsCart[]
}
interface CartItem {
  key: string
  name: { id: string; name: string; imageUrl: string[] }
  shop: {
    id: string
    name: string
  }
  price: number
  quantity: number
  totals: number
  category: string
}
interface ITotal {
  total: number
  totalPrice: number
  items: CartItem[]
}

interface IShip {
  name: string
  id: string
  type: string
  price: number
}
interface IBill {
  products: { product: string; quantity: number }[]
  totalPrice: number
  paymentMethod: string
  address: string
  phone: string
  buyer: string
  seller: string
  shippingMethod: IShip
  voucher?: string
  comment: string
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
}

interface IShopInfor {
  id: string
  name: string
  avatar: string
  productCount: number
  totalUnitsSold: number
  productCategories: string[]
}
interface IOrder {
  _id: string
  products: { product: IItem; quantity: number }[]
  totalPrice: number
  paymentMethod: string
  phone: string
  address: string
  buyer:
    | string
    | {
        _id: string
        fullName: string
      }
  seller:
    | {
        _id: string
        fullName: string
      }
    | string
  shippingMethod: IShip
  voucher?: string
  comment: string
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
}
interface IQueryOrder {
  page?: number
  status?: string
  searchKey?: string
  status?: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
}

interface ICreateReview {
  product_id: string[]
  user_id: string
  rating: number
  comment: string
}
interface IReview {
  product_id: string[]
  user_id: string
  rating: number
  comment: string
  _id: string
  date: Date
}
