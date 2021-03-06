import {SET_SALLES} from "../types";
import {clearError, hideLoad, setError, showLoad} from "./appAction";
import {clear} from "./basketAction";

export function addSales(salles) {
    return {
        type: SET_SALLES,
        salles
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

            const json = await response.json()

            if (!response.ok) {
                throw new Error(json.message || 'Что-то пошло не так')
            }

            dispatch(addSales(json))
            dispatch(hideLoad())

        } catch (e) {
            dispatch(setError(e.message))
            dispatch(clearError())

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
                body: baskedState
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