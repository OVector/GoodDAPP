import React, { createContext, useEffect, useState } from 'react'
import { IS_LOGGED_IN } from '../constants/localStorage'
import AsyncStorage from '../utils/asyncStorage'

export const GlobalTogglesContext = createContext({})
export const GlobalTogglesContextProvider = props => {
  const [isDialogBlurOn, setDialogBlur] = useState(false)
  const [isMenuOn, setMenu] = useState(false)
  const [serviceWorkerUpdated, setServiceWorkerUpdated] = useState()
  const [installPrompt, setInstallPrompt] = useState()
  const [isLoggedInRouter, setLoggedInRouter] = useState() //switch between signup router and logged in router
  const [addWebApp, setAddWebApp] = useState({ showInitial: false, showDialog: false })

  useEffect(() => {
    if (isLoggedInRouter != null) {
      AsyncStorage.setItem(IS_LOGGED_IN, isLoggedInRouter)
    }
  }, [isLoggedInRouter])

  useEffect(() => {
    AsyncStorage.getItem(IS_LOGGED_IN).then(_ => setLoggedInRouter(!!_))
  }, [])

  return (
    <GlobalTogglesContext.Provider
      value={{
        isDialogBlurOn,
        isMenuOn,
        serviceWorkerUpdated,
        installPrompt,
        setServiceWorkerUpdated,
        setInstallPrompt,
        setDialogBlur,
        setMenu,
        isLoggedInRouter,
        setLoggedInRouter,
        addWebApp,
        setAddWebApp,
      }}
    >
      {props.children}
    </GlobalTogglesContext.Provider>
  )
}
