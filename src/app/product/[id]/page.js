"use client"

import { useState, useEffect,useContext } from 'react';

import Header from '@/components/Header';

import { useRouter,useParams } from 'next/navigation';
import Link from 'next/link';
import { Audio } from 'react-loader-spinner'
import { HelloNearContract } from '../../../config';
import { NearContext } from '@/context';

export default function Productid() {
    
    const [loading, setLoading] = useState(true); 
    const [reviews, setreviews] = useState([]);
    const [products3, setproducts3] = useState([]);
    const [aproved, setaproved] = useState(false);


  const CONTRACT = HelloNearContract;

  const { signedAccountId, wallet } = useContext(NearContext);

const navigate = useRouter()

const  docName  = useParams()


  console.log('Product ID:', docName);
   

    useEffect(() => {
        const handleUpload = async () => {
           
          try {
           
      
            const data = await fetchDocuments(docName.id);
            setproducts3(data.ProductInfo)
            
      
          } catch (error) {
            console.error('Error fetching documents:', error);
          }
        };
      
        handleUpload();
      }, []);

      const handleApproval = async () => {

      try {
        

        const products = await wallet.callMethod({ contractId: CONTRACT, method: 'approveProductByHash', args: { productHash: docName.id } });
  
        setLoading(false)
        
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    useEffect(() => {
        const handleUpload = async () => {
           
          try {
           
            const products = await wallet.viewMethod({ contractId: CONTRACT, method: 'getAllFeedbackHashesByProductHash',  args: { productHash: docName.id }});
           
            const productsaproved = await wallet.viewMethod({ contractId: CONTRACT, method: 'isProductApproved',  args: { productHash: docName.id }});
            setaproved(productsaproved)
            if (!products || products.length === 0) {
              setLoading(false)
              setreviews([])
              throw new Error('No products found');
              
            }
            console.log('Fetched products:', products);
      
            const data = await fetchDocuments2(products);
           
            setreviews(data)
            setLoading(false)
            console.log('Fetched documents:', data);
      
          } catch (error) {
            console.error('Error fetching documents:', error);
          }
        };
      
        handleUpload();
      }, []);

      async function fetchDocuments(docsNameArray) {
        try {
          const response = await fetch('https://us-central1-almond-1b205.cloudfunctions.net/tronvoiceapi/GetData2', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ docsName: docsNameArray }),
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
      
          const results = await response.json();
          console.log('Fetched Documents:', results);
          return results;
        } catch (error) {
          console.error('Error fetching documents:', error);
          return null;
        }
      }

      async function fetchDocuments2(docsNameArray) {
        try {
          const response = await fetch('https://us-central1-almond-1b205.cloudfunctions.net/tronvoiceapi/GetData3', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({docsName1: docName.id, docsName: docsNameArray.join(',') }),
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
      
          const results = await response.json();
          console.log('Fetched Documents:', results);
          return results;
        } catch (error) {
          console.error('Error fetching documents:', error);
          return null;
        }
      }

    //   const reviews = [
    //     {
    //       name: "John Doe",
    //       rating: 4.5,
    //       review: "Selena was absolutely amazing! She was professional, friendly, and her service was top-notch. Highly recommend!",
    //     },
    //     {
    //       name: "Jane Smith",
    //       rating: 4,
    //       review: "Great experience working with Selena. She really understood our needs and delivered beyond expectations.",
    //     },
    //     {
    //       name: "Michael Brown",
    //       rating: 3.5,
    //       review: "Selena was great to work with. Although there were some minor issues, overall it was a positive experience.",
    //     },
    //     {
    //       name: "Emily Davis",
    //       rating: 5,
    //       review: "Fantastic service! Selena exceeded all our expectations and was a pleasure to work with.",
    //     },
    //     {
    //       name: "Chris Wilson",
    //       rating: 4,
    //       review: "Very professional and delivered exactly what was promised. Would definitely work with Selena again.",
    //     },
    //     {
    //       name: "Laura Johnson",
    //       rating: 4.5,
    //       review: "Selena's attention to detail and dedication were outstanding. Highly recommended!",
    //     },
    //   ];
      


    // const fetchProduct = async (productId) => {
    //     try {
    //         const product = await contract.getProduct(productId).call();
    //         setProduct(product);
    //     } catch (error) {
    //         console.error('Error fetching product:', error);
    //     }
    //     setLoading(false);
    // };

    // if (loading) return <div>Loading...{`${searchParams}`}</div>;
    // if (!product) return <div>Product not found</div>;
    const totalRatings =  reviews.reduce((total, review) => total + review.rating, 0);
    const averageRating = reviews.length === 0 ? 0 : totalRatings / reviews.length;
    return (
        <div className='bg-darkBlue'>
            <Header page={"product"}/>
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
    </div> : 
        
        <div className="flex flex-col grow w-full max-md:max-w-full md:h-calc-100vh-120 min-h-screen">
      
        <section className="flex flex-col items-center px-20 py-8 gap-6 bg-darkBlue rounded-lg max-md:px-5 max-md:max-w-full">
  <div className="flex flex-col items-center justify-center">
    <div className="w-48 h-48 rounded-full overflow-hidden flex justify-center items-center">
      <img
        src={`data:image/jpeg;base64,${products3.image}`} // Replace with your image URL
        alt="Circular Image"
        className="w-full h-full object-cover"
      />
    </div>
    <h1 className="text-2xl font-semibold text-center mt-4 text-white">
    {products3.name}
    </h1>
    <span className="font-semibold text-xl font-semibold text-center mt-4 text-white" style={{ color: "#8F94A8", fontSize: 14, width : "80%" }}>{products3.description}</span>
    <div className="flex flex-wrap justify-center gap-10 mt-6 w-full max-w-5xl">
      <div className="flex flex-col items-start w-full sm:w-auto space-y-2">
        <div className="checkbox flex items-center gap-2.5">
          <span className="font-semibold text-sm" style={{ color: "#8F94A8" }}>Work Email</span>
        </div>
        <div className="checkbox flex items-center gap-2.5">
          <span className="text-sm text-blue-600 ml-0" style={{ color: "#9CA3AF" }}>{products3.email}</span>
        </div>
      </div>
      {/* <div className="flex flex-col items-start w-full sm:w-auto space-y-2">
        <div className="checkbox flex items-center gap-2.5">
          <span className="font-semibold text-sm" style={{ color: "#8F94A8" }}>Phone Number</span>
        </div>
        <div className="checkbox flex items-center gap-2.5">
          <span className="text-sm text-blue-600 ml-0" style={{ color: "#435060" }}>+123 4337896</span>
        </div>
      </div> */}
      <div className="flex flex-col items-start w-full sm:w-auto space-y-2">
        <div className="checkbox flex items-center gap-2.5">
          <span className="font-semibold text-sm" style={{ color: "#8F94A8" }}>Website</span>
        </div>
        <div className="checkbox flex items-center gap-2.5">
          {/* <span className="text-sm text-blue-600 ml-0" style={{ color: "#435060" }}>{products3.websitelink}</span> */}
          <a 
  href={products3.websitelink} 
  target="_blank" 
  rel="noopener noreferrer" 
  className="text-sm text-blue-600 ml-0" 
  style={{ color: "#9CA3AF" }}
>
  {products3.websitelink}
</a>
        </div>
        
      </div>
      <div className="flex flex-col items-start w-full sm:w-auto space-y-2">
        <div className="checkbox flex items-center gap-2.5">
          <span className="font-semibold text-sm" style={{ color: "#8F94A8" }}>Category</span>
        </div>
        <div className="checkbox flex items-center gap-2.5">
          <span className="text-sm text-blue-600 ml-0" style={{ color: "#9CA3AF" }}>{products3.category}</span>
        </div>
      </div>

      <div className="flex flex-col items-start w-full sm:w-auto space-y-2">
        <div className="checkbox flex items-center gap-2.5">
          <span className="font-semibold text-sm" style={{ color: "#8F94A8" }}>Status</span>
        </div>
        <div className="checkbox flex items-center gap-2.5">
        {aproved ? <span className="text-sm text-blue-600 ml-0" style={{ color: "#9CA3AF" }}>Approved</span> :  <span className="text-sm text-blue-600 ml-0" style={{ color: "#9CA3AF" }}>Not Approved</span>}
          {!aproved && signedAccountId === "hillary21.testnet" &&  <button onClick={() => {
                //router.push(`/review/${1}`)
                //navigate(`/review/${docName.id}`)
                setLoading(true)
                handleApproval()
            }}  className=" px-4 py-2 text-lg font-semibold text-white bg-green-500 rounded-full shadow-lg hover:bg-blue-500 focus:outline-none" style={{fontSize: 14}}>
            Approve
          </button>
         
          }
        </div>
      </div>
      
    </div>
  </div>
</section>


      <section className="flex flex-row justify-between items-center px-20 py-8 gap-6 bg-darkBlue rounded-lg max-md:px-5 max-md:max-w-full mt-10">
        <h1 className="text-xl font-semibold text-white">
          Overall Rating
        </h1>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-end text-white">
            {averageRating}
          </h1>

          {Array.from({ length: averageRating }, (_, i) => (
                        <img
                          key={i}
                          src={"/assets/star.svg"}
                          alt="star"
                          width={25}
                          height={25}
                        />
                      ))}
          
        </div>
      </section>
      <div className="flex flex-col gap-6 overflow-y-auto max-h-80" style={{width: "90%", alignSelf: "center"}}>
  {reviews.length === 0 ? (
    <p className="text-center text-gray-400" style={{marginTop: 100, fontSize: 20}}>No reviews</p>
  ) : (
    reviews.map((review, index) => (
      <div key={index} className="flex flex-col gap-2 bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{review.title}</h2>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <img
                key={i}
                src={i + 0.5 <= review.rating ? "/assets/star.svg" : "/assets/star2.svg"}
                alt="star"
                width={20}
                height={20}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-400">{review.review}</p>
      </div>
    ))
  )}
</div>

            {aproved &&  <Link 
             href={{ pathname: `/review/${docName.id}`}}
            // onClick={() => {
            //     //router.push(`/review/${1}`)
            //     navigate(`/review/${docName.id}`)
            // }} 
             className="fixed bottom-5 right-5 px-4 py-2 text-lg font-semibold text-white bg-green-500 rounded-full shadow-lg hover:bg-blue-500 focus:outline-none" style={{fontSize: 14}}>
            Write Review
          </Link>}


          <div style={{height: 150}}> </div>
             {/* {reviews.map((review, index) => (
                <div key={index} className="flex flex-col gap-2 bg-gray-800 p-4 rounded-lg" style={{width : "90%", alignSelf: "center", marginBottom: 20}}>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{review.name}</h2>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <img
                          key={i}
                          src={i + 0.5 <= review.rating ? "/assets/star.svg" : "/assets/star2.svg"}
                          alt="star"
                          width={20}
                          height={20}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{review.review}</p>
                </div>
              ))}
       */}
    </div>}
    </div>
    );
}
