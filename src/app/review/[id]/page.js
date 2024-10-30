"use client"
import { useState ,useEffect,useCallback,useContext} from 'react';
import Header from '@/components/Header';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { CiCircleInfo } from 'react-icons/ci';
import { z } from 'zod';
import { useDropzone } from 'react-dropzone';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter,useParams } from 'next/navigation';

import { ReactSVG } from "react-svg";
import Modal from "react-modal";
import { NearContext } from '@/context';
import { HelloNearContract } from '../../../config';
import { Audio } from 'react-loader-spinner'


const FormSchema = z.object({
    title: z.string().min(1),
  review: z.string().min(5),

 
});
export default function Review() {


    const [loading, setLoading] = useState(false);


    const [nearWebprs, setnearWebprs] = useState(false);
    const  docNames  = useParams();
    const [rating, setRating] = useState(0); 




    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);



    const { signedAccountId, wallet } = useContext(NearContext);
    const CONTRACT = HelloNearContract;
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







    const handleApproval = async (producthash, feedbackhash) => {
     
      try {


        const products = await wallet.callMethod({ contractId: CONTRACT, method: 'addFeedbackByHash', args: { productHash: producthash,feedbackHash:feedbackhash  } });
                      setLoading(false)
                      setModalIsOpen(true) ;setModalIsOpen2(true)
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: '',
            review: '',
      
        }
      });
    
      const saveSource = async (formData) => {
        setModalIsOpen(true) ;setModalIsOpen2(true)
        
      };

      const onSubmit = async (formData) => {
        if (rating < 1){
    alert("You can't have a rating less than 1")
        }else{
          setLoading(true)
    
          const data = {
            
            title: formData.title,
            review: formData.review,
           rating : rating,
           user : window.nearWeb.defaultAddress.base58

          };
      
          try {
            const response = await fetch('https://us-central1-almond-1b205.cloudfunctions.net/tronvoiceapi/Feedback', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({docName: docNames.id,data}),
            });
      
            const result = await response.json();
      
            if (response.ok) {
              toast.success(result.message);
              console.log('Product ID:', );

              handleApproval(docNames.id,result.productid)
            
         
            } else {
              toast.error('Error: ' + result.error);
            }
          } catch (error) {
            toast.error('Error: ' + error.message);
          }
        }
      
      };

    
   


      const handleStarClick = (index) => {
        setRating(index + 1); // Update rating based on the clicked star index
      };
    
    return (

        <div className='bg-darkBlue'>
          {loading?  <div className="flex flex-col items-center justify-center min-h-screen bg-darkBlue text-white">
<Audio
height="80"
width="80"
radius="9"
color="green"
ariaLabel="loading"
wrapperStyle
wrapperClass
/>
</div> : 
<>
{nearWebprs ? <>
            <Header page={"product"} />
     
     <section className="flex flex-col justify-center items-center px-5 py-8  bg-darkBlue text-white rounded-lg max-md:max-w-full md:px-20 min-h-screen" >
     <div className="flex items-center gap-1" style={{marginTop : -400, marginBottom: 30}}>
     {Array.from({ length: 5 }, (_, i) => (
       <img
         key={i}
         onClick={() => handleStarClick(i)} 
         src={i < rating ? "/assets/star3.svg" : "/assets/star2.svg"} 
         alt="star"
         width={40}
         height={40}
         className="cursor-pointer" 
       />
     ))}
   </div>
     <div className="flex items-center justify-center ">
 <header className="flex gap-2 flex-wrap md:flex-nowrap w-full max-w-2xl bg-darkBlue text-white">
  
   <div className="flex flex-col items-center justify-center">
     <h2 className="text-2xl leading-normal font-semibold text-slate-800 text-white">
       Tap to drop a rating
     </h2>
     <p className="mt-2 text-sm font-medium text-gray-400">
  Enter title and review below 
     </p>
   </div>
 </header>
</div>


       <form className="flex flex-col w-full max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
         <label
           htmlFor="name"
           className="mt-8 text-sm font-bold text-gray-400 text-white"
         >
           <span className="text-slate-800 text-white">Title</span>
           <span className="text-gray-400" style={{fontSize : 11}}> (Enter title for review)</span>
         </label>
         <input
           type="text"
           id="title"
           className="justify-center items-start p-2.5 mt-1 w-full text-xs font-medium bg-white rounded-lg border text-black"
           placeholder="Write title for your review"
           aria-label="title"
           {...register('title')}
         />
         {errors.title && <span className="text-red-600">{errors.title.message}</span>}
         <label
           htmlFor="review"
           className="mt-4 text-sm font-bold text-gray-400"
         >
           <span className="text-slate-800 text-white">review</span>
           <span className="text-gray-400" style={{fontSize : 11}}> (Enter review)</span>
         </label>
         <textarea
           id="review"
           className="justify-center items-start p-2.5 mt-1 w-full text-xs font-medium bg-white rounded-lg border text-black"
           placeholder="Enter review description here"
           aria-label="review"
           {...register('review')}
         ></textarea>
         {errors.review && <span className="text-red-600">{errors.review.message}</span>}
        
         <div className="flex gap-4  mt-7 text-sm font-medium flex-wrap" style={{width : "90%", alignSelf: "center"}}>
           <button
             type="submit"
             className="justify-center p-2.5 text-white bg-violet-800 rounded-lg"
             style={{backgroundColor: "#32CD32",width : "100%" }}
           >
            Upload
           </button>
         
         </div>
       </form>
     </section>
           </> : <>
           <Header page={"product"} />

<div className="flex flex-col items-center justify-center min-h-screen bg-darkBlue text-white">

 <button className="px-6 py-3 mt-4 text-lg font-semibold bg-green-500 rounded hover:bg-green-500 focus:outline-none" style={{width : "60%", height: 80, borderRadius: 50}} onClick={() => {action;setModalIsOpen2(false)}} > {label} </button>
</div>
           </>}
      
</>

}
         


    </div>
       
       
    );
}
