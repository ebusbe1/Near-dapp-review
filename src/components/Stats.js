'use client';
import React from 'react';
import { ReactSVG } from 'react-svg';

const HowItWorks = () => {
  return (
    <>
    <section className="hidden md:block text-white bg-darkBlue py-20 px-8">
     <ReactSVG
        src="/assets/comp2.svg"
        beforeInjection={(svg) => {
          svg.setAttribute('style', 'width: 100%; height: auto;');
        }}
      />
   <div 
  className="flex flex-col justify-center items-center"
  style={{  marginTop: -220,  }}  // Full viewport height
>
  <ReactSVG
    src="/assets/HIWs.svg"
    // beforeInjection={(svg) => {
    //   svg.setAttribute('style', 'width: 15%; height: auto;');
    // }}
  />

</div>
<div 
  className="flex justify-center items-center"
  style={{ marginTop: 100 }}
>
  <ReactSVG
    src="/assets/HIWs2.svg"
    beforeInjection={(svg) => {
    svg.setAttribute('style', 'width: 700px; height: auto;');
    }}
  />
</div>





    
  
  </section>

  <section className="block md:hidden text-white bg-darkBlue py-20 px-8">
     <ReactSVG
        src="/assets/comp2.svg"
        beforeInjection={(svg) => {
          svg.setAttribute('style', 'width: 100%; height: auto;');
        }}
      />
   <div 
  className="flex flex-col justify-center items-center"
  style={{  marginTop: -120,  }}  // Full viewport height
>
  <ReactSVG
    src="/assets/HIWs.svg"
    beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 150px; height: auto;');
    }}
  />

</div>
<div 
  className="flex justify-center items-center"
  style={{ marginTop: 40 }}
>
  <ReactSVG
    src="/assets/HIWs4.svg"
    beforeInjection={(svg) => {
    svg.setAttribute('style', 'width: 290px; height: auto;');
    }}
  />
</div>





    
  
  </section>

  </>
  
  );
};

export default HowItWorks;
