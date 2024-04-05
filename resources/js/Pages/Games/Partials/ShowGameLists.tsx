import React, { useState } from 'react';
import { ShowGameListProps, User } from '@/types';
import formatDate from '@/Services/formatDate';
import formatTime from '@/Services/formatTime';
import PrimaryButton from '@/Components/PrimaryButton';
import useTypedPage from '@/Hooks/useTypedPage';
import useRoute from '@/Hooks/useRoute';
import { Link, useForm as inertiaForm } from '@inertiajs/react';
import { router } from '@inertiajs/core';
import SendMessageModal from '@/Components/SendMessage';
import DefinitionListItem from '@/Components/Game/DefinitionListItem';
import DefinitionList from '@/Components/Game/DefinitionList';
import { t } from 'i18next';
import { Button } from '@/Components/ui';

export default function ShowGameLists({
  game,
  sport,
  playground,
  teams,
}: ShowGameListProps) {
  const page = useTypedPage();
  const route = useRoute();

  {
    /* SET TEAMS & OWNERS VARIABLES */
  }
  const homeTeam = teams[0].users;
  const homeOwner = teams[0].owner;
  const awayTeam = teams.length > 1 ? teams[1].users || null : null;
  const awayOwner = teams.length > 1 ? teams[1].owner || null : null;
  const lengthHomeTeam = homeTeam.length;
  const lengthAwayTeam = awayTeam ? awayTeam.length : 0;
  const totalLength = lengthHomeTeam + lengthAwayTeam;
  const userID = page.props.auth.user?.id;
  const numTeams = teams.length;

  {
    /* DELETE GAME */
  }
  const { delete: destroy, reset } = inertiaForm({
    game,
  });

  const deleteGame = (gameID: number, e: React.MouseEvent) => {
    e.preventDefault();
    destroy(route('games.destroy', { id: gameID }), {
      preserveScroll: true,
      onFinish: () => reset(),
    });
  };

  {
    /* CONTACT TEAM OWNER MODAL */
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiverId, setRecieverId] = useState<number | null>(null);
  const handleSendMessageSubmit = ({ content }: { content: string }) => {
    router.post(route('conversations.store', { id: receiverId }), {
      content,
    });
    setIsModalOpen(false);
    setRecieverId(null);
  };

  return (
    <div>
      <div className="mt-6 bg-white flex flex-col max-w-full lg:flex-row justify-around rounded-lg mx-1 px-2 max-h-auto border-solid border border-sky-600">
        {/* DISPLAY HOME OWNER & HOME TEAM DATAS */}
        <div className="my-2 mx-14 sm:mx-auto">
          <div className="grid gap-y-4 sm:gap-y-6">
            <div className="max-w-2xl">
              <p className="text-3xl tracking-tight text-sky-600 sm:text-4xl text-center">
                {teams[0].name}
              </p>
            </div>
            <ul role="list" className="flex flex-col gap-y-12">
              {homeOwner && (
                <li key={homeOwner.id} className="max-w-xs sm:max-w-none">
                  <div className="flex items-center gap-x-6">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={homeOwner.profile_photo_url}
                      alt={`HomeOwner : ${homeOwner.firstname}`}
                    />
                    <div>
                      <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                        {homeOwner.firstname}
                      </h3>
                    </div>

                    {homeOwner.id !== userID && (
                      <PrimaryButton
                        className="bg-sky-600 text-white py-2 px-4 rounded mt-2 sm:flex flex-col"
                        onClick={() => {
                          setIsModalOpen(true);
                          setRecieverId(homeOwner.id);
                        }}
                      >
                        {t('pages.games.contact')}
                      </PrimaryButton>
                    )}
                  </div>
                </li>
              )}

              {homeTeam.map((person: User) => (
                <li key={person.id} className="max-w-xs sm:max-w-none">
                  <div className="flex items-center gap-x-6">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={person.profile_photo_url}
                      alt={`HomeTeamMember : ${person.firstname}`}
                    />
                    <div>
                      <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                        {person.firstname}
                      </h3>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {numTeams === 2 && (
          <div className="flex justify-center items-center">
            <img className=" my-2 w-40 h-40" src="/assets/vs.png" alt="VS" />
          </div>
        )}

        {/* DISPLAY AWAY OWNER & AWAY TEAM DATA */}
        {awayTeam && (
          <div className="mt-2 mb-6 mx-14 sm:mx-auto">
            <div className="grid gap-y-3 sm:gap-y-6">
              <div className="max-w-2xl">
                <p className="text-3xl tracking-tight text-red-700 sm:text-4xl text-center">
                  {teams[1].name}
                </p>
              </div>
              <ul role="list" className="flex flex-col gap-y-12">
                {awayOwner && (
                  <li key={awayOwner.id} className="max-w-xs sm:max-w-none">
                    <div className="flex items-center gap-x-6">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={awayOwner.profile_photo_url}
                        alt={`AwayOwner : ${awayOwner.firstname}`}
                      />
                      <div>
                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                          {awayOwner.firstname}
                        </h3>
                      </div>

                      {awayOwner.id !== userID && (
                        <Button
                          className="bg-red-700 text-white p-2 rounded sm:flex flex-col items-center"
                          onClick={() => {
                            setIsModalOpen(true);
                            setRecieverId(awayOwner.id);
                          }}
                        >
                          {t('pages.games.contact')}
                        </Button>
                      )}
                    </div>
                  </li>
                )}

                {awayTeam.map((person: User) => (
                  <li key={person.id} className="max-w-xs sm:max-w-none">
                    <div className="flex items-center gap-x-6">
                      <img
                        className="h-16 w-16 rounded-full"
                        src={person.profile_photo_url}
                        alt={`AwaTeamMember : ${person.firstname}`}
                      />
                      <div>
                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                          {person.firstname}
                        </h3>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* SEND MESSAGE MODAL */}

        {isModalOpen && (
          <SendMessageModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={({ content }) => handleSendMessageSubmit({ content })}
          />
        )}
      </div>
      {/* GAME DATAS */}
      <div className="bg-white flex flex-col justify-evenly rounded-lg mt-10 mx-1 px-2 max-h-auto border-solid border border-sky-600">
        <div className="">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            {t('pages.games.info')}
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            {t('pages.games.infodescription')}
          </p>
        </div>

        <DefinitionList>
          <DefinitionListItem
            term={t('pages.games.sport')}
            description={`${sport[0].name}`}
          />
          <DefinitionListItem
            term={t('pages.games.date')}
            description={formatDate(game.date)}
          />
          <DefinitionListItem
            term={t('pages.games.fromto')}
            description={`${formatTime(game.start_time)} / ${formatTime(
              game.end_time,
            )}`}
          />
          <DefinitionListItem
            term={t('pages.games.players')}
            description={`${totalLength + numTeams} / ${game.max_player}`}
          />
          <DefinitionListItem
            term={t('pages.games.playground')}
            description={`${playground[0].name}`}
          />
          <DefinitionListItem
            term={t('pages.games.address')}
            description={`${playground[0].address}, ${playground[0].postcode} ${playground[0].city}`}
          />

          <div className="flex justify-start">
            {/* DISPLAY ONLY IF ONE TEAM IS ASSOCIATED TO THE GAME */}
            {numTeams < 2 && userID !== game.user_id && (
              <Button className="opacity-80 mt-6 bg-sky-500 mr-2">
                <Link href={`${game.id}/join-team`}>
                  {t('pages.games.join')}
                </Link>
              </Button>
            )}

            {/* DISPLAY ONLY FOR THE OWNER OF THE GAME */}
            {userID === game.user_id && (
              <>
                <Button className="opacity-80 mt-6 bg-green-700 mr-2">
                  <Link href={`${game.id}/edit`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </Link>
                </Button>

                <Button
                  className="opacity-80 mt-6 bg-red-700"
                  onClick={e => deleteGame(game.id, e)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </Button>
              </>
            )}
          </div>
        </DefinitionList>
      </div>
    </div>
  );
}
