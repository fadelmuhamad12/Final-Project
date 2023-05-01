import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axios'


const Activities = () => {
    const [activities, setActivities] = useState ([])

    const fetchActivities = async () => {
        // try{
        //     // const createActivities = await axiosInstance.post("/create-activity", {
        //     //     headers: {
        //     //         apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        //     //         Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`
        //     //     }
        //     // });
        //     // console.log(createActivities);
        //     const activities = await axiosInstance.get("/activities", {
        //         headers: {
        //             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        //         }
        //     });
        //     console.log(activities.data.data);
        //     setActivities(activities.data.data)
        // }catch (error) {
        //     console.log(error);
        // }
    }

 
    useEffect(()=> {
        fetchActivities()
    }, [])


  return (
    <div>
      <h1>Activities</h1>
      {/* {activities.map((activity)=> {
          return (
              <div key={activity.id}>
                <p>{activity.address}</p>
                <p>{activity.category.name}</p>
                <img src={activity.category.imageUrl} alt="" />
               
                  
            </div>
          )
      })} */}
    </div>
  )
}

export default Activities
