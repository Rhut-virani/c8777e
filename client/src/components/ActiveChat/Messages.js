import React, { useEffect, useRef } from 'react';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const endMessagesRef = useRef();

  useEffect(() => {
    if (endMessagesRef.current) {
      endMessagesRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            attachments={message.attachments}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            attachments={message.attachments}
          />
        );
      })}
      {/* Ref point to scroll to the newest message */}
      <div ref={endMessagesRef} />
    </>
  );
};

export default Messages;
