'use client';
import React from 'react';
import { ReactSVG } from 'react-svg';

const Footer = () => {
  return (

    <>
    <footer className="hidden md:block bg-darkBlue py-6 px-8 text-white text-sm">
  <div className="container mx-auto flex justify-between items-center">
   
    <div className="flex items-center space-x-2">
    <ReactSVG
    src="/assets/logo2.svg"
    beforeInjection={(svg) => {
    svg.setAttribute('style', 'width: 100px; height: auto;');
    }}
  />
      {/* <div className="font-semibold">BitDegree</div>
      <div className="text-gray-400">WEB3 LEARNING HUB</div> */}
    </div>


    <div className="text-gray-400 text-xs text-right max-w-5xl">
  <p>
    © Near-Dapp-Review.org - Revolutionizing Digital Feedback with Blockchain Transparency | 
    <a href="mailto:partners@bitdegree.org" className="text-white">owners@Near-Dapp-Review.org</a>
  </p>
  <p className="mt-2">
    We strive to ensure that all feedback and reviews are as transparent and accurate as possible, but we cannot guarantee that all data is always up to date. Additional conditions may apply to user submissions. 
    <span className="font-semibold">Disclaimer:</span> Near-Dapp-Review operates on a decentralized platform, ensuring unbiased and tamper-proof feedback. However, Near-Dapp-Review does not endorse or recommend any particular product, service, or financial investment. The content published on this platform is not intended to serve as financial, legal, or professional advice. Always consult with a qualified advisor before making any decisions based on the feedback provided on Near-Dapp-Review.
</p>

</div>


  </div>
  <div className="bg-darkBlue text-white  text-center mt-20">
  <p>&copy; 2024 Near-Dapp-Review. All rights reserved.</p>
  </div>


</footer>

<footer className="block md:hidden bg-darkBlue py-6 px-8 text-white text-sm">
  <div className="container mx-auto flex-col justify-between items-center">
   
    <div className="flex  justify-center items-center space-x-2 mb-10">
    <ReactSVG
    src="/assets/logo2.svg"
    beforeInjection={(svg) => {
    svg.setAttribute('style', 'width: 80px; height: auto;');
    }}
  />
    
    </div>


    <div className="text-gray-400 text-xs text-center max-w-5xl mb-10">
  <p>
    © Near-Dapp-Review.org - Revolutionizing Digital Feedback with Blockchain Transparency | 
    <a href="mailto:partners@bitdegree.org" className="text-white">Near-Dapp-Review.org</a>
  </p>
  <p className="mt-2">
    We strive to ensure that all feedback and reviews are as transparent and accurate as possible, but we cannot guarantee that all data is always up to date. Additional conditions may apply to user submissions. 
    <span className="font-semibold">Disclaimer:</span> Near-Dapp-Review operates on a decentralized platform, ensuring unbiased and tamper-proof feedback. However, Near-Dapp-Review does not endorse or recommend any particular product, service, or financial investment. The content published on this platform is not intended to serve as financial, legal, or professional advice. Always consult with a qualified advisor before making any decisions based on the feedback provided on Near-Dapp-Review.
</p>

</div>


  </div>
  <div className="bg-darkBlue text-white  text-center">
  <p>&copy; 2024 Near-Dapp-Review. All rights reserved.</p>
  </div>


</footer>



</>

  );
};

export default Footer;
