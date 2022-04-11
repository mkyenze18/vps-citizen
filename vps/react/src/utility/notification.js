import { toast } from 'react-toastify';

export function handleErrorAxios(error, resorceName=null) {
    console.log(error)
    // TODO https://axios-http.com/docs/handling_errors
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);

        if(error.response.data) {
            Object.keys(error.response.data).forEach(element => {
                // TODO https://fkhadra.github.io/react-toastify/positioning-toast
                const mesaage = Array.isArray(error.response.data[element])
                ? `${element}: ${error.response.data[element][0]}`
                : `${element}: ${error.response.data[element]}`;
                toast.error(mesaage, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: element
                });
            });
        } else {
            if(error.response.status == 404) {
                // TODO https://fkhadra.github.io/react-toastify/positioning-toast
                toast.error(`${resorceName} not found`, {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "dark",
                });
            } else {
                // TODO https://fkhadra.github.io/react-toastify/positioning-toast
                toast.error("Operation failed", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
        
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        console.log('Error', error.message);
        // TODO https://fkhadra.github.io/react-toastify/positioning-toast
        toast.error("A network error has occured", {
            position: toast.POSITION.TOP_LEFT,
            theme: "colored",
            autoClose: false,
        });
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        // TODO https://fkhadra.github.io/react-toastify/positioning-toast
        toast.error("Operation failed", {
            position: toast.POSITION.TOP_RIGHT
        });
    }
}