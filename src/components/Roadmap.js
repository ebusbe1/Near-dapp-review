'use client';
import React from 'react';
import { ReactSVG } from 'react-svg';

const Roadmap = () => {
  return (
    <>
    <section className="hidden md:block text-white bg-darkBlue py-20 px-8">
     <ReactSVG
        src="/assets/comp.svg"
        beforeInjection={(svg) => {
          svg.setAttribute('style', 'width: 100%; height: auto;');
        }}
      />
    <div 
      className=" justify-center items-center"
      style={{ height: '100%',marginLeft:  150, marginTop: -50}}
    >
      <ReactSVG
        src="/assets/Roadmap1.svg"
        beforeInjection={(svg) => {
          svg.setAttribute('style', 'width: 95%; height: auto;');
        }}
      />
    </div>

    
  
  </section>


  <section className="block md:hidden text-white bg-darkBlue py-20 px-8">
     <ReactSVG
        src="/assets/comp.svg"
        beforeInjection={(svg) => {
          svg.setAttribute('style', 'width: 100%; height: auto;');
        }}
      />
      
      <div 
      className="flex justify-center items-center"
      style={{marginTop: 50}}
    >
      <ReactSVG
        src="/assets/Roadmap4.svg"
        beforeInjection={(svg) => {
          svg.setAttribute('style', 'width: 200px; height: auto;');
        }}
      />
    </div>
    <div 
      className=" flex justify-center items-center"
      style={{  marginTop: 50}}
    >
      <ReactSVG
        src="/assets/Roadmap5.svg"
        beforeInjection={(svg) => {
          svg.setAttribute('style', 'width: 350px; height: auto;');
        }}
      />
    </div>

    
  
  </section>
  </>
  );
};

export default Roadmap;
