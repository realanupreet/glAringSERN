import { useState, useEffect } from 'react'
import Nav from './Nav'
import axios from 'axios'
function App() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editname, setEditName] = useState('')
  const [editage, setEditAge] = useState(0)
  const [editid, setEditId] = useState(0)

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

  const handleClick = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.post('http://localhost:5000/create', {
        name: name,
        age: age
      })
      console.log("Response", response)
      fetchUsers()
    } catch (err) {
      console.log(err)
    }
  }
  const handleEdit = async (e, id) => {
    try {
      e.preventDefault()
      const response = await axios.get('http://localhost:5000/edit/' + id)
      console.log("Response", response)
      setEditName(response.data.name)
      setEditAge(response.data.age)
      setEditId(response.data.id)
    } catch (err) {
      console.log(err)
    }
  }
  const handleUpdate = async (e, id) => {
    try {
      e.preventDefault()
      const response = await axios.post('http://localhost:5000/update/' + id, {
        name: name,
        age: age,
        id: id
      })
      console.log("Response", response)
      fetchUsers()
      setEditName('')
    } catch (err) {
      console.log(err)
    }
  }
  const handleDelete = async (e, id) => {
    try {
      setEditName('')
      e.preventDefault()
      const response = await axios.get('http://localhost:5000/delete/' + id)
      console.log("Response", response)
      fetchUsers()
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      <h1>This is a react + mysql based CRUD application</h1>
      <Nav />
      <h2>Enter data </h2>
      <div>
        <form>
          { editname && <p>Enter the updated value of <b>{ editname }</b> Age <b>{ editage }</b> </p> }
          <label htmlFor="name">Name</label><br />
          <input type="text" id="name" onChange={
            (e) => {
              setName(e.target.value)
              console.log(name)
            }
          } />
          <br />

          <label htmlFor="age">Age</label><br />
          <input type="number" id="age" onChange={
            (e) => {
              setAge(e.target.value)
              console.log(age)
            }
          } />
          <br />
          <br />

          <button onClick={ editname ? (e) => { handleUpdate(e, editid) } : handleClick }>{ editname ? "Update" : "Create" }</button>
        </form>
        <br />


        <h2>Users</h2>
        <ul>
          {
            users.map((user) => (
              <>
                <li key={ user.id }>{ user.name }, Age - { user.age } <a href={ "/" + user.id } onClick={ (e) => handleEdit(e, user.id) }>edit</a> <a href={ "/" } onClick={ (e) => handleDelete(e, user.id) }>delete</a></li>
              </>
            )).reverse()
          }</ul>

      </div>

    </>
  )
}

export default App
