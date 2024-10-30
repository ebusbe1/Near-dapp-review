"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback,useContext } from "react";
import Link from 'next/link';
import { ReactSVG } from "react-svg";

import { useRouter } from 'next/navigation';


import Image from 'next/image';

import { NearContext } from '@/context';
import NearLogo from '/public/near-logo.svg';


import Modal from "react-modal";

const Header = ({ page }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [modalIsOpen, setModalIsOpen] = useState(false);
 const [connected2, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [availableWallets, setAvailableWallets] = useState("");
  const menuRef = useRef(null);
  const navigate =  useRouter();

  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState(() => { });
  const [label, setLabel] = useState('Loading...');

  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => wallet.signOut);
      setLabel(`Disconnect ${signedAccountId}`);
    } else {
      setAction(() => wallet.signIn);
      setLabel('Connect wallet');
    }
  }, [signedAccountId, wallet]);


  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleNavClick = (path) => {
    setActiveLink(path);
    setMenuOpen(false);
  };

  const linkStyle = (path) => (path === activeLink ? "text-green-500" : "hover:text-green-500");

  // Load connection state from localStorage on initial render
  useEffect(() => {
    const storedConnected = localStorage.getItem("connected") === "true";
    const storedWalletAddress = localStorage.getItem("walletAddress");

    if (storedConnected && storedWalletAddress) {
      setConnected(true);
      setWalletAddress(storedWalletAddress);
    }
  }, []);

  return (
    <header className="py-6 px-8 bg-darkBlue text-white">
    <div className="flex justify-between items-center relative">
        <ReactSVG
          src="/assets/logo2.svg"
          beforeInjection={(svg) => {
            svg.setAttribute("style", "width: 80px; height: auto;");
          }}
        />

        {isMobile ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-3xl focus:outline-none"
            >
              &#9776;
            </button>
            {menuOpen && (
              <nav className="absolute right-0 mt-2 py-2 w-48 bg-white text-darkBlue rounded-lg shadow-lg">
               
                <Link
                  href="/"
                  className={`block px-4 py-2 ${linkStyle("/")} flex justify-center`}
                  onClick={() => {handleNavClick("/")}}
                >
                  Home
                </Link>
           <Link
                  //href="/product"
                  href="/product"
                  className={`block px-4 py-2 ${linkStyle("/product")} flex justify-center`}
                  onClick={() => {handleNavClick("/product");}}
                >
                  Product & Reviews
                </Link>
                
                <Link
                  //href="/upload"
                  href="/upload"
                  className={`block px-4 py-2 ${linkStyle("/upload")} flex justify-center`}
                  onClick={() => {handleNavClick("/upload"); }}
                >
                  Create
                </Link>
                <div className="flex justify-center">
                <div className='navbar-nav pt-1'>
          <button style={{background: "#32CD32", width: '80%', alignSelf: "center"}} className="btn btn-secondary" onClick={action} > {label} </button>
        </div>
                </div>
              </nav>
            )}
          </div>
        ) : (
          <>
           
            <div className=" flex justify-center">
              {/* <nav className="space-x-10"> */}
              <nav className="space-x-10 z-10">
                <Link
                  href="/"
                  className={page === "home" ? "text-green-500" : "hover:text-green-500"}
                  onClick={() => handleNavClick("/")}
                >
                  Home
                </Link>
                <Link
                  href="/product"
                  className={page === "product" ? "text-green-500" : "hover:text-green-500"}
                  onClick={() => {handleNavClick("/product")}}
                >
                  Product & Reviews
                </Link>


                <Link
                  href="/upload"
                  className={page === "upload" ? "text-green-500" : "hover:text-green-500"}
                  onClick={() => handleNavClick("/upload")}
                >
                  Create
                </Link>
              </nav>
            </div>
            <div className="flex justify-end">
            <div className='navbar-nav pt-1'>
          <button style={{background: "#32CD32"}} className="btn btn-secondary " onClick={action} > {label} </button>
        </div>
            </div>
          </>
        )}
      </div>
   
    </header>
  );
};

export default Header;




