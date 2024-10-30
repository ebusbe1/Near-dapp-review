"use client"
import { useState ,useEffect,useContext} from 'react';
import Header from '@/components/Header';
import Uploadocs from '@/components/Uploadoc';

import { ReactSVG } from "react-svg";
import Modal from "react-modal";
import { NearContext } from '@/context';



export default function Upload() {
   
    const [nearWeb, setnearWeb] = useState(null);
    const [nearWebprs, setnearWebprs] = useState(false);


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

        <div>
{nearWebprs ?
<>
<Header page={"upload"} />
      <Uploadocs />
</> 
:
<>
<Header page={"upload"} />

<div className="flex flex-col items-center justify-center min-h-screen bg-darkBlue text-white">

          <button className="px-6 py-3 mt-4 text-lg font-semibold bg-green-500 rounded hover:bg-green-500 focus:outline-none" style={{width : "60%", height: 80, borderRadius: 50}} onClick={action} > {label} </button>
</div>
</>
}




</div>    
       
    );
}
