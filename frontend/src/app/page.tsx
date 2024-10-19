import Image from "next/image";
import Navbar from "../app/Components/navabar"
import OfferSection from "../app/Components/OfferSection"
import Footer from "../app/Components/Footer"
import Slider from "../app/Components/slider"
import Element from "../app/Components/element"
import ds from "../app/images/122.png"
export default function Home() {
  return (
    <div className="bg-white">
      {/* <Element img="https://rukminim2.flixcart.com/flap/128/128/image/50474c.jpg?q=100" title="Staples"/> */}
    <Navbar />
    <Slider/>
    <Image src={ds}  width={1536} height={3732} alt=""/>
    {/* <OfferSection title="Food Essentials" offer="Up to 60% OFF" items={[
      { name: "Aashirvaad Flour", img: "https://www.jiomart.com/images/product/original/490000041/aashirvaad-shudh-chakki-atta-10-kg-product-images-o490000041-p490000041-0-202401260851.jpg?im=Resize=(420,420)", offer: "Up to 60% OFF" },
      { name: "Oil", img: "https://m.media-amazon.com/images/I/61Jb7TOqaeL.jpg", offer: "Up to 25% OFF" },
      { name: "Masala & Spices", img: "https://www.jiomart.com/images/product/original/490000041/aashirvaad-shudh-chakki-atta-10-kg-product-images-o490000041-p490000041-0-202401260851.jpg?im=Resize=(420,420)", offer: "20% OFF" },
    ]} />

    <OfferSection title="Personal Care" offer="Up to 40% OFF" items={[
      { name: "Shampoos", img: "/path_to_image", offer: "Up to 40% OFF" },
      { name: "Oral Care", img: "/path_to_image", offer: "10-25% OFF" },
      { name: "Herbal Products", img: "/path_to_image", offer: "Up to 25% OFF" },
    ]} />

    <OfferSection title="Household Care" offer="Up to 30% OFF" items={[
      { name: "Pooja Needs", img: "/path_to_image", offer: "Up to 20% OFF" },
      { name: "Cleaning Essentials", img: "/path_to_image", offer: "Up to 20% OFF" },
      { name: "Detergents", img: "/path_to_image", offer: "Up to 30% OFF" },
    ]} />

    <Footer /> */}
  </div>
  );
}
