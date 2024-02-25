import { useEffect, useState } from 'react'
import axios from 'axios'

export const Home = () => {

    const [data, setData] = useState(0)

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    //             const result = await response.json()
    //             setData(result)
    //         }
    //         catch (e) {
    //             console.error(e)
    //         }
    //     }
    //     fetchData()
    // })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
                // const result = await response.json()
                setData(response.data)
            }
            catch (e) {
                console.error(e)
            }
        }
        fetchData()
    })
    return (
        <div>{
            data ? JSON.stringify(data) : 'Loading...'
        }</div>
    )
}
