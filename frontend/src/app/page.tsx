import Image from "next/image";
import Navbar from "../app/Components/navabar"
import Slider from "../app/Components/slider"
import ds from "../app/images/122.png"

export default function Home() {
  return (
    <div className="bg-white">
    <Navbar />
    <div className="w-full h-[91vh] overflow-y-auto scrollbar-none" >
    <Slider/>
      <Image src={ds}  width={1536} height={3732} alt=""/>
    </div>
  </div>
  );
}
