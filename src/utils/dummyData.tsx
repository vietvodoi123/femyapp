import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
import { BsFillHandbagFill } from "react-icons/bs";
import { MdHealthAndSafety } from "react-icons/md";
import { GiDiamondRing } from "react-icons/gi";
import { FaBookOpen } from "react-icons/fa";
import { IoMdWatch } from "react-icons/io";
import { MdPhoneAndroid } from "react-icons/md";
import { RiEBikeFill } from "react-icons/ri";
import { IoFootball } from "react-icons/io5";
import { GiConverseShoe } from "react-icons/gi";
import { FaComputer } from "react-icons/fa6";
import { GiClothes } from "react-icons/gi";
import { MdLocalGroceryStore } from "react-icons/md";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { PiDogFill } from "react-icons/pi";
import { FaCamera } from "react-icons/fa";
import { GiLipstick } from "react-icons/gi";
import { FaHouse } from "react-icons/fa6";
import { LuMilk } from "react-icons/lu";
import { MdOutlineSmartToy } from "react-icons/md";
export const items = [
  {
    key: "clothes",
    label: "Thởi Trang",
    icon: <GiClothes className="text-2xl" />,
    // className:"hover:text-blue-500 border-solid border-[1px] border-blue-500"
  },
  {
    key: "phone",
    label: "Điện Thoại Và Máy Tính Bảng",
    icon: <MdPhoneAndroid className="text-2xl" />,
  },

  {
    key: encodeURIComponent("laptop and PC"),
    label: "Máy Tính PC",
    icon: <FaComputer className="text-2xl" />,
  },
  {
    key: "watch",
    label: "Đồng Hồ",
    icon: <IoMdWatch className="text-2xl" />,
  },
  {
    key: "shoes",
    label: "Giày Dép",
    icon: <GiConverseShoe className="text-2xl" />,
  },
  {
    key: "sport",
    label: "Thể Thao và Du Lịch",
    icon: <IoFootball className="text-2xl" />,
  },
  {
    key: encodeURIComponent("car, bike and bike circle"),
    label: "Ô Tô, Xe Máy và Đạp Điện",
    icon: <RiEBikeFill className="text-2xl" />,
  },
  {
    key: "grocery",
    label: "Bách Hóa",
    icon: <MdLocalGroceryStore className="text-2xl" />,
  },
  {
    key: "beautify",
    label: "Làm Đẹp",
    icon: <GiLipstick className="text-2xl" />,
  },
  {
    key: "bag",
    label: "Túi Xách",
    icon: <BsFillHandbagFill className="text-2xl" />,
  },
  {
    key: "health",
    label: "Sức Khỏe",
    icon: <MdHealthAndSafety className="text-2xl" />,
  },
  {
    key: "book",
    label: "Nhà Sách",
    icon: <FaBookOpen className="text-2xl" />,
  },
  {
    key: "home",
    label: "Nhà Cửa và Đời Sống",
    icon: <FaHouse className="text-2xl" />,
  },
  {
    key: encodeURIComponent("mon and baby"),
    label: "Mẹ và Bé",
    icon: <LuMilk className="text-2xl" />,
  },
  {
    key: encodeURIComponent("electrical equipment"),
    label: "Thiết Bị Điện Tử",
    icon: <PiTelevisionSimpleBold className="text-2xl" />,
  },
  {
    key: "camera",
    label: "Máy Ảnh, Máy Quay Phim",
    icon: <FaCamera className="text-2xl" />,
  },
  {
    key: "jewelry",
    label: "Phụ Kiện và Trang Sức",
    icon: <GiDiamondRing className="text-2xl" />,
  },
  {
    key: "toys",
    label: "Đồ Chơi",
    icon: <MdOutlineSmartToy className="text-2xl" />,
  },
  {
    key: "pets",
    label: "Thú Cưng",
    icon: <PiDogFill className="text-2xl" />,
  },
  {
    key: "other",
    label: "Dụng Cụ, Thiết Bị Tiện Ích",
    icon: <HiMiniWrenchScrewdriver className="text-2xl" />,
  },
];
