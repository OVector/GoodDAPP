// @flow
import { createConnectedStore } from 'undux'
import { isString, over } from 'lodash'

import pinoLogger from '../logger/js-logger'
import { IS_LOGGED_IN } from '../../lib/constants/localStorage'
import AsyncStorage from '../../lib/utils/asyncStorage'
import createStoreEffects, { unduxLogger } from './plugins'
import { createUseCurriedSettersHook, createUseStorePropHook } from './utils/props'

/**
 * Dialog data. This is being used to show a dialog across the app
 * @type {{visible: boolean}, {title?: string}, {message?: string}}
 */
type DialogData = {
  visible: boolean,
  title?: string,
  message?: string,
}

/**
 * Current screen state data
 * @type {{dialogData?: DialogData}, {loading: boolean}}
 */
type CurrentScreen = {
  dialogData?: DialogData,
  loading: boolean,
}

/**
 * Loading indicator screen status. In true means that there is a loading overlay over the current screen
 * @type {{loading: boolean}}
 */
type LoadingIndicator = {
  loading: boolean,
}

/**
 * Type definition for the global store
 * @type {
   {currentScreen: CurrentScreen},
   {destinationPath: string},
   {loadingIndicator: LoadingIndicator},
   {isLoggedIn: boolean},
   {sidemenu: { visible: boolean }}
  }
 */
export type State = {
  currentScreen: CurrentScreen,
  destinationPath: string,
  loadingIndicator: LoadingIndicator,
  isLoggedIn: boolean,
  feedLoadAnimShown: boolean,
  wallet: any,
  userStorage: any,
  sidemenu: {
    visible: boolean,
  },
  isMobileSafariKeyboardShown: boolean,
  isMobileKeyboardShown: boolean,
  currentFeed: any,
  addWebApp: {
    show: boolean,
    showAddWebAppDialog: boolean,
  },
  serviceWorkerUpdated: any,
}

/**
 * Initial store state
 * @constant
 */
const initialState: State = {
  isLoggedIn: false,
  feedLoadAnimShown: false,
  currentScreen: {
    dialogData: {
      visible: false,
    },
    loading: false,
  },
  destinationPath: '',
  loadingIndicator: {
    loading: false,
  },
  sidemenu: {
    visible: false,
  },
  isMobileSafariKeyboardShown: false,
  isMobileKeyboardShown: false,
  currentFeed: null,
  addWebApp: {
    show: false,
    showAddWebAppDialog: false,
  },
  wallet: null,
  userStorage: null,
  regMethod: 'torus',
}

const { storeAccessor, storeEffects } = createStoreEffects()

/**
 * default exported instance of our global Undux Store
 * @module
 */
let SimpleStore: UnduxStore = createConnectedStore(initialState, storeEffects) // default value for tests

// functions which set userStorage and wallet to simple storage in init.js

const storeAssertion = (condition, logger, message) => {
  let log = logger
  const assertionFailed = condition()

  if (isString(logger)) {
    log = pinoLogger.child({ from: logger })
  }

  if (assertionFailed) {
    log.warn(message, 'Received store is null')
  }

  return !assertionFailed
}

const [useCurriedSetters, useStoreProp] = over([createUseCurriedSettersHook, createUseStorePropHook])(() => SimpleStore)

const assertStore = (store, logger = unduxLogger, message = 'Operation failed') =>
  storeAssertion(() => !store, logger, message)

const assertStoreSnapshot = (store, logger = unduxLogger, message = 'Operation failed') =>
  storeAssertion(() => !store || !store.storeSnapshot, logger, message)

const initStore = async () => {
  let isLoggedIn = await AsyncStorage.getItem(IS_LOGGED_IN)
  const newState = { ...initialState, isLoggedIn }
  SimpleStore = createConnectedStore(newState, storeEffects)
  return SimpleStore
}

export {
  initStore,
  storeAccessor as store,
  assertStore,
  assertStoreSnapshot,
  SimpleStore as default,
  useCurriedSetters,
  useStoreProp,
}
