import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Newdrop from "./Newdrop";
import Footer from "./Footer";

export default function Hero() {
  const navigate=useNavigate();
  const handlecategory=(gender)=>{
    navigate(`/collection/${gender}`);

  }
  return (
    <>
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              Summer Styles Are Finally Here
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Explore our latest summer collection to find the perfect style for every occasion. Refresh your wardrobe with our new arrivals for this season.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          alt=""
                          src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <button
                 onClick={()=>handlecategory("male")}
                  className="inline-block rounded-lg bg-blue-600 px-8 py-3 text-center font-medium text-white hover:bg-blue-700 shadow-lg transform hover:scale-105 transition duration-300"
                >
                  Shop Men's Collection
                </button>
                <button
                  onClick={()=>handlecategory("female")}
                  className="inline-block rounded-lg bg-pink-600 px-8 py-3 text-center font-medium text-white hover:bg-pink-700 shadow-lg transform hover:scale-105 transition duration-300"
                >
                  Shop Women's Collection
                </button>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Newdrop/>
    <Footer/>
    </>
  );
}
