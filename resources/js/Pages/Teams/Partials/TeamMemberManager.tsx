import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import ActionMessage from '@/Components/ActionMessage';
import ActionSection from '@/Components/ActionSection';
import ConfirmationModal from '@/Components/ConfirmationModal';
import DangerButton from '@/Components/DangerButton';
import DialogModal from '@/Components/DialogModal';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';
import SectionBorder from '@/Components/SectionBorder';
import {
  JetstreamTeamPermissions,
  Nullable,
  Role,
  Team,
  TeamInvitation,
  User,
} from '@/types';
import { router } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useState } from 'react';
import { t } from 'i18next';

interface UserMembership extends User {
  membership: {
    role: string;
  };
}

interface Props {
  team: Team & {
    team_invitations: TeamInvitation[];
    users: UserMembership[];
  };
  availableRoles: Role[];
  userPermissions: JetstreamTeamPermissions;
}

export default function TeamMemberManager({
  team,
  availableRoles,
  userPermissions,
}: Props) {
  const route = useRoute();
  const addTeamMemberForm = useForm({
    email: '',
    role: null as Nullable<string>,
  });
  const updateRoleForm = useForm({
    role: null as Nullable<string>,
  });
  const leaveTeamForm = useForm({});
  const removeTeamMemberForm = useForm({});
  const [currentlyManagingRole, setCurrentlyManagingRole] = useState(false);
  const [managingRoleFor, setManagingRoleFor] = useState<Nullable<User>>(null);
  const [confirmingLeavingTeam, setConfirmingLeavingTeam] = useState(false);
  const [teamMemberBeingRemoved, setTeamMemberBeingRemoved] =
    useState<Nullable<User>>(null);
  const page = useTypedPage();

  function addTeamMember() {
    addTeamMemberForm.post(route('team-members.store', [team]), {
      errorBag: 'addTeamMember',
      preserveScroll: true,
      onSuccess: () => addTeamMemberForm.reset(),
    });
  }

  function cancelTeamInvitation(invitation: TeamInvitation) {
    router.delete(route('team-invitations.destroy', [invitation]), {
      preserveScroll: true,
    });
  }

  function manageRole(teamMember: UserMembership) {
    setManagingRoleFor(teamMember);
    updateRoleForm.setData('role', teamMember.membership.role);
    setCurrentlyManagingRole(true);
  }

  function updateRole() {
    if (!managingRoleFor) {
      return;
    }
    updateRoleForm.put(route('team-members.update', [team, managingRoleFor]), {
      preserveScroll: true,
      onSuccess: () => setCurrentlyManagingRole(false),
    });
  }

  function confirmLeavingTeam() {
    setConfirmingLeavingTeam(true);
  }

  function leaveTeam() {
    leaveTeamForm.delete(
      route('team-members.destroy', [team, page.props.auth.user!]),
    );
  }

  function confirmTeamMemberRemoval(teamMember: User) {
    setTeamMemberBeingRemoved(teamMember);
  }

  function removeTeamMember() {
    if (!teamMemberBeingRemoved) {
      return;
    }
    removeTeamMemberForm.delete(
      route('team-members.destroy', [team, teamMemberBeingRemoved]),
      {
        errorBag: 'removeTeamMember',
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => setTeamMemberBeingRemoved(null),
      },
    );
  }

  function displayableRole(role: string) {
    return availableRoles.find(r => r.key === role)?.name;
  }

  return (
    <div>
      {userPermissions.canAddTeamMembers ? (
        <div>
          <SectionBorder />

          {/* <!-- Add Team Member --> */}
          <FormSection
            onSubmit={addTeamMember}
            title={t('pages.team.addTeamMember')}
            description={t('pages.team.descTeamMember')}
            renderActions={() => (
              <>
                <ActionMessage
                  on={addTeamMemberForm.recentlySuccessful}
                  className="mr-3"
                >
                  {t('pages.team.added')}
                </ActionMessage>

                <PrimaryButton
                  className={classNames({
                    'opacity-25': addTeamMemberForm.processing,
                  })}
                  disabled={addTeamMemberForm.processing}
                >
                  {t('pages.team.add')}
                </PrimaryButton>
              </>
            )}
          >
            <div className="col-span-6">
              <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
                {t('pages.team.addEmail')}
              </div>
            </div>

            {/* <!-- Member Email --> */}
            <div className="col-span-6 sm:col-span-4">
              <InputLabel htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                className="mt-1 block w-full"
                value={addTeamMemberForm.data.email}
                onChange={e =>
                  addTeamMemberForm.setData('email', e.currentTarget.value)
                }
              />
              <InputError
                message={addTeamMemberForm.errors.email}
                className="mt-2"
              />
            </div>

            {/* <!-- Role --> */}
            {availableRoles.length > 0 ? (
              <div className="col-span-6 lg:col-span-4">
                <InputLabel htmlFor="roles" value="Role" />
                <InputError
                  message={addTeamMemberForm.errors.role}
                  className="mt-2"
                />

                <div className="relative z-0 mt-1 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer">
                  {availableRoles.map((role, i) => (
                    <button
                      type="button"
                      className={classNames(
                        'relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none focus:border-sky-500 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-500',
                        {
                          'border-t border-gray-200 dark:border-gray-700 focus:border-none rounded-t-none':
                            i > 0,
                          'rounded-b-none':
                            i != Object.keys(availableRoles).length - 1,
                        },
                      )}
                      onClick={() =>
                        addTeamMemberForm.setData('role', role.key)
                      }
                      key={role.key}
                    >
                      <div
                        className={classNames({
                          'opacity-50':
                            addTeamMemberForm.data.role &&
                            addTeamMemberForm.data.role != role.key,
                        })}
                      >
                        {/* <!-- Role Name --> */}
                        <div className="flex items-center">
                          <div
                            className={classNames(
                              'text-sm text-gray-600 dark:text-gray-400',
                              {
                                'font-semibold':
                                  addTeamMemberForm.data.role == role.key,
                              },
                            )}
                          >
                            {t(`pages.team.roles.${role.key}.name`)}
                          </div>

                          {addTeamMemberForm.data.role == role.key ? (
                            <svg
                              className="ml-2 h-5 w-5 text-green-400"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          ) : null}
                        </div>

                        {/* <!-- Role Description --> */}
                        <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                          {t(`pages.team.roles.${role.key}.description`)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </FormSection>
        </div>
      ) : null}

      {team.team_invitations.length > 0 && userPermissions.canAddTeamMembers ? (
        <div>
          <SectionBorder />

          {/* <!-- Team Member Invitations --> */}
          <div className="mt-10 sm:mt-0" />

          <ActionSection
            title={t('pages.team.pending')}
            description={t('pages.team.descPending')}
          >
            {/* <!-- Pending Team Member Invitation List --> */}
            <div className="space-y-6">
              {team.team_invitations.map(invitation => (
                <div
                  className="flex items-center justify-between"
                  key={invitation.id}
                >
                  <div className="text-gray-600 dark:text-gray-400">
                    {invitation.email}
                  </div>

                  <div className="flex items-center">
                    {/* <!-- Cancel Team Invitation --> */}
                    {userPermissions.canRemoveTeamMembers ? (
                      <button
                        className="cursor-pointer ml-6 text-sm text-red-500 focus:outline-none"
                        onClick={() => cancelTeamInvitation(invitation)}
                      >
                        {t('pages.team.cancel')}
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </ActionSection>
        </div>
      ) : null}

      {team.users.length > 0 ? (
        <div>
          <SectionBorder />

          {/* <!-- Manage Team Members --> */}
          <div className="mt-10 sm:mt-0" />

          <ActionSection
            title={t('pages.team.teamMember')}
            description={t('pages.team.teamMemberDesc')}
          >
            {/* <!-- Team Member List --> */}
            <div className="space-y-6">
              {team.users.map(user => (
                <div
                  className="flex items-center justify-between"
                  key={user.id}
                >
                  <div className="flex items-center">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user.profile_photo_url}
                      alt={user.firstname}
                    />
                    <div className="ml-4 dark:text-white">{user.firstname}</div>
                  </div>

                  <div className="flex items-center">
                    {/* <!-- Manage Team Member Role --> */}
                    {userPermissions.canAddTeamMembers &&
                    availableRoles.length ? (
                      <button
                        className="ml-2 text-sm text-gray-400 underline"
                        onClick={() => manageRole(user)}
                      >
                        {displayableRole(user.membership.role)}
                      </button>
                    ) : availableRoles.length ? (
                      <div className="ml-2 text-sm text-gray-400">
                        {displayableRole(user.membership.role)}
                      </div>
                    ) : null}

                    {/* <!-- Leave Team --> */}
                    {page.props.auth.user?.id === user.id ? (
                      <button
                        className="cursor-pointer ml-6 text-sm text-red-500"
                        onClick={confirmLeavingTeam}
                      >
                        {t('pages.team.leave')}
                      </button>
                    ) : null}

                    {/* <!-- Remove Team Member --> */}
                    {userPermissions.canRemoveTeamMembers ? (
                      <button
                        className="cursor-pointer ml-6 text-sm text-red-500"
                        onClick={() => confirmTeamMemberRemoval(user)}
                      >
                        {t('pages.team.remove')}
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </ActionSection>
        </div>
      ) : null}

      {/* <!-- Role Management Modal --> */}
      <DialogModal
        isOpen={currentlyManagingRole}
        onClose={() => setCurrentlyManagingRole(false)}
      >
        <DialogModal.Content
          title={t('pages.team.manageRole')}
        ></DialogModal.Content>
        {managingRoleFor ? (
          <div>
            <div className="relative z-0 mt-1 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer">
              {availableRoles.map((role, i) => (
                <button
                  type="button"
                  className={classNames(
                    'relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none focus:border-sky-500 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-500',
                    {
                      'border-t border-gray-200 dark:border-gray-700 focus:border-none rounded-t-none':
                        i > 0,
                      'rounded-b-none':
                        i !== Object.keys(availableRoles).length - 1,
                    },
                  )}
                  onClick={() => updateRoleForm.setData('role', role.key)}
                  key={role.key}
                >
                  <div
                    className={classNames({
                      'opacity-50':
                        updateRoleForm.data.role &&
                        updateRoleForm.data.role !== role.key,
                    })}
                  >
                    {/* <!-- Role Name --> */}
                    <div className="flex items-center">
                      <div
                        className={classNames(
                          'text-sm text-gray-600 dark:text-gray-400',
                          {
                            'font-semibold':
                              updateRoleForm.data.role === role.key,
                          },
                        )}
                      >
                        {role.name}
                      </div>
                      {updateRoleForm.data.role === role.key ? (
                        <svg
                          className="ml-2 h-5 w-5 text-green-400"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      ) : null}
                    </div>

                    {/* <!-- Role Description --> */}
                    <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                      {role.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <DialogModal.Footer>
          <SecondaryButton onClick={() => setCurrentlyManagingRole(false)}>
            {t('pages.team.cancel')}
          </SecondaryButton>

          <PrimaryButton
            onClick={updateRole}
            className={classNames('ml-2', {
              'opacity-25': updateRoleForm.processing,
            })}
            disabled={updateRoleForm.processing}
          >
            {t('pages.team.save')}
          </PrimaryButton>
        </DialogModal.Footer>
      </DialogModal>

      {/* <!-- Leave Team Confirmation Modal --> */}
      <ConfirmationModal
        isOpen={confirmingLeavingTeam}
        onClose={() => setConfirmingLeavingTeam(false)}
      >
        <ConfirmationModal.Content title={t('pages.team.leaveTeam')}>
          {t('pages.team.confirmLeave')}
        </ConfirmationModal.Content>
        <ConfirmationModal.Footer>
          <SecondaryButton onClick={() => setConfirmingLeavingTeam(false)}>
            {t('pages.team.cancel')}
          </SecondaryButton>

          <DangerButton
            onClick={leaveTeam}
            className={classNames('ml-2', {
              'opacity-25': leaveTeamForm.processing,
            })}
            disabled={leaveTeamForm.processing}
          >
            {t('pages.team.leave')}
          </DangerButton>
        </ConfirmationModal.Footer>
      </ConfirmationModal>

      {/* <!-- Remove Team Member Confirmation Modal --> */}
      <ConfirmationModal
        isOpen={!!teamMemberBeingRemoved}
        onClose={() => setTeamMemberBeingRemoved(null)}
      >
        <ConfirmationModal.Content title={t('pages.team.removeTeamMember')}>
          {t('pages.team.confirmRemove')}
        </ConfirmationModal.Content>
        <ConfirmationModal.Footer>
          <SecondaryButton onClick={() => setTeamMemberBeingRemoved(null)}>
            {t('pages.team.cancel')}
          </SecondaryButton>

          <DangerButton
            onClick={removeTeamMember}
            className={classNames('ml-2', {
              'opacity-25': removeTeamMemberForm.processing,
            })}
            disabled={removeTeamMemberForm.processing}
          >
            {t('pages.team.remove')}
          </DangerButton>
        </ConfirmationModal.Footer>
      </ConfirmationModal>
    </div>
  );
}
