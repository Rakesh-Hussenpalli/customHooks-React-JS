
import { useReducer, useEffect } from 'react'

const useFetch = (url) => {
    const render = (state, action) => {
        let condition = action.type
        switch (condition) {
            case "GET_DATA":
                return {
                    ...state,
                    data: action.payload
                }
            case "LOADING":
                return {
                    ...state,
                    loading: action.payload
                }
            case "GET_ERROR":
                return {
                    ...state,
                    error: action.payload
                }
        }
    }
    const initialState = {
        data: [],
        loading: false,
        error: { status: false, msg: "" }
    }
    const [state, dispatch] = useReducer(render, initialState)
    const makeApiCall = async () => {
        dispatch({ type: "LOADING", payload: true })
        dispatch({ type: "GET_ERROR", payload: { status: false, msg: "" } })
        try {
            const response = await fetch(url)
            const {drinks} = await response.json()
            dispatch({
                type: "GET_DATA",
                payload: drinks
            })
            dispatch({ type: "LOADING", payload: false })
        }
        catch (error) {
            dispatch({ type: "LOADING", payload: false })
            dispatch({
                type: "GET_ERROR",
                payload: { status: true, msg: error.message || "Drinks Not Found!" }
            })
        }
    }

    useEffect(() => {
        makeApiCall(url)
    }, [])

    return [state]

}

export default useFetch