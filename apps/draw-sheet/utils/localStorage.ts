export function setLocalStorage(key: string, val: string) {
    localStorage.setItem(key, val)
}
export function getLocalStorage(key : string) : string | null{
    return localStorage.getItem(key) || null;
}
export function clearLocalStorage(key: string){
    return localStorage.removeItem(key)
}