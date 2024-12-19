import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from "flowbite-react";
import Header from '../Header/Header';
import { banner, banner2, banner3 } from '../../assets/images';

export default function Home() {
    useEffect(() => {
        // Clear session or credentials when entering the Home page
        localStorage.removeItem('token'); // Replace with your session key
        sessionStorage.clear();
        localStorage.removeItem('user');

        // Disable back navigation
        const handlePopState = (event) => {
            event.preventDefault();
            window.history.pushState(null, null, window.location.href);
        };

        window.history.pushState(null, null, window.location.href); // Push current state to history
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    return (
        <div>
            <Header />
            <div className="mx-auto w-full max-w-7xl">
                <aside className="relative overflow-hidden text-black rounded-lg sm:mx-32 mx-2 sm:py-16">
                    <div
                        className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8 flex flex-col-reverse sm:flex-row items-center justify-between md:gap-32"
                    >
                        {/* Information Div */}
                        <div className="relative z-30 max-w-xl sm:mt-1 mt-8 space-y-8 text-center sm:text-right sm:ml-auto sm:bg-white sm:bg-opacity-75 sm:p-6 rounded-lg ">
                            <h2 className="text-4xl font-bold sm:text-5xl">
                                Your Vote
                                <span className="sm:block text-4xl">Your Choice</span>
                            </h2>
                            <Link
                                className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75"
                                to="/login"
                            >
                                &nbsp; Login to Vote
                            </Link>
                        </div>

                        {/* Carousel Div */}
                        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 sm:w-1/2 w-full">
                            <Carousel>
                                <img src={banner} alt="..." />
                                <img src={banner2} alt="..." />
                                <img src={banner3} alt="..." />
                            </Carousel>
                        </div>
                    </div>
                </aside>

                <h1 className="text-center text-xl sm:text-xl py-10 font-medium">"Choose the candidate who not only fits the role but also fuels the future."</h1>
            </div>
        </div>
    );
}
