import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Input, Header, Messages } from './index';
import { uploadImages } from './helper';

const useStyles = makeStyles(() => ({
  root: {},
  headerWrapper:{
    height:'15%',
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    height: '85%',
    padding:'1.5rem',
  },
  messages:{
    height: '85%',
    overflowY: 'scroll',
    scrollbarWidth: "none" ,
    "&::-webkit-scrollbar": {
      display: "none"
    },
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
    <Grid container item xs={8} className={classes.root}>
      {isConversation(conversation) && conversation.otherUser && (
        <>
          <Grid item xs={12} className={classes.headerWrapper}>
            <Header
              username={conversation.otherUser.username}
              online={conversation.otherUser.online || false}
            />
          </Grid>
          <Grid container item xs={12} className={classes.chatContainer}>
            {user && (
              <>
                <Grid item xs={12} className={classes.messages}>
                  <Messages
                    messages={conversation.messages}
                    otherUser={conversation.otherUser}
                    userId={user.id}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    user={user}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleUpload={handleUpload}
                    uploadURL={uploadURL}
                    text={text}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ActiveChat;
