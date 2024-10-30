'use client';
import React from 'react';
import { ReactSVG } from 'react-svg';
import { useRouter,  } from 'next/navigation';
import Link from 'next/link';

const Hero = () => {
    const navigate =  useRouter();
  return (
    <>
    <section className="hidden md:block text-white bg-darkBlue py-20 px-8">
    <div
      className="flex flex-row flex-wrap justify-center items-center gap-28"
      style={{ marginLeft: 0 }}
    >
      <div className="flex flex-col items-center text-center" >
        <div style={{}}>
        <ReactSVG src="/assets/world.svg" beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 800px; height: 800px;');
      }} />
        </div>
     <div style={{marginTop : -500 ,marginBottom: 10}}>
     <ReactSVG src="/assets/Tron.svg" beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 300px; height: auto;');
      }} />
     </div>
    
        <p className="text-lg mb-8" style={{ width: 700, fontSize: 17 }}>
        Near-Dapp-Review is a blockchain-based platform designed to capture and authenticate user feedback on products and services. By leveraging decentralized technology, Near-Dapp-Review ensures that all reviews are transparent, tamper-proof, and reflective of genuine user experiences
        </p>
        <Link href={"/upload"} className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg font-medium" style={{borderRadius: 50, fontSize: 14}}>
          Get Started
        </Link>
      </div>
  
      <div style={{ marginTop: -10, marginRight: 90 }}>
        <ReactSVG src="/assets/imagex.svg" />
      </div>
    </div>
    
    
         <div 
  className="flex flex-col justify-center items-center"
  style={{  marginTop: 150  }}  // Full viewport height
>
<ReactSVG 
      src="/assets/Powered.svg"
      beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 100px; height: auto;');
      }} 
    />

</div>


      <div className="flex flex-wrap justify-center items-center space-x-6 ">

 
  <div style={{ marginTop: 0,  }}>
    <ReactSVG 
      src="/assets/tronlogo.svg"   
      beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 220px; height: auto;');
      }} 
    />
  </div>
  <div style={{ marginTop: 0, }}>
    <ReactSVG 
      src="/assets/google_cloud.svg"  
      beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 250px; height: auto;');
      }} 
    />
  </div>
  
</div>

      
  </section>


<section className="block md:hidden text-white bg-darkBlue py-20 px-8">
    <div
      className="flex flex-row flex-wrap justify-center items-center gap-28"
      style={{ marginLeft: 0 }}
    >
      <div className="flex flex-col items-center text-center" >
        <div style={{marginTop: -100}}>
        <ReactSVG src="/assets/world.svg" beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 350px; height: 350px;');
      }} />
        </div>
     <div style={{marginTop : -230,marginBottom: 10}}>
     <ReactSVG src="/assets/Tron.svg" beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 200px; height: auto;');
      }} />
     </div>

        <p className="text-s mb-8" style={{ width: 300, fontSize: 13 }}>
        Near-Dapp-Review is a blockchain-based platform designed to capture and authenticate user feedback on products and services. By leveraging decentralized technology, Near-Dapp-Review ensures that all reviews are transparent, tamper-proof, and reflective of genuine user experiences
        </p>
        <Link href={"/upload"} className="bg-green-500 text-white py-2 px-6 rounded-lg text-lg font-medium" style={{borderRadius: 50, fontSize: 12}}>
          Get Started
        </Link>
      </div>
  
      <div style={{ marginTop: -120, marginRight: 20 }}>

        <ReactSVG src="/assets/imagex.svg" beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 350px; height: auto;');
      }} />
      </div>
    </div>
    
  
         <div 
  className="flex flex-col justify-center items-center"
  style={{  marginTop: 50 }}  // Full viewport height
>
<ReactSVG 
      src="/assets/Powered.svg"
      beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 80px; height: auto;');
      }} 
    />

</div>


      <div className="flex flex-wrap justify-center items-center space-x-6 ">

  
 
  <div style={{ marginTop: 10,  }}>
    <ReactSVG 
      src="/assets/tronlogo.svg"   
      beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 120px; height: auto;');
      }} 
    />
  </div>
  <div style={{ marginTop: 10, }}>
    <ReactSVG 
      src="/assets/google_cloud.svg"  
      beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 150px; height: auto;');
      }} 
    />
  </div>
  
</div>

      
  </section>

</>
  
  );
};

export default Hero;
