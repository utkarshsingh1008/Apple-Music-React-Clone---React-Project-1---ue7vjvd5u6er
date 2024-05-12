import { useState } from 'react';
import { PiBrowsersThin } from "react-icons/pi";
import { FaApple, FaPlay } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserProvider';

function Sidebar() {
    const { setSearch } = useUser();

    const onSearchDetails = (event) => {
        const queryString = {
            title: event.target.value
        }

        axios.get('https://academics.newtonschool.co/api/v1/music/song', {
            params: {
                search: JSON.stringify(queryString)
            }
        }).then((response) => {
            setSearch(response.data.data);
        }).catch((error) => {
            setSearch(null);
        })
    }

    return (
        <div className="bg-gray-100 min-h-screen sticky top-0 z-10 md:w-64 lg:w-72">
            <div className="p-4 md:p-8">
                <span className="text-2xl font-bold text-black">
                    <FaApple className="inline-block text-4xl" />{" "}
                    Music
                </span>
            </div>
            <input
                type="text"
                placeholder="Search..."
                onChange={onSearchDetails}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 m-4 w-4/5"
            />
            <ul className="text-gray-400">
                <li className="text-xl md:text-2xl m-2 md:m-4 hover:bg-gray-300 p-2 rounded">
                    <Link to="/">
                        <FaPlay className="inline-block text-red-500" /> Listen Now
                    </Link>
                </li>
                <li className="text-xl md:text-2xl m-2 md:m-4 hover:bg-gray-300 p-2 rounded">
                    <Link to="/library">
                        <PiBrowsersThin className="inline-block text-red-500" /> Browser
                    </Link>
                </li>
                <li className="text-xl md:text-2xl m-2 md:m-4 hover:bg-gray-300 p-2 rounded">
                    <Link to="/album">
                        <PiBrowsersThin className="inline-block text-red-500" /> Album
                    </Link>
                </li>
                <li className="text-xl md:text-2xl m-2 md:m-4 hover:bg-gray-300 p-2 rounded">
                    <Link to="/artist">
                        <PiBrowsersThin className="inline-block text-red-500" /> Artist
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
