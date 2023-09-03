import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
// import { storageService } from './async-storage.service.js'
// import { userService } from '../services/user.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
'Outdoor', 'Battery Powered']


export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

// let gToys
// _createToys()


function query(sortAndFilter={}) {
    // console.log(sortAndFilter)
    // return storageService.query(STORAGE_KEY).then(toys => toys)
    return httpService.get(BASE_URL, sortAndFilter)
}

function getById(toyId) {
    // return storageService.get(STORAGE_KEY, toyId)
    return httpService.get(BASE_URL + toyId)
}
function remove(toyId) {
    // return storageService.remove(STORAGE_KEY, toyId)
    return httpService.delete(BASE_URL + toyId)
}



function save(toy) {

    if (toy._id) {
        return httpService.put(BASE_URL+toy._id, toy)
      } else {
        return httpService.post(BASE_URL, toy)
      }
}

function getEmptyToy() {
    return {
        title:'',
        price: '',
        labels: [],
        createdAt: Date.now(),
        inStock: true,
        msg: [],
        // image: 
    }
}

function getDefaultFilter() {
    return { title: '', maxPrice: '', inStock: '', labels: '' }
}


// Private functions

// function _createToys() {
//     gToys = utilService.loadFromStorage(STORAGE_KEY)
//     if (gToys && gToys.length > 0) return

//     gToys = [
//         _createToy('aa'),
//         _createToy('bb'),
//         _createToy('cc'),
//         _createToy('dd'),
//         _createToy('ee'),
//         _createToy('ff'),
//     ]
//     _saveToys()
// }

// function _createToy(title) {
//     return {
//         _id: utilService.makeId(),
//         title,
//         price: utilService.getRandomIntInclusive(50 , 150),
//         labels: ['Doll', 'Battery Powered', 'Baby'],
//         createdAt: Date.now(),
//         inStock: true
//     }
// }

// function _saveToys() {
//     utilService.saveToStorage(STORAGE_KEY, gToys)
// }




