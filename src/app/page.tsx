import MainHeader from './component/home/MainHeader'
import MainNav from './component/home/MainNav'

import ListItems from '@/app/component/ui/ListItems.jsx'

export default function Home() {
  return (
    <main className=" bg-gray1 h-full pb-9">
      <MainHeader />

      <MainNav />

      <div className=" bg-white w-[1280px] m-auto mt-8 pt-6 pb-0 border-solid border-[0.3px] border-gray-200 border-b-primary border-b-[4px]">
        <h3 className=" py-3 text-center text-primary  text-xl">
          GỢI Ý HÔM NAY
        </h3>
      </div>

      <ListItems buttonDelivery={true} />
    </main>
  )
}
