import React, { useState } from "react";
import { ShowGamesProps } from "@/types";
import formatTime from "@/Services/formatTime";
import formatDate from "@/Services/formatDate";
import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function IndexGameTable({ games, sports, playgrounds, teams }: ShowGamesProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSport, setSelectedSport] = useState("");

    const filteredGames = games.filter(game => {
        const playground = playgrounds.find(playground => playground.id === game.playground_id);
        const sport = sports.find(sport => sport.id === game.sport_id);
        return (
            (searchTerm === "" || (playground && playground.postcode.includes(searchTerm))) &&
            (selectedSport === "" || (sport && sport.name.toLowerCase() === selectedSport.toLowerCase()))
        );
    });

    console.log(games);

    return (
        <div>
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <PrimaryButton className='opacity-80 mb-2 bg-sky-500' >
                    <Link href="games/create/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="top-0 right-0 w-5 h-5">
                            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </PrimaryButton>

                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                    <input
                        type="text"
                        placeholder="Search by postcode..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <select
                        value={selectedSport}
                        onChange={e => setSelectedSport(e.target.value)}
                    >
                        <option value="">All Sports</option>
                        {sports.map(sport => (
                            <option key={sport.id} value={sport.name}>
                                {sport.name}
                            </option>
                        ))}
                    </select>

                    <table className="sm:table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Sport
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    From / To
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Playground
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Max Player
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGames.map((game) => {
                                const sport = sports.find(sport => sport.id === game.sport_id);
                                const playground = playgrounds.find(playground => playground.id === game.playground_id);

                                return (
                                    <tr key={game.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {sport?.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {formatDate(game.date)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatTime(game.start_time)} / {formatTime(game.end_time)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {playground?.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {playground?.adress}, {playground?.postcode} {playground?.city}
                                        </td>
                                        <td className="px-6 py-4">
                                            {game.teams.map(team => team.users.length + 1)} / {game.max_player}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                href={`games/${game.id}`}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Show Details
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
