import { useParams } from 'react-router-dom'
import React from "react"


export default function SinglePlant() {
    const { id } = useParams()
    // const { data, isError, isLoading, error } = 

    const plantData = {
        name: "Tomato 1",
        imgURL: "http://THIS IS A TOMATO",
        plot: 1,
        datePlanted: "20/06/2024",
        careInstructions: "give as much direct sunlight as possible, cover with mesh to protect from birds",
        todo: "Water using 500mls of water per plant"

    }


    if (!id) {
        throw new Error()
    }

    return (
        <>
            <h2>This is the plant name</h2>
            <img src="image-url" alt="your plant"></img>
            <h3>Care instructions</h3>
            <p>here are some instructions</p>
            <h3>Todo</h3>  
            <p>here are some todos</p>
            <h3>Notes</h3>
            <p>here are some notes</p>
        </>
    )
    //components: plant info (care instructions)

}
