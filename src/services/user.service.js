import { httpService } from './http.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  query,
  getById,
  remove,
  update,
  getEmptyCredentials,
  updateWallet
}

window.userService = userService

function query() {
  return httpService.get(`user`)
}

async function getById(userId) {
  const user = await httpService.get(`user/${userId}`)
  return user
}

function remove(userId) {
  return httpService.delete(`user/${userId}`)
}

async function update(user) {
  await httpService.put(`user/${user._id}`, user)
  if (getLoggedinUser()._id === user._id) saveLocalUser(user)
  return user
}

async function login(userCred) {
  const user = await httpService.post('auth/login', userCred)
  if (user) {
    return saveLocalUser(user)
  }
}


async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return await httpService.post('auth/logout')
}

async function signup(userCred) {
  const user = await httpService.post('auth/signup', userCred)
  // console.log(user)
  return saveLocalUser(user)
}

async function updateWallet(diff) {
  const user = await userService.getById(getLoggedinUser()._id)
  if (user.wallet + diff < 0) return Promise.reject('No credit')
  user.wallet += diff
 return userService.update(user)
}


function saveLocalUser(user) {
  const userToSave = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin, wallet: user.wallet }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
  return userToSave
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyCredentials() {
  return {
    fullname: '',
    username: '',
    password: '',
    wallet: +100,
    isAdmin: false,
  }
}
