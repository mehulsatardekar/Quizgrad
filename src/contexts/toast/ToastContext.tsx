import React, {createContext, useContext} from 'react'
import toast, {Toaster} from 'react-hot-toast';

import { ToastType,toastProviderContextProps} from './ToastType';

const Toast = createContext <ToastType|null>(null);


const ToastContextData = ({children}:toastProviderContextProps) => {
  const notifySuccess = (successmsg:string) => toast.success(successmsg,{
    icon: '👏',
    duration:5000,
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  });
  
  const notifyError = (errormsg:string) => toast.error(errormsg,{
    icon: '😭',
    duration:5000,
    style: {
      borderRadius: '10px',
      background: '#F03A17',
      color: '#FFFFFF',
    },
})
  return (
    <Toast.Provider value={{notifySuccess, notifyError}}>
         {children}
    </Toast.Provider>   
  )
  
}

const useToast = ()=> useContext(Toast) as ToastType;

export {ToastContextData, useToast};