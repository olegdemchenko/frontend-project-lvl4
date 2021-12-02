export default {
  translation: {
    common: {
      nickname: "Your nickname",
      password: "Your password",
      errors: {
        required: "Required field",
      }
    },
    header: {
      chat: "React Chat",
      logout: "Logout",
    },
    login: {
      enter: "Enter",
      noAccount: "Don't have an account?",
      errors: {
        wrongCredentials: "Wrong username or password"
      }
    },
    socket: {
      errors: {
        connectionErr: "Websocket connection error",
        sendMessageErr: "An error has occured during sending the message",
        createChannelErr: "An error has occured during adding a new channel",
        renameChannelErr: "An error has occured during renaming the channel",
        removeChannelErr: "An error has occured during removing the channel",
      }
    },
    chat: {
      errors: {
        fetchDataFailed: "Oops! Something went wrong. Please try again later",
      }
    },
    channels: {
      channels: "Channels",
      delete: "Delete",
      rename: "Rename",
    },
    messages: {
      count_zero: "{{count}} messages",
      count_one: "{{count}} message",
      count_few: "{{count}} messages",
      count_many: "{{count}} messages",
      enterMessage: "Enter a message...",
    },
    modals: {
      common: {
        cancel: "Cancel",
        send: "Send",
        errors: {
          required: "Required field",
          unique: "Must be unique",
        }
      },
      add: {
        addChannel: "Add channel",
      },
      delete: {
        deleteChannel: "Delete channel",
        sure: "Are you sure?",
        delete: "Delete",
      },
      rename: {
        renameChannel: "Rename channel",
      }
    },
    registration: {
      registration: "Registration",
      passwordConfirm: "Confirm password",
      registerMe: "Register me",
      errors: {
        passwordsNotEqual: "Passwords must be equal",
        incorrectNameLength: "Name length must be from 3 to 20 symbols",
        incorrectPasswordLength: "Password length must be no less than 6 symbols",
        duplicatedUsername: "User with such username already exists",
      }
    }
  }
};