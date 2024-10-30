'use client';
import { useState,useEffect,useContext } from "react";
import { ReactSVG } from "react-svg";
// import { useRouter } from 'next/navigation'
// import { Link } from "react-router-dom";
import Link from 'next/link';
import { Audio } from 'react-loader-spinner'
import { HelloNearContract } from '../../src/config';
import { NearContext } from '@/context';


export default function SearchBar() {
  const [query, setQuery] = useState("");
  // const router = useRouter();

  const categories = ['Defi', 'NFT & Arts',"Web3", 'Other'];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products2, setproducts2] = useState([]);
  const [feedbackdata, setfeedbackdata] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cat, setcat] = useState(""); 
  const [rates, setrates] = useState([]); 


  const CONTRACT = HelloNearContract;

  const { signedAccountId, wallet } = useContext(NearContext);

  const handleCategoryPress = (category) => {
    if (category === cat) {
      setSelectedCategory(null);
      setcat(''); // Deselects the category if it's already selected
    } else {
      setSelectedCategory(category);
      setcat(category); // Sets the selected category
      
    }
  
    console.log(`Selected category: ${category}`);
  };
  

const calculateFeedbackData = (reviews, products) => {
  const feedbackMap = {};

  // Create a map of reviews by docname
  reviews.forEach((review) => {
    const { docName, datax: { rating } } = review;

    if (!feedbackMap[docName]) {
      feedbackMap[docName] = { totalRating: 0, count: 0 };
    }
    feedbackMap[docName].totalRating += rating;
    feedbackMap[docName].count += 1;
  });

  return products.map((product) => {
    const feedback = feedbackMap[product.docName] || { totalRating: 0, count: 0 };
    const averageRating = feedback.count > 0 ? (feedback.totalRating / feedback.count).toFixed(1) : 0;
    return {
      ...product,
      averageRating,
      reviewCount: feedback.count,
    };
  });
};

useEffect(() => {
  
  const handleUpload = async () => {

    try {
    
    const products = await wallet.viewMethod({ contractId: CONTRACT, method: 'getAllProducts'});
  
      if (!products || products.length === 0) {
        setLoading(false)
        throw new Error('No products found');
        
      }
     

      const data = await fetchDocuments(products);
      const docNamesArray = data.map(item => item.docName);
      
      const data2 = await fetchDocuments2(docNamesArray)
      const result = calculateFeedbackData(data2, data)
      const shuffledResult = result.sort(() => Math.random() - 0.5);
      setproducts2(shuffledResult)
      // setrates(result)
      setLoading(false)
     

    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  handleUpload();
}, []);


async function fetchDocuments2(docsNameArray2) {
  try {
    const response = await fetch('https://us-central1-almond-1b205.cloudfunctions.net/tronvoiceapi/GetData4', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ docsName: docsNameArray2.join(',') }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const results = await response.json();
   
  
    return results;
  } catch (error) {
    console.error('Error fetching documents:', error);
    return null;
  }
}
  

  const products = [
    { id: 1, name: "AlmonDefi", image: "https://ik.imagekit.io/zjvk6l5gp/51.jpg?updatedAt=1720710782470", website: "www.almondefi.com", email: "ogbodotc@gmail.com", description : "Decnstralised financial system jvskchiuocw ejhbwkchjew sdcbkuwbjdwe dscvjekw sdcksjchw ackudhkweuieg dscjguksefamefbiwuekfjwb,f ccwuefwkfjw", rating: "4.5", reviewnum : 30 },
    { id: 2, name: "Product 2", image: "https://ik.imagekit.io/zjvk6l5gp/51.jpg?updatedAt=1720710782470",  website: "www.almondefi.com", email: "ogbodotc@gmail.com", description : "w", rating: "0", reviewnum : 0  },
    { id: 2, name: "Product 2", image: "https://ik.imagekit.io/zjvk6l5gp/51.jpg?updatedAt=1720710782470",  website: "www.almondefi.com", email: "ogbodotc@gmail.com", description : "w", rating: "0", reviewnum : 0  },
    { id: 2, name: "Product 2", image: "https://ik.imagekit.io/zjvk6l5gp/51.jpg?updatedAt=1720710782470",  website: "www.almondefi.com", email: "ogbodotc@gmail.com", description : "w", rating: "0", reviewnum : 0  },
    { id: 2, name: "Product 2", image: "https://ik.imagekit.io/zjvk6l5gp/51.jpg?updatedAt=1720710782470",  website: "www.almondefi.com", email: "ogbodotc@gmail.com", description : "w", rating: "0", reviewnum : 0  },
    { id: 2, name: "Product 2", image: "https://ik.imagekit.io/zjvk6l5gp/51.jpg?updatedAt=1720710782470",  website: "www.almondefi.com", email: "ogbodotc@gmail.com", description : "w", rating: "0", reviewnum : 0  },
    { id: 2, name: "Product 2", image: "https://ik.imagekit.io/zjvk6l5gp/51.jpg?updatedAt=1720710782470",  website: "www.almondefi.com", email: "ogbodotc@gmail.com", description : "w", rating: "0", reviewnum : 0  },

    { id: 2, name: "Product 2", image: "https://ik.imagekit.io/zjvk6l5gp/51.jpg?updatedAt=1720710782470",  website: "www.almondefi.com", email: "ogbodotc@gmail.com", description : "w", rating: "0", reviewnum : 0  },
    { id: 2, name: "Product 2", image: "https://ik.imagekit.io/zjvk6l5gp/51.jpg?updatedAt=1720710782470",  website: "www.almondefi.com", email: "ogbodotc@gmail.com", description : "w", rating: "0", reviewnum : 0  },

    { id: 2, name: "Product 2", image: "https://ik.imagekit.io/zjvk6l5gp/51.jpg?updatedAt=1720710782470",  website: "www.almondefi.com", email: "ogbodotc@gmail.com", description : "w", rating: "0", reviewnum : 0  },
    { id: 2, name: "Product 2", image: "https://ik.imagekit.io/zjvk6l5gp/51.jpg?updatedAt=1720710782470",  website: "www.almondefi.com", email: "ogbodotc@gmail.com", description : "w", rating: "0", reviewnum : 0  },
    { id: 2, name: "Product 2", image: "https://ik.imagekit.io/zjvk6l5gp/51.jpg?updatedAt=1720710782470",  website: "www.almondefi.com", email: "ogbodotc@gmail.com", description : "w", rating: "0", reviewnum : 0  },
    { id: 2, name: "Product 2", image: "https://ik.imagekit.io/zjvk6l5gp/51.jpg?updatedAt=1720710782470",  website: "www.almondefi.com", email: "ogbodotc@gmail.com", description : "w", rating: "0", reviewnum : 0  },{ id: 2, name: "Product 2", image: "https://ik.imagekit.io/zjvk6l5gp/51.jpg?updatedAt=1720710782470",  website: "www.almondefi.com", email: "ogbodotc@gmail.com", description : "w", rating: "0", reviewnum : 0  },
    { id: 2, name: "Product 2", image: "https://ik.imagekit.io/zjvk6l5gp/51.jpg?updatedAt=1720710782470",  website: "www.almondefi.com", email: "ogbodotc@gmail.com", description : "w", rating: "0", reviewnum : 0  },
    { id: 2, name: "Product 2", image: "https://ik.imagekit.io/zjvk6l5gp/51.jpg?updatedAt=1720710782470",  website: "www.almondefi.com", email: "ogbodotc@gmail.com", description : "w", rating: "0", reviewnum : 0  },


  ];

  async function fetchDocuments(docsNameArray) {
    try {
      const response = await fetch('https://us-central1-almond-1b205.cloudfunctions.net/tronvoiceapi/GetData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ docsName: docsNameArray.join(',') }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const results = await response.json();
    
      return results;
    } catch (error) {
      console.error('Error fetching documents:', error);
      return null;
    }
  }
  
  data.ProductInfo.category.toLowerCase() === "nft & art"
uctInfo.category.toLowerCase() === "other"


useEffect(() => {
 
  let filtered = products2;


  if (categories.includes(cat)) {
    filtered = filtered.filter((product) =>
      product.data.ProductInfo.category.toLowerCase() === cat.toLowerCase()
      
    );
  }


  if (query) {
    filtered = filtered.filter((product) =>
      product.data.ProductInfo.name.toLowerCase().includes(query.toLowerCase())
    );
  }


  setFilteredProducts(filtered);

}, [cat, query, products2]); 


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
    </div> : <div className="flex flex-col items-center justify-center min-h-screen bg-darkBlue text-white">
      <div className="w-full max-w-md p-2" style={{ marginTop: filteredProducts.length < 2 ?-260 : 0}}>
        <div
          style={{
            marginBottom: 50,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ReactSVG
            src="/assets/starss.svg"
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 80px; height: auto;");
            }}
          />
        </div>


       

        <div className="flex w-full max-w-md " >
          <input
            type="text"
            className="flex-grow p-4 text-gray-700 bg-white border rounded-l-full shadow-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Company or category"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={() => console.log("Search clicked")}
            className="px-6 text-white bg-green-500 rounded-r-full shadow-md hover:bg-blue-600 focus:outline-none"
          >
            Search
          </button>
        </div>
        <div className="flex justify-center mb-4 mt-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryPress(category)}
              className={`flex items-center justify-center w-20 h-10 m-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 focus:outline-none ${
                selectedCategory === category ? 'ring-1 ring-green-500' : ''
              }`}
              style={{backgroundColor: "rgba(50, 205, 50, 0.2)", color: "#32CD32", fontSize: 13}}
            >
              {category}
            </button>
          ))}
        </div>
      </div>


      <div className="hidden md:block mt-10 w-full max-w-5xl  p-5 rounded-lg shadow-md bg-darkBlue">
      
        <ul>
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product, index) => (
      <Link 

 href={{ pathname: `/product/${product.docName}`}}
      key={index}>
        <div style={{height: 160, display: 'flex', flexDirection: "row", backgroundColor: "#111827", marginBottom: 20, borderRadius: 50, alignItems: "center", cursor: 'pointer'}}>
          
          <div className="w-24 h-24 rounded-full overflow-hidden" style={{marginLeft: 40}}>
            <img
               src={`data:image/jpeg;base64,${product.data.ProductInfo.image}`} // Replace with your image URL
              alt="Circular Image"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div style={{display: "flex", flexDirection: "column", marginLeft: 30, marginTop: -10, width: "50%"}}>
            <div style={{fontWeight: "600", fontSize: 25, color: '#FFFFFF'}}>
            {product.data.ProductInfo.name}
            </div>
            <div style={{color: "#9CA3AF"}}>
            {product.data.ProductInfo.description.length > 40 ? product.data.ProductInfo.description.substring(0, 100) + '...' : product.data.ProductInfo.description}
            </div>
          </div>

          <div style={{display: "flex", flexDirection: "column", marginTop: -10, marginLeft: "auto", marginRight: 40}}>
            <div style={{fontWeight: "600", fontSize: 25, color: "#32CD32", display: "flex", flexDirection: "row"}}>
              
              {product.averageRating}
              <div style={{marginTop: 8, marginLeft: 5}}>
                <ReactSVG
                  src="/assets/star.svg"
                  beforeInjection={(svg) => {
                    svg.setAttribute("style", "width: 20px; height: auto;");
                  }}
                />
              </div>
            </div>

            <div style={{color: "#9CA3AF", fontSize: 14}}>
            
              {product.reviewCount} reviews
            </div>
          </div>
        </div>
      </Link>
    ))
  ) : (
    <li className="py-2 text-gray-500"></li>
  )}
</ul>
      </div>
    
    </div>}
    
    
    </>


  );
}
