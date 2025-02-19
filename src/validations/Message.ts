export const ErrorMessage = (messsage: string) => {
    return Promise.reject(new Error(messsage));
};
