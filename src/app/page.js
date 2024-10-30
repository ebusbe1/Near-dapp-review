import Image from 'next/image';

import NearLogo from '/public/near.svg';
import NextLogo from '/public/next.svg';
import styles from './app.module.css';
import { Cards } from '@/components/cards';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Statistics from '@/components/Stats';
import Roadmap from '@/components/Roadmap';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    // <main className={styles.main}>
       <div className=" text-white bg-darkBlue ">
      <Header page={"home"} />
      <Hero />
      <div style={{marginTop: -200}}>
      <Roadmap />
      </div>
      <Statistics/>
      <Footer />
    </div>
     
  );
}