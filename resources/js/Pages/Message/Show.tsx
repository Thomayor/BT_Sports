import React from 'react';
import MessagesList from './MessagesList';
import { Conversation, Message } from '@/types';

interface ShowProps {
  conversation: Conversation;
  messages: Message[];
  auth: { user: { id: number } };
}

function Show({ conversation, messages, auth }: ShowProps) {
  return (
    <MessagesList messages={messages} auth={auth} conversation={conversation} />
  );
}


export default Show;
