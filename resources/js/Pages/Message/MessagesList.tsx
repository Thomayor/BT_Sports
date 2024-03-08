import React, { useCallback } from 'react';

import { router } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import CreateMessage from './CreateMessage';
import { Auth, Conversation, Message, User } from '@/types';

function MessagesList(props: {
  messages: Message[];
  auth: Auth;
  conversation: Conversation;
}) {
  const { messages, auth, conversation } = props;

  const displayMessagePosition = (userId: number) => auth.user?.id === userId;

  const route = useRoute();

  const submitMessage = useCallback(
    (message: string) => {
      router.post(
        route('conversations.message.store', { id: conversation.id }),
        { message },
      );
    },
    [conversation.id],
  );

  const sortedMessages = messages
    .slice()
    .sort(
      (
        a: { created_at: string | number | Date },
        b: { created_at: string | number | Date },
      ) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();

        return dateA - dateB;
      },
  );
  
 

  return (
    <div className="scrollbar-hidden ">
      <div className="flex flex-col justify-between w-full">
        <div className="rounded-md  py-3 mb-2 border-b">
          {auth.user &&
            conversation.users
              .filter(
                (user: User) => user.id !== (auth.user ? auth.user.id : null),
              )
              .map((filteredUser: User) => (
                <div key={filteredUser.id} className="mx-4 flex items-center">
                  <img
                    src={
                      filteredUser.profile_photo_url ||
                      '/assets/images/logo_without_title.png'
                    }
                    alt="User profile"
                    className="w-12 rounded-full"
                  />
                  <div className="flex flex-col pl-2 items-center">
                    <h2 className="text-2xl font-semibold">
                      {filteredUser.firstname}
                    </h2>
                  </div>
                </div>
              ))}
        </div>
        {sortedMessages.length > 0 &&
          sortedMessages.map((content: Message) => (
            <div
              key={content.id}
              className={`mt-4 ${
                displayMessagePosition(content.user_id)
                  ? 'flex items-start px-6'
                  : 'flex  items-end justify-end px-6'
              }`}
            >
              <div className="mb-2">
                <div>
                  <p
                    className={`xl:w-80 rounded-md px-4 py-1 text-white ${
                      displayMessagePosition(content.user_id)
                        ? 'bg-blue-500'
                        : 'bg-gray-400'
                    }`}
                  >
                    {content.content}
                  </p>
                  <p className="mt-1 flex items-center text-xs text-slate-500">
                    <img
                      className="mx-1 w-[10%] rounded-full"
                      src={content.user.profile_photo_url}
                      alt="user profile"
                    />
                    {content.user.firstname} à{' '}
                    {new Date(content.created_at).toLocaleTimeString()} le{' '}
                    {new Date(content.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}

        <CreateMessage submitMessage={submitMessage} />
      </div>
    </div>
  );
}

export default MessagesList;
