import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import { Input, Header, Messages } from './index';
import { deleteImages, uploadImages } from './helper';

const useStyles = makeStyles(() => ({
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
  setErrorMessage,
  setSnackBarOpen,
}) => {
  const [text, setText] = useState('');
  const [uploadURL, setUploadURL] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isCancelledRef = useRef(false);
  const classes = useStyles();

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
      .then((res) => {
        //  set State only if user has not cancelled upload
        !isCancelledRef.current && setUploadURL((prev) => [...prev, ...res]);
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
        setSnackBarOpen(true);
      });
    setIsLoading(false);
    e.target.value = null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;

    const attachments = uploadURL.map((data) => {
      return data.url;
    });
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    let reqBody = {
      recipientId: conversation.otherUser.id,
      conversationId: conversation.id,
      sender: conversation.id ? null : user,
      text: formElements.text.value,
      attachments: attachments,
    };
    if (!isLoading && (uploadURL.length || text)) {
      await postMessage(reqBody);
      setUploadURL([]);
      setText('');
    }
  };

  const handleClose = async () => {
    // remove all selected images fom the Cloudinary
    deleteImages(uploadURL);
    isCancelledRef.current = true;
    setIsLoading(false);
    setUploadURL([]);
  };

  const handleRemove = (image) => {
    //remove one selected image from Cloudinary
    deleteImages([image]);
    setUploadURL((prev) => {
      return prev.filter((url) => {
        return url.id !== image.id;
      });
    });
  };

  return (
    <Grid container item xs={8} lg={9} alignItems="stretch">
      {isConversation(conversation) && conversation.otherUser && (
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          maxHeight="100%"
        >
          <Box display="flex" flex={1}>
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
                  />
                </Box>
                <Box flex={1} display="flex" alignItems="flex-end">
                  <Input
                    user={user}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleUpload={handleUpload}
                    handleClose={handleClose}
                    handleRemove={handleRemove}
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
