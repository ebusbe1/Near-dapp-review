
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState ,useEffect,useContext} from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { z } from 'zod';
import { useDropzone } from 'react-dropzone';
import { Audio } from 'react-loader-spinner'
import Modal from "react-modal";
import { ReactSVG } from "react-svg";
import { HelloNearContract } from '../../src/config';
import { NearContext } from '@/context';



const FormSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  email: z.string().min(1).email(),
  website: z.string().min(1).url(),

});

const Uploadocs = () => {
  const [imageBase64, setImageBase64] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Defi');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [modalIsOpen, setModalIsOpen] = useState(false);

    const [account, setAccount] = useState(null);

    const CONTRACT = HelloNearContract;

    const { signedAccountId, wallet } = useContext(NearContext);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
      email: '',
      website: '',

    }
  });

  const handleFilesAdded = (files) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };



  const onSubmit = async (formData) => {
    if (imageBase64 === null){
alert("Upload an image file to proceed")
    }else{
      setLoading(true)

      const data = {
        image: imageBase64.split(',')[1], 
        name: formData.name,
        description: formData.description,
        email: formData.email,
        websitelink: formData.website,
        category: selectedOption,
      };
  
      try {
        const response = await fetch('https://us-central1-almond-1b205.cloudfunctions.net/tronvoiceapi/UploadData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          toast.success(result.message);
          console.log('Product ID:', result.productid);
         
          handleUpload(result.productid)
     
        } else {
          toast.error('Error: ' + result.error);
        }
      } catch (error) {
        toast.error('Error: ' + error.message);
      }
    }
  
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFilesAdded,
    accept: 'image/*', // Only accept image files
    multiple: false,
  });





const handleUpload = async (productid) => {
    if (!wallet) {
  
        console.error('Near wallet not available.');
        return;
    }

    setLoading(true);


   
    try {
       
  await wallet.callMethod({ contractId: CONTRACT, method: 'submitProduct', args: { productHash: productid } })
      
       console.log('Product uploaded successfully!')
    } catch (error) {
        console.error('Error uploading product:', error);

    } finally {
      setLoading(false)
      setModalIsOpen(true)
    }
};

  return (
    <>
    {loading? <div className="flex flex-col items-center justify-center min-h-screen bg-darkBlue text-white">
      <Audio
  height="80"
  width="80"
  radius="9"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
    </div> : <div className="flex flex-col grow w-full max-md:max-w-full md:h-calc-100vh-120">
      <section className="flex flex-col justify-center items-center px-5 py-8 max-md:max-w-full md:px-20 bg-darkBlue text-white">
        <header className="flex gap-2 flex-wrap md:flex-nowrap w-full max-w-2xl bg-darkBlue text-white justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl leading-normal font-semibold text-slate-800 text-white">Upload Image</h2>
            <p className="mt-2 text-sm font-medium text-gray-400">Image of Brand, Product or Service Required</p>
          </div>
        </header>
        <form className="flex flex-col w-full max-w-2xl bg-darkBlue text-white" onSubmit={handleSubmit(onSubmit)}>
          <div
            {...getRootProps()}
            className="flex justify-center items-center text-center px-4 py-2 mt-1 w-full text-sm rounded-lg border-2 border-dashed border-gray-300 bg-darkBlue text-white"
            style={{ cursor: 'pointer', height: 300 }}
          >
            <input {...getInputProps()} />
            {imageBase64 ? (
              <img src={imageBase64} alt="Uploaded" className="max-h-full max-w-full object-contain" />
            ) : (
              <span className="text-gray-400">
                Drag and Drop files here or{' '}
                <span className="text-gray-400" style={{ color: 'blue', cursor: 'pointer' }}>
                  choose file
                </span>
              </span>
            )}
          </div>
          <label htmlFor="name" className="mt-8 text-sm font-bold text-gray-400 text-white">
            <span className="text-slate-800 text-white">Name</span>
            <span className="text-gray-400" style={{ fontSize: 11 }}> (Enter your brand, product, or service name)</span>
          </label>
          <input
            type="text"
            id="name"
            className="justify-center items-start p-2.5 mt-1 w-full text-xs font-medium bg-white rounded-lg border text-black"
            placeholder="Brand name"
            aria-label="name"
            {...register('name')}
          />
          {errors.name && <span className="text-red-600">{errors.name.message}</span>}
          <label htmlFor="description" className="mt-4 text-sm font-bold text-gray-400">
            <span className="text-slate-800 text-white">Description</span>
            <span className="text-gray-400" style={{ fontSize: 11 }}> (Describe what your brand, product or service does)</span>
          </label>
          <textarea
            id="description"
            className="justify-center items-start p-2.5 mt-1 w-full text-xs font-medium bg-white rounded-lg border text-black"
            placeholder="Enter description here"
            aria-label="description"
            {...register('description')}
          ></textarea>
          {errors.description && <span className="text-red-600">{errors.description.message}</span>}
          <label htmlFor="email" className="mt-4 text-sm font-bold text-gray-400">
            <span className="text-slate-800 text-white">Email</span>
            <span className="text-gray-400" style={{ fontSize: 11 }}> (Enter a reachable email)</span>
          </label>
          <input
            type="email"
            id="email"
            className="justify-center items-start p-2.5 mt-1 w-full text-xs font-medium bg-white rounded-lg border text-black"
            placeholder="Enter email here"
            aria-label="email"
            {...register('email')}
          />
          {errors.email && <span className="text-red-600">{errors.email.message}</span>}
          <label htmlFor="website" className="mt-8 text-sm font-bold text-gray-400 text-white">
            <span className="text-slate-800 text-white">Website link</span>
            <span className="text-gray-400" style={{ fontSize: 11 }}> (Enter your Website link)</span>
          </label>
          <input
            type="text"
            id="website"
            className="justify-center items-start p-2.5 mt-1 w-full text-xs font-medium bg-white rounded-lg border text-black"
            placeholder="Website link"
            aria-label="website"
            {...register('website')}
          />
          {errors.website && <span className="text-red-600">{errors.website.message}</span>}
          <label htmlFor="website" className="mt-8 text-sm font-bold text-gray-400 text-white">
            <span className="text-slate-800 text-white">Category</span>
            <span className="text-gray-400" style={{ fontSize: 11 }}> (Select Category)</span>
          </label>
          <div className="relative inline-block w-full md:w-164 text-left mt-4">
            <button
              type="button"
              className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              id="options-menu"
              aria-expanded={isOpen}
              aria-haspopup="true"
              onClick={() => setIsOpen(!isOpen)}
            >
              {selectedOption}
              <RiArrowDropDownLine className="w-5 h-5" />
            </button>
            {isOpen && (
              <div
                className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-1" role="none">
                  {['Defi', 'NFT & Arts', 'Web3', 'Others'].map((option) => (
                    <button
                      key={option}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                      onClick={() => handleSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-4 mt-7 text-sm font-medium flex-wrap" style={{ width: "90%", alignSelf: "center" }}>
            <button
              type="submit"
              className="justify-center p-2.5 text-white bg-violet-800 rounded-lg"
              style={{ backgroundColor: "#32CD32", width: "100%" }}
            >
              Upload
            </button>
          </div>
        </form>
        <div style={{height: 100}}></div>

      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="relative  bg-darkBlue text-white p-6 rounded-lg w-full max-w-lg mx-auto text-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
      >
        <h2 className="text-xl font-semibold mb-4">Upload Successful</h2>

        <div className="flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center ">
            <ReactSVG
              src="/assets/check.svg"
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 60px; height: auto;");
              }}
            />
           
          </div>
          <div className="flex-1 flex justify-center">Product has been uploaded, awaiting review</div>
          
        </div>
      </Modal>
    </div>}
    
    </>

  );
};

export default Uploadocs;


