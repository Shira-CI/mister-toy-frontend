export const SET_CART_IS_SHOWN = 'SET_CART_IS_SHOWN'
export const REMOVE_TOY_FROM_CART = 'REMOVE_TOY_FROM_CART'
export const ADD_TOY_TO_CART = 'ADD_TOY_TO_CART'
export const CLEAR_CART = 'CLEAR_CART'


const initialState = {
    isCartShown: false,
    shoppingCart: [],
}


export function cartReducer(state = initialState, action) {
    // console.log('action', action)
    let shoppingCart

    switch (action.type) {
        case SET_CART_IS_SHOWN:
            return { ...state, isCartShown: action.isCartShown }
        case REMOVE_TOY_FROM_CART:
            shoppingCart = state.shoppingCart.filter(toy => toy._id !== action.toyId)
            return { ...state, shoppingCart }
        case ADD_TOY_TO_CART:
            shoppingCart = [...state.shoppingCart, action.toy]
            return { ...state, shoppingCart }
        case CLEAR_CART:
            return { ...state, shoppingCart: [] }
        default:
            return state
    }
}