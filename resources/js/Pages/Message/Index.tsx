import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ShowMessages from './Show';
import { Conversation, User } from '@/types';


interface IndexProps {
  conversations: Conversation[];
  conversation?: Conversation;
  messages?: any;
  auth: { user: { id: number } };
}

function Index({ conversations, conversation, messages, auth }: IndexProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
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

  
 
  const otherUsers = conversation?.users?.filter(
    (user: User) => user.id !== (auth.user ? auth.user.id : null)
  ) || [];

    const otherUser = otherUsers[0];

  return (
    <AppLayout title="Ma Messagerie">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <span className="text-blue-500 text-2xl ml-2">Messagerie</span>
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
                    filter === 'all' ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  Tous
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('read')}
                  className={`border rounded px-6 py-2 ${
                    filter === 'read' ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  Lus
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('unread')}
                  className={`border rounded py-2 px-3 ${
                    filter === 'unread' ? 'bg-blue-500 text-white' : ''
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
                    <li key={c.id}>
                      <Link
                        href={`/conversations/${c.id}`}
                        className="p-4 flex items-center space-x-4 hover:bg-gray-100 cursor-pointer"
                      >
                        <div className="rounded-full overflow-hidden w-12 h-12">
                          <img
                            src={
                              otherUser?.profile_photo_url ||
                              'https://placekitten.com/200/200'
                            }
                            alt="Utilisateur"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1">
                            {otherUser?.firstname}
                          </h3>
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
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {selectedConversation && (
            <div className="lg:w-4/5">
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

export default Index;
