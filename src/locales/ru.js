export default {
  translation: {
    common: {
      nickname: 'Ваш ник',
      password: 'Пароль',
      errors: {
        required: 'Обязательное поле',
      },
    },
    header: {
      chat: 'Hexlet Chat',
      logout: 'Выйти',
    },
    login: {
      enter: 'Войти',
      nickname: 'Ваш ник',
      password: 'Пароль',
      noAccount: 'Нет аккаунта?',
      registration: 'Регистрация',
      errors: {
        wrongCredentials: 'Неверные имя пользователя или пароль',
      },
    },
    socket: {
      errors: {
        connectionErr: 'Ошибка соединения websocket',
      },
    },
    chat: {
      addChannelSuccess: 'Канал создан',
      renameChannelSuccess: 'Канал переименован',
      removeChannelSuccess: 'Канал удалён',
      errors: {
        fetchDataFailed: 'Ошибка соединения',
        addChannelError: 'Произошла ошибка при создании нового канала',
        renameChannelError: 'Произошла ошибка при переименовании канала',
        removeChannelError: 'Произошла ошибка при удалении канала',
        sendMessageError: 'Произошла ошибка при отправке сообщения',
      },
    },
    channels: {
      channels: 'Каналы',
      delete: 'Удалить',
      rename: 'Переименовать',
    },
    messages: {
      count_zero: '{{count}} сообщений',
      count_one: '{{count}} сообщение',
      count_few: '{{count }} сообщения',
      count_many: '{{count}} сообщений',
      enterMessage: 'Введите сообщение...',
      newMessage: 'Новое сообщение',
      send: 'Отправить',
    },
    modals: {
      common: {
        cancel: 'Отменить',
        send: 'Отправить',
        channelName: 'Имя канала',
        channelControl: 'Управление каналом',
        errors: {
          required: 'Обязательное поле',
          unique: 'Должно быть уникальным',
          badLanguage: 'Нельзя использовать нецензурную лексику',
        },
      },
      add: {
        addChannel: 'Добавить канал',
      },
      delete: {
        deleteChannel: 'Удалить канал',
        sure: 'Уверены?',
        delete: 'Удалить',
      },
      rename: {
        renameChannel: 'Переименовать канал',
      },
    },
    registration: {
      username: 'Имя пользователя',
      registration: 'Регистрация',
      passwordConfirm: 'Подтвердите пароль',
      registerMe: 'Зарегистрироваться',
      errors: {
        confirm: 'Подтвердите пароль',
        passwordsNotEqual: 'Пароли должны совпадать',
        incorrectNameLength: 'От 3 до 20 символов',
        incorrectPasswordLength: 'Не менее 6 символов',
        duplicatedUsername: 'Такой пользователь уже существует',
      },
    },
  },
};
