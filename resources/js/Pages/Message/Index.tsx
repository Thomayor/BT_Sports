// Import des modules nécessaires
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ShowMessages from './Show';
import { Conversation } from '@/types';

// Interface pour les propriétés du composant
interface IndexProps {
  conversations: Conversation[];
  conversation?: Conversation;
  messages?: any;
  auth: { user: { id: number } };
}

// Composant principal
function Index({ conversations, conversation, messages, auth }: IndexProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const selectedConversation: Conversation | undefined = conversation;

  // Filtrage des conversations en fonction de la recherche et des filtres
  const filteredConversations = conversations.filter(c => {
    const searchMatch = c.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isRead = c.messages.length > 0;
    const isUnread = !isRead;

    if (filter === 'all') return searchMatch;
    if (filter === 'read') return isRead && searchMatch;
    if (filter === 'unread') return isUnread && searchMatch;

    return true;
  });

  // Rendu du composant
  return (
    <AppLayout title="Ma Messagerie">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <span className="text-primary text-2xl">Messagerie</span>
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
                {/* ... (autres boutons de filtre) */}
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
                              c.profile_photo_url ||
                              'https://placekitten.com/200/200'
                            }
                            alt="Utilisateur"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1">
                          {c.messages[c.messages.length - 1]?.user?.firstname || 'Utilisateur'}
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
