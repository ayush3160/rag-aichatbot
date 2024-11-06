export const setItemToLocalStorage = (key : string, value : string) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem(key, value);
    }
}

export const getItemFromLocalStorage = (key : string) : string | null => {
    if(typeof window !== 'undefined') {
        return localStorage.getItem(key);
    }
    return null;
}