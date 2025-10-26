import React from 'react'

const categories = [
    {
        name: "CCTV Cameras",
        description: "Professional surveillance cameras for security monitoring",
        icon: "i"
    },
    {
        name: "Biometric Systems",
        description: "Advanced biometric authentication and access control",
        icon: "i"
    },
    {
        name: "Access Control",
        description: "Electronic door locks and security access systems",
        icon: "i"
    },
    {
        name: "Security Accessories",
        description: "Supporting hardware and installation accessories",
        icon: "i"
    },
]

const Home = () => {
    return (
       <div>
             <div className='w-full flex flex-col bg-gradient-to-br from-blue-50 to-pink-50 py-10 items-center text-center'>
            <h1 className='text-4xl font-semibold m-2 font-Geist ' >SVIT Technologies</h1>
            <h2 className='text-xl text-[#21808D] mb-2' >Security & Access Solutions</h2>
            <p className='text-gray-700' >Leading provider of CCTV cameras and biometric systems</p>
            <button className='rounded-xl text-white m-2 mt-7 bg-[#21808D] p-2 px-4' >Explore Products</button>
        </div>
        <div>
            <h1>Our Product Categories</h1>
            { categories.map((category)=>{
                
            }) }
        </div>
       </div>
    )
}

export default Home