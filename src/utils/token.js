
const KEY = 'heimamm_token'


const setToken = token => {
    localStorage.setItem(KEY, token)
}

const getToken = () => {
    return localStorage.getItem(KEY)
}

const removeToken = () => {
    localStorage.removeItem(KEY)
}


//  使用export可以导出多个，可以按序导出
//  export default setToken 只能导出单个，二次导出会覆盖掉前面的
export { setToken, getToken, removeToken }