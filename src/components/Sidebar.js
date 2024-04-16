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
            console.log(error)
        })
    }

    return (
        <div className="bg-gray-100 h-screen sticky top-0 z-10">
            <div className=" p-8">
                <span className="text-2xl font-bold text-black">
                    <FaApple className="inline-block text-4xl" />{" "}
                    Music
                </span>
            </div>
            <input
                type="text"
                placeholder="Search..."
                onChange={onSearchDetails}
                className="px-4 mr-8 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 ml-8 mt-4 w-30%"
            />
            <ul className="text-gray-400">
                <li className="text-1xl ml-8 m-3 hover:bg-gray-300 p-2 rounded">
                    <Link to="/">
                        <FaPlay className="inline-block text-red-500" /> Listen Now
                    </Link>
                </li>
                <li className="text-1xl ml-8 hover:bg-gray-300 p-2 rounded">
                    <Link to="/library">
                        <PiBrowsersThin className="inline-block text-red-500" /> Browser
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
