import React, { useState } from "react";
import { ShowGamesProps } from "@/types";
import formatTime from "@/Services/formatTime";
import formatDate from "@/Services/formatDate";
import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TableHeaderCell from "@/Components/Table/TableHeaderCell";
import TableDataCell from "@/Components/Table/TableDataCell";


export default function IndexGameTable({ games, sports, playgrounds }: ShowGamesProps) {

    {/* SET FILTER VARIABLES */}
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedSport, setSelectedSport] = useState<string>("");


    {/* FILTERED GAMES BY SPORTS OR POSTCODE*/}
    const filteredGames = games.filter(game => {
        const playground = playgrounds.find(playground => playground.id === game.playground_id);
        const sport = sports.find(sport => sport.id === game.sport_id);
        return (
            (searchTerm === "" || (playground && playground.postcode.includes(searchTerm))) &&
            (selectedSport === "" || (sport && sport.name.toLowerCase() === selectedSport.toLowerCase()))
        );
    });

    return (
        <div>
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="flex justify-start">

                    {/* REDIRECTION BUTTON TO CREATE A GAME */}
                    <PrimaryButton className='opacity-80 mb-2 bg-sky-500'>
                        <Link href="games/create/">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="top-0 right-0 w-5 h-5">
                                <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </PrimaryButton>

                    {/* DROPDOWN TO FILTER BY SPORTS */}
                    <select
                        id="sports"
                        className="mt-1 block mb-2 ml-2 w-48 py-2 rounded-md"
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


                    {/* INPUT TO FILTER BY POSTCODE */}
                    <TextInput
                        id="postcode"
                        type="text"
                        className="mt-1 block mb-2 ml-2 w-48 py-2"
                        placeholder="Search by postcode..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                </div>

                
                {/* DISPLAY ALL GAMES */}
                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="sm:table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <TableHeaderCell className="text-center">Sport</TableHeaderCell>
                                <TableHeaderCell className="text-center">Date</TableHeaderCell>
                                <TableHeaderCell className="text-center">From / To</TableHeaderCell>
                                <TableHeaderCell className="text-center">Playground</TableHeaderCell>
                                <TableHeaderCell className="text-center">Adress</TableHeaderCell>
                                <TableHeaderCell className="text-center">Max Player</TableHeaderCell>
                                <TableHeaderCell className="text-center">Action</TableHeaderCell>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGames.map((game) => {
                                const sport = sports.find(sport => sport.id === game.sport_id);
                                const playground = playgrounds.find(playground => playground.id === game.playground_id);

                                return (
                                    <tr key={game.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <TableHeaderCell
                                            className="font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                                        >
                                            {sport?.name}
                                        </TableHeaderCell>

                                        <TableDataCell className="text-center">
                                            {formatDate(game.date)}
                                        </TableDataCell>

                                        <TableDataCell className="text-center">
                                            {formatTime(game.start_time)} / {formatTime(game.end_time)}
                                        </TableDataCell>

                                        <TableDataCell className="text-center">
                                            {playground?.name}
                                        </TableDataCell>

                                        <TableDataCell className="text-center">
                                            {playground?.adress}, {playground?.postcode} {playground?.city}
                                        </TableDataCell>

                                        <TableDataCell className="text-center">
                                            {game.teams.reduce(
                                                (totalPlayers, team) => totalPlayers + team.users.length, 0) + 1} / {game.max_player}
                                        </TableDataCell>


                                        {/* REDIRECTION BUTTON TO DISPLAY ONE GAME DETAILS */}
                                        <TableDataCell className="text-center">
                                            <Link
                                                href={`games/${game.id}`}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Show Details
                                            </Link>
                                        </TableDataCell>
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
