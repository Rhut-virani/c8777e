import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import { Input, Header, Messages } from './index';
import { uploadImages } from './helper';

const useStyles = makeStyles(() => ({
  root: {},
  headerWrapper: {},
  chatContainer: {
    padding: '1rem 2rem 0 2rem',
    overflow: 'hidden',
  },
  messages: {
    overflowY: 'scroll',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    marginBottom: '1rem',
  },
}));

const ActiveChat = ({
  user,
  conversations,
  activeConversation,
  postMessage,
}) => {
  const [text, setText] = useState('');
  const [uploadURL, setUploadURL] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isCancelledRef = useRef(false);
  const classes = useStyles(uploadURL);

  useEffect(() => {
    // clearing inputs if activeConversation changes
    isCancelledRef.current = true;
    setIsLoading(false);
    setText('');
    setUploadURL([]);
  }, [activeConversation]);

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
    isCancelledRef.current = false;
    setIsLoading(true);
    await uploadImages(e)
      .then(
        (res) =>
          // if upload is cancelled return empty array;
          !isCancelledRef.current && setUploadURL((prev) => [...prev, ...res]),
      )
      .catch((error) => {
        console.error(error);
      });
    setIsLoading(false);
    e.target.value = null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    let reqBody = {
      recipientId: conversation.otherUser.id,
      conversationId: conversation.id,
      sender: conversation.id ? null : user,
      text: formElements.text.value,
      attachments: uploadURL,
    };
    if (!isLoading && (uploadURL.length || text)) {
      await postMessage(reqBody);
      setUploadURL([]);
      setText('');
    }
  };

  const handleClose = async () => {
    isCancelledRef.current = true;
    setIsLoading(false);
    setUploadURL([]);
  };

  return (
    <Grid
      container
      item
      xs={8}
      lg={9}
      alignItems="stretch"
      className={classes.root}
    >
      {isConversation(conversation) && conversation.otherUser && (
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          maxHeight="100%"
        >
          <Box display="flex" flex={1} className={classes.headerWrapper}>
            <Header
              username={conversation.otherUser.username}
              online={conversation.otherUser.online || false}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            flex={8}
            className={classes.chatContainer}
          >
            {user && (
              <>
                <Box flex={6} className={classes.messages}>
                  <Messages
                    messages={conversation.messages}
                    otherUser={conversation.otherUser}
                    userId={user.id}
                    uploadedImages={uploadURL}
                  />
                </Box>
                <Box flex={1} display="flex" alignItems="flex-end">
                  <Input
                    user={user}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleUpload={handleUpload}
                    handleClose={handleClose}
                    uploadedImages={uploadURL}
                    text={text}
                    isLoading={isLoading}
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>
      )}
    </Grid>
  );
};

export default ActiveChat;
