import React, { useCallback } from 'react';

import { router } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import CreateMessage from './CreateMessage';

function MessagesList(props: { messages: any; auth: any; conversation: any }) {
  const { messages, auth, conversation } = props;
  const displayMessagePosition = (userId: number) => auth.user.id === userId;
  const route = useRoute();

  const submitMessage = useCallback(
    (message: any) => {
      router.post(
        route('conversations.message.store', { id: conversation.id }),
        { message },
      );
    },
    [conversation.id],
  );
  const createdAt = new Date(conversation.created_at);
  const formattedDate = createdAt.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return (
    <div className="scrollbar-hidden ">
      <div className="flex flex-col justify-between w-full">
        <div className="rounded-md  py-3 mb-2 border-b">
          <div className="mx-4 flex items-center">
            <img
              src="/assets/images/logo_without_title.png"
              alt="logo entreprise"
              className="w-12 rounded-full"
            />
            <div className="flex flex-col pl-2 items-center">
              <h2 className="text-2xl font-semibold">{conversation.title}</h2>
              <p className="">
                {conversation.content}-{formattedDate}
              </p>
            </div>
          </div>
        </div>
        {messages.length > 0 &&
          messages.map((content: any) => (
            <div
              key={content.id}
              className={`mt-4 ${
                displayMessagePosition(content.user_id)
                  ? 'flex items-start px-10'
                  : 'flex  items-end justify-end px-10'
              }`}
            >
              <div className="mb-5">
                <div>
                  <p
                    className={`lg:w-100 rounded-md px-4 py-3 text-white ${
                      displayMessagePosition(content.user_id)
                        ? 'bg-blue-500'
                        : 'bg-gray-400'
                    }`}
                  >
                    {content.content}
                  </p>
                  <p className="mt-1 flex items-center text-xs text-slate-500">
                    <img
                      className="mx-1 w-[4%] rounded-full"
                      src={content.user.profile_photo_url}
                      alt="user profile"
                    />
                    {content.user.name} à{' '}
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
