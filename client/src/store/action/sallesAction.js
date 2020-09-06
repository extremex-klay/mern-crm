import {SET_SALLES} from "../types";
import {clearError, hideLoad, setError, showLoad} from "./appAction";
import {clear} from "./basketAction";

export function addSales(products) {
    return {
        type: SET_SALLES,
        products
    }
}

export function initSales() {
    return async dispatch => {
        try {
            dispatch(showLoad())
            const response = await fetch('/api/products/getSales', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`
                }
            })

            if (!response.ok) {
                throw new Error(response.message || 'Что-то пошло не так')
            }


            const json = await response.json()

            dispatch(addSales(json))
            dispatch(hideLoad())

        } catch (e) {
            dispatch(setError(e.message))
            dispatch(clearError)

        }
    }
}

export function buySales(baskedState) {
    return async dispatch => {
        try {
            dispatch(showLoad())
            const response = await fetch('/api/products/buy', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`
                },
                body: JSON.stringify(baskedState)
            })
            const json = await response.json()

            dispatch(clear())
            dispatch(setError(json.message))
            dispatch(initSales())
            dispatch(hideLoad())
            dispatch(clearError())

        } catch (e) {
            dispatch(setError(e))
        }
    }
}