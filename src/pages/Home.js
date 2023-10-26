import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
export default function Home() {

    const { id } = useParams();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://54.193.104.125:8081/users");
        setUsers(result.data);

    };

    const deleteUser = async (id) => {
        await axios.delete(`http://54.193.104.125:8081/user/${id}`);
        loadUsers();
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">UserId</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Age</th>
                            <th scope="col">Address</th>
                            <th scope="col">City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{user.user_name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.address}</td>
                                    <td>{user.city}</td>
                                    <td>
                                        <Link className='btn btn-primary mx-2' to={`/viewuser/${user.user_id}`}>View</Link>
                                        <Link className='btn btn-outline-primary mx-2' to={`/edituser/${user.user_id}`}>Edit</Link>
                                        <button className='btn btn-danger mx-2' onClick={() => deleteUser(user.user_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
