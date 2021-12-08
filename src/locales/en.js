export default {
  translation: {
    common: {
      nickname: 'Your nickname',
      password: 'Your password',
      errors: {
        required: 'Required field',
      },
    },
    header: {
      chat: 'React Chat',
      logout: 'Logout',
    },
    login: {
      enter: 'Enter',
      noAccount: "Don't have an account?",
      errors: {
        wrongCredentials: 'Wrong username or password',
      },
    },
    socket: {
      errors: {
        connectionErr: 'Websocket connection error',
      },
    },
    chat: {
      addChannelSuccess: 'Channel is created',
      renameChannelSuccess: 'Channel is renamed',
      removeChannelSuccess: 'Channel is removed',
      errors: {
        fetchDataFailed: 'Oops! Something went wrong. Please try again later',
        addChannelError: 'Error occured during creating a new channel',
        renameChannelError: 'Error occured during renaming the channel',
        removeChannelError: 'Error occured during removing the channel',
        sendMessageError: 'Error occured during sending a message',
      },
    },
    channels: {
      channels: 'Channels',
      delete: 'Delete',
      rename: 'Rename',
    },
    messages: {
      count_zero: '{{count}} messages',
      count_one: '{{count}} message',
      count_few: '{{count}} messages',
      count_many: '{{count}} messages',
      enterMessage: 'Enter a message...',
      newMessage: 'New message',
      send: 'Send',
    },
    modals: {
      common: {
        cancel: 'Cancel',
        send: 'Send',
        channelName: 'Name of the channel',
        errors: {
          required: 'Required field',
          unique: 'Must be unique',
          badLanguage: "You mustn't use profanity",
        },
      },
      add: {
        addChannel: 'Add channel',
      },
      delete: {
        deleteChannel: 'Delete channel',
        sure: 'Are you sure?',
        delete: 'Delete',
      },
      rename: {
        renameChannel: 'Rename channel',
      },
    },
    registration: {
      username: 'User name',
      registration: 'Registration',
      passwordConfirm: 'Confirm password',
      registerMe: 'Register me',
      errors: {
        confirm: 'Confirm password',
        passwordsNotEqual: 'Passwords must be equal',
        incorrectNameLength: 'Name length must be from 3 to 20 symbols',
        incorrectPasswordLength: 'Password length must be no less than 6 symbols',
        duplicatedUsername: 'User with such username already exists',
      },
    },
  },
};
