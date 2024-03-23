import React from 'react';
import MessagesList from './MessagesList';
import { Auth, Conversation, Message } from '@/types';

interface ShowProps {
  conversation: Conversation;
  messages: Message[];
  auth: Auth;
}

function ShowConversation({ conversation, messages, auth }: ShowProps) {
  return (
    <MessagesList messages={messages} auth={auth} conversation={conversation} />
  );
}


export default ShowConversation;
