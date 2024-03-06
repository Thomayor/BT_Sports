import React from 'react';
import { router } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { Team, User } from '@/types';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import Dropdown from '../Dropdown';
import DropdownLink from '../DropdownLink';

interface Props {
  user: User;
}
function DropdownTeamsSide({ user }: Props) {
  const route = useRoute();

  const page = useTypedPage();

  function switchToTeam(e: React.FormEvent, team: Team) {
    e.preventDefault();
    router.put(
      route('current-team.update'),
      {
        team_id: team.id,
      },
      {
        preserveState: false,
      },
    );
  }
  return (
    // close on click outside
    <Dropdown
      align="side-right"
      width="60"
      renderTrigger={() => (
        <span className="inline-flex  rounded-md">
          <button
            type="button"
            className="inline-flex justify-between w-full items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
          >
            Société : {user?.current_team?.name}
            <ChevronRight className="h-4 w-4 ml-2" />
          </button>
        </span>
      )}
    >
      <div className="w-60">
        {page.props.jetstream.hasTeamFeatures ? (
          <>
            <div className="block px-4 py-2 text-xs text-gray-400">
              Manage Team
            </div>

            {/* <!-- Team Settings --> */}
            <DropdownLink href={route('teams.show', [user?.current_team!])}>
              Team Settings
            </DropdownLink>

            {page.props.jetstream.canCreateTeams ? (
              <DropdownLink href={route('teams.create')}>
                Create New Team
              </DropdownLink>
            ) : null}

            <div className="border-t border-gray-200 dark:border-gray-600" />

            {/* <!-- Team Switcher --> */}
            <div className="block px-4 py-2 text-xs text-gray-400">
              Switch Teams
            </div>

            {user?.all_teams?.map((team: Team) => (
              <form onSubmit={e => switchToTeam(e, team)} key={team.id}>
                <DropdownLink as="button">
                  <div className="flex items-center">
                    {team.id === user?.current_team_id && (
                      <svg
                        className="mr-2 h-5 w-5 text-green-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <div>{team.name}</div>
                  </div>
                </DropdownLink>
              </form>
            ))}
          </>
        ) : null}
      </div>
    </Dropdown>
  );
}

export default DropdownTeamsSide;
