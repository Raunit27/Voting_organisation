import React from 'react'
import Header from '../Header/Header';
import map from "../../assets/images/map.jpg"
export default function About() {
    return (
        <div>
            <Header/>
           <div className="py-16 bg-white">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:5/12 lg:w-5/12">
                        <img
                            src={map}
                            alt="image"
                        />
                    </div>
                    <div className="md:7/12 lg:w-6/12">
                        <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                        Empowering Democracy: About Our Voting Platform
                        </h2>
                        <p className="text-justify mt-6 text-gray-600">
                        Welcome to Voteing app , the future of voting made simple, secure, and accessible to everyone. Our mission is to empower citizens by providing a seamless and user-friendly platform that makes participating in elections easier than ever before.
                        </p>
                    </div>
                </div>
                <div className=' '>
                <h2 className="md:flex  md:items-start mt-8 text-xl text-gray-900 font-bold md:text-2xl justify-items-start">
                Why Choose Our Voting App?
                </h2>
                 <h5 className="md:flex  md:items-start mt-8 text-xl text-gray-900 font-bold md:text-xl justify-items-start">Secure and Trustworthy</h5>
                <p className="text-justify text-gray-600">
                Security is our top priority. We use state-of-the-art encryption and blockchain technology to ensure that your vote is confidential and tamper-proof. Every vote is securely recorded and can be independently verified, ensuring the integrity of the election process.
                </p>

                <h5 className="md:flex  md:items-start mt-8 text-xl text-gray-900 font-bold md:text-xl justify-items-start">Accessible and Inclusive</h5>
                <p className="text-justify text-gray-600">
                We believe that every eligible voter should have the opportunity to participate in elections. Our app is designed with accessibility in mind, ensuring that people of all abilities can easily cast their votes from the comfort of their homes.
                </p>


                <h5 className="md:flex  md:items-start mt-8 text-xl text-gray-900 font-bold md:text-xl justify-items-start">User-Friendly Interface</h5>
                <p className="text-justify text-gray-600">
                Voting should be simple and stress-free. Our app provides an intuitive interface that guides you through the voting process step-by-step, making it easy to review candidates, select your choices, and submit your ballot.
                </p>

                <h5 className="md:flex  md:items-start mt-8 text-xl text-gray-900 font-bold md:text-xl justify-items-start">Transparent and Fair</h5>
                <p className="text-justify text-gray-600">
                Transparency is the cornerstone of a fair election. Our app provides real-time updates and clear information about the voting process, so you can be confident that your vote is counted as intended.
                </p>
                </div>
            </div>
        </div>
        </div>
    );
}
