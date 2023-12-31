import { useEffect, useState } from "react";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { onToTop } from "../../assets";

function DefaultLayout({ route, children }) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 800) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      <Header />
      <div className="pt-[72px] overflow-hidden">
        {children}
        {isVisible ? (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-10 flex justify-center items-center hover:scale-125"
          >
            <img src={onToTop} alt="" />
          </button>
        ) : (
          <></>
        )}
      </div>
      {route.layout !== "notFooter" ? <Footer /> : <></>}
    </div>
  );
}
export default DefaultLayout;
