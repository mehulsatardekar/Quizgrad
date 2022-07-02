
 type ToastType = {
    notifySuccess:(successmsg:string)=>string;
    notifyError:(errormsg:string)=>string;
}

type toastProviderContextProps = {
    children : React.ReactNode;
}

export type {ToastType,toastProviderContextProps}