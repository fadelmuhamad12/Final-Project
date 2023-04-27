import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { axiosInstance } from '../api/axios' // <== Untuk Manggil Base Url

const Categories = () => {

    const [categories, setCategoies] = useState ([])

    const fetchCategories = async () => {
        try {
              const categories = await axiosInstance.get('/categories', {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c'
            }
        })
        // console.log(categories.data.data);
        setCategoies(categories.data.data)

        }catch(error){
            console.log(error);

        }
      
    }
    

    // const renderCategories = (()=> {
    //     return categories.map((category)=> {
    //         return (
    //             <div key={category.id}>
    //                 <h1>{category.name}</h1>
    //                 <h1>{category.id}</h1>
    //                 <img src= {category.imgUrl} />
    //             </div>

    //         );
    //     });
    // });

    useEffect (()=> {
        fetchCategories()
    }, [])


  return (
    <div>
        <h1>Kategori</h1>
     {/* {categories.map((category)=> {
         return(
            <div key={category.id}> 
            <h1>{category.name}</h1>
            <h1>{category.id}</h1>
            <img src={category.imageUrl} />


            </div>
         )
     })} */}
    </div>
  )
}

export default Categories
