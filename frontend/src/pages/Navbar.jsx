import React, { useState, useEffect, useRef, useTransition } from "react";
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const navbarRef = useRef(null);
  const delta = 5;

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || 0;
      const navbar = navbarRef.current;

      if (!navbar) return;

      if (Math.abs(lastScrollTop - currentScroll) <= delta) return;

      if (currentScroll > lastScrollTop && currentScroll > navbar.offsetHeight) {
        navbar.style.transform = "translateY(-100%)";
      } else {
        navbar.style.transform = "translateY(0)";
      }

      setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
    };

    window.addEventListener("scroll", handleScroll);

    const navbar = navbarRef.current;
    if (navbar) {
      navbar.style.transition = "transform 0.3s ease";
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
    <>
      <nav ref={navbarRef} className="backdrop-filter backdrop-blur-lg bg-blue-900 bg-opacity-30 shadow-sm shadow-zinc-600 fixed w-full z-10 p-2">
        <div className="w-4/5 mx-auto px-6 py-3 flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2 text-2xl text-cyan-400">
            
          </a>

          <div className="space-x-20 text-xl">
            <ScrollLink to='about' className="hover:text-cyan-300 transition-colors cursor-pointer">About</ScrollLink>
            <ScrollLink to='highlights' className="hover:text-cyan-300 transition-colors cursor-pointer">Highlights</ScrollLink>
            <ScrollLink to='partners' className="hover:text-cyan-300 transition-colors cursor-pointer">Partners</ScrollLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;