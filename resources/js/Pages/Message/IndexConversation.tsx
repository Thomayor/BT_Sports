import React, { useState } from 'react';
import { Link, useForm as inertiaForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ShowMessages from './Show';
import { Auth, Conversation, User } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faDeleteLeft,
  faEllipsis,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import useRoute from '@/Hooks/useRoute';

interface IndexProps {
  conversations: Conversation[];
  conversation?: Conversation;
  messages?: any;
  auth: Auth;
}

function IndexConversation({ conversations, conversation, messages, auth }: IndexProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showDropdown, setShowDropdown] = useState(false);
  const selectedConversation: Conversation | undefined = conversation;

  const filteredConversations = conversations.filter(c => {
    const matchingMessages = c.messages.filter(message =>
      message.content.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const hasMatchingMessages = matchingMessages.length > 0;
    const isRead = c.messages.length > 0;
    const isUnread = !isRead;

    if (filter === 'all') return hasMatchingMessages;
    if (filter === 'read') return isRead && hasMatchingMessages;
    if (filter === 'unread') return isUnread && hasMatchingMessages;

    return true;
  });
  const route = useRoute();
  const {
    delete: destroy,
    reset,
  } = inertiaForm({
    conversation,
  });

  const deleteConversation = (conversationId: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    destroy(route('conversation.destroy',  { id: conversationId }), {
      preserveScroll: true,
      onSuccess: () => setShowDropdown(showDropdown),
      onFinish: () => reset(),
    });
  };

  return (
    <AppLayout title="Ma Messagerie">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
        <h2 className="text-sky-500 text-2xl ml-2 mb-5">Messagerie</h2>
        </div>
      </div>

      <div className="mx-4 bg-white rounded-xl">
        <h2 className="p-4 text-2xl font-semibold">Boîte de réception</h2>
        <div className="flex flex-col lg:flex-row">
          <div
            className={
              selectedConversation ? 'lg:w-[25%] lg:border-r' : 'w-full'
            }
          >
            <div className="px-4 flex flex-col">
              <input
                type="text"
                placeholder="Rechercher par mot-clé"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border rounded p-2"
              />
              <div className="mt-2 sm:space-x-2">
                <button
                  type="button"
                  onClick={() => setFilter('all')}
                  className={`border rounded  px-5 py-2 ${
                    filter === 'all' ? 'bg-sky-500 text-white' : ''
                  }`}
                >
                  Tous
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('read')}
                  className={`border rounded px-6 py-2 ${
                    filter === 'read' ? 'bg-sky-500 text-white' : ''
                  }`}
                >
                  Lus
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('unread')}
                  className={`border rounded py-2 px-3 ${
                    filter === 'unread' ? 'bg-sky-500 text-white' : ''
                  }`}
                >
                  Non lus
                </button>
              </div>
            </div>
            {filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Vous n&apos;avez pas de messages.
              </div>
            ) : (
              <div>
                <ul className="divide-y divide-gray-300">
                  {filteredConversations.map(c => (
                    <li
                      key={c.id}
                      className="hover:bg-gray-50 cursor-pointer rounded-lg mt-1 p-4 flex items-center space-x-4"
                    >
                      <Link href={`/conversations/${c.id}`}>
                        <div className="rounded-full overflow-hidden w-12 h-12">
                          <img
                            src={
                              (c.messages.length > 0 &&
                                (auth.user?.id ===
                                c.messages[c.messages.length - 1].user.id
                                  ? c.users.find(
                                      (u: User) => u.id !== auth.user?.id,
                                    )?.profile_photo_url
                                  : c.messages[c.messages.length - 1].user
                                      .profile_photo_url)) ||
                              'https://placekitten.com/200/200'
                            }
                            alt="Utilisateur"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                      <div className="flex-1">
                        <div className="relative">
                          <Link href={`/conversations/${c.id}`}>
                            <h3 className="text-lg font-semibold mb-1">
                              {c.messages.length > 0 &&
                                (auth.user?.id ===
                                c.messages[c.messages.length - 1].user.id
                                  ? c.users.find(
                                      (u: User) => u.id !== auth.user?.id,
                                    )?.firstname
                                  : c.messages[c.messages.length - 1].user
                                      .firstname)}
                            </h3>
                          </Link>

                          <button
                            className="absolute top-1 right-2 cursor-pointer rounded-full border px-2 hover:border-sky-500"
                            onClick={() => setShowDropdown(!showDropdown)}
                          >
                            <FontAwesomeIcon
                              icon={faEllipsis}
                              className="w-15 h-15"
                            />
                          </button>
                          {showDropdown && (
                            <form className="absolute top-8 right-0 bg-white shadow-md rounded-md p-6">
                              <button
                                className="flex space-x-2 items-center hover:text-red-500"
                                onClick={e => deleteConversation(c.id, e)}
                              >
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="w-15 h-15 text-red-500"
                                />
                                <span>Supprimer</span>
                              </button>
                            </form>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 flex justify-between">
                          {c.messages.length > 0 && (
                            <>
                              <span>
                                {c.messages[c.messages.length - 1]?.content ||
                                  ''}
                              </span>
                              <span>
                                {new Date(
                                  c.messages[c.messages.length - 1]
                                    ?.updated_at || '',
                                ).toLocaleTimeString('fr-FR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: 'numeric',
                                  minute: 'numeric',
                                })}
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {selectedConversation && (
            <div className="lg:w-4/5 ">
              <ShowMessages
                conversation={selectedConversation}
                messages={messages}
                auth={auth}
              />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default IndexConversation;
