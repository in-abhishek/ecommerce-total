import React, { createContext, useEffect, useState } from 'react'

const TodoContext = createContext();
export const ContextApi = ({ children }) => {
  const [name, setName] = useState('');
  const [productData, setProductData] = useState([]);
  const [producid, setProductId] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartdarta, setCartData] = useState();
  const [price, setPrice] = useState(1);
  const [showcart, setShowCart] = useState(false);
  const [showcart2, setShowCart2] = useState(false);
  const [logUser, setLogUser] = useState('');
  const [compareData, setCompareData] = useState([]);
 
  const getData = async () => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const getMovieData = await response.json();
      setProductData(getMovieData);
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleCart = (productId) => {
    setProductId([...producid, productId]);
  }
  const showImage = (prodImg) => {
    if (prodImg.charAt(0) === '[') {

      const val = prodImg.replace('["', "");
      return val.replace('"]', "");
    }
    else {
      return prodImg;
    }
  }
  useEffect(() => {
    setTimeout(clearText, 4000);
  }, [showcart]);
  const clearText = () => {
    setShowCart(false);
  }
  useEffect(() => {
    setTimeout(clearText2, 4000);
  }, [showcart2]);
  const clearText2 = () => {
    setShowCart2(false);
  }
  
  const handlecartCompare = (itemData) => {
    if(compareData.length <= 4){
      setCompareData([...compareData, itemData]);
    }
    else{
      setCompareData('Select Only 4 Product');
    }
    
    // console.log("itemData->>>>>>>>>>>>>>", itemData);
  }
  return (
    <TodoContext.Provider value={{ name, setName, getData, productData, setProductId, producid, cart, setCart, setProductId, showImage, handleCart, cartdarta, setCartData, price, setPrice, showcart, setShowCart, logUser, setLogUser, compareData, setCompareData, handlecartCompare,showcart2, setShowCart2}}>
      {children}
    </TodoContext.Provider>
  )
}

export default TodoContext