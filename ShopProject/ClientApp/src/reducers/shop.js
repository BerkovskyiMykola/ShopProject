import { CREATE_SHOP_SUCCESS, DELETE_SHOP_SUCCESS, EDIT_SHOP_SUCCESS, GET_SHOPS } from "../constants/shop";

const initialState = {
    shops: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_SHOPS:
            return {
                shops: payload.shops
            }
        case CREATE_SHOP_SUCCESS:
            return {
                ...state,
                shops: [...state.shops, payload.shop]
            }
        case DELETE_SHOP_SUCCESS:
            return {
                ...state,
                shops: state.shops.filter(x => x.shopId !== payload.id)
            }
        case EDIT_SHOP_SUCCESS:
            return {
                ...state,
                shops: state.shops.map(item => {
                    if (item.shopId === payload.shopId)
                        return {
                            ...item,
                            name: payload.name,
                            address: payload.address,
                            type: payload.type
                        }
                    return item;
                })
            }
        default:
            return state;
    }
}