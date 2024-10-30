"use client"


import { useState ,useEffect,useContext} from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/Search';
import SearchBar2 from '@/components/Search2';
import { ReactSVG } from "react-svg";
import Modal from "react-modal";
import { NearContext } from '@/context';


export default function Product() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
     const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [nearWebprs, setnearWebprs] = useState(false);

    const [availableWallets, setAvailableWallets] = useState("");
    const [connected2, setConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState(null);

    const { signedAccountId, wallet } = useContext(NearContext);
    const [action, setAction] = useState(() => { });
    const [label, setLabel] = useState('Loading...');
  

    useEffect(() => {
        if (!wallet) return;
    
        if (signedAccountId) {
          setAction(() => wallet.signOut);
          setLabel(`Disconnect ${signedAccountId}`);
          setnearWebprs(true)
        } else {
          setAction(() => wallet.signIn);
          setLabel('Connect wallet');
          setnearWebprs(false)
        }
      }, [signedAccountId, wallet]);


    
    return (

        <div className='bg-darkBlue'>
        {nearWebprs ?
<>
      <Header page={"product"} />
      <div className="hidden md:block">
      <SearchBar />
      </div>
      <div className="block md:hidden">
      <SearchBar2 />
      </div>
      </>    : 
      <>
      <Header page={"product"} />
      
      <div className="flex flex-col items-center justify-center min-h-screen bg-darkBlue text-white">
     
      <button className="px-6 py-3 mt-4 text-lg font-semibold bg-green-500 rounded hover:bg-green-500 focus:outline-none" style={{width : "60%", height: 80, borderRadius: 50}} onClick={action} > {label} </button>
      </div>
      </>
      
      }
      
    </div>
       
       
    );
}
