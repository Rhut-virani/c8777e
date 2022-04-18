import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Input, Header, Messages } from './index';
import { uploadImages } from './helper';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 8,
    flexDirection: 'column',
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
}));

const ActiveChat = ({
  user,
  conversations,
  activeConversation,
  postMessage,
}) => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [uploadURL, setUploadURL] = useState([]);

  const conversation = conversations
    ? conversations.find(
        (conversation) =>
          conversation.otherUser.username === activeConversation,
      )
    : {};

  const isConversation = (obj) => {
    return obj !== {} && obj !== undefined;
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const uploadedUrls = await uploadImages(e);
    setUploadURL(uploadedUrls);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.currentTarget);
    const form = event.currentTarget;
    const formElements = form.elements;
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: formElements.text.value,
      recipientId: conversation.otherUser.id,
      conversationId: conversation.id,
      sender: conversation.id ? null : user,
      attachments: uploadURL,
    };
    await postMessage(reqBody);
    setText('');
  };

  return (
    <Box className={classes.root}>
      {isConversation(conversation) && conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            {user && (
              <>
                <Messages
                  messages={conversation.messages}
                  otherUser={conversation.otherUser}
                  userId={user.id}
                />
                <Input
                  user={user}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  handleUpload={handleUpload}
                  uploadURL={uploadURL}
                  text={text}
                />
              </>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ActiveChat;
