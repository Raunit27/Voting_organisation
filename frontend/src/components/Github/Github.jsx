import React, {useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
function Github() {
     const data = useLoaderData();
    // //  const [data , setData]=useState(0)
    // // useEffect(()=>{
    // //     fetch('https://api.github.com/users/hiteshchoudhary')
    // //     .then((res)=>res.json())
    // //     .then(data=>{
    // //         setData(data)
    // //     })
        
    // },[data])

  return (
    <div className='text-center bg-gray-400 m-4 text-3xl text-white p-4'>
      Github Followers :{data.followers}
      <img src={data.avatar_url} width={300}alt="" />
    </div>
  )
}

export default Github

export const githubInfoLoder=async()=>{
    const response =await  fetch('https://api.github.com/users/hiteshchoudhary')
    return response.json();
}