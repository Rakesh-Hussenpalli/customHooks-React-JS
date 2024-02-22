import React, { useReducer, useEffect } from 'react';
import './index.css';
import useFetch from '../useFetch'


const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=lemon"
const HooksDemoOne = () => {
    const [state] = useFetch(url)
    console.log(state)
    const { loading, error } = state

    if (loading) {
        return (
            <>
                <center>
                    <h2>Loading...</h2>
                </center>
            </>
        )
    }
    if (error.status) {
        return (
            <>
                <center>
                    <h2>{state.error.msg}</h2>
                </center>
            </>
        )
    }
    return (
        <>
            <center>
                <h2>Drinks</h2>
                {
                    state.data.map((eachDrink) => {
                        const { idDrink, strDrink } = eachDrink
                        return (
                            <>
                                <p key={idDrink}>{strDrink}</p>
                            </>
                        )
                    })
                }
            </center>
        </>
    )

}

export default HooksDemoOne