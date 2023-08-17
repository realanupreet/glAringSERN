import { useState, useEffect } from "react"
import axios from "axios"

const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const response = await axios.get("http://localhost:5000/users")
            console.log(response.data)
            setUsers(response.data)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error</div>
    return (
        <>
            <h1>Users</h1>
            {
                users.map((user) => (
                    <>
                        <p key={ user.id }>{ user.name }, Age - { user.age }</p>
                    </>
                )).reverse()
            }
        </>
    )
}

export default Users