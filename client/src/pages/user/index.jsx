import React from 'react'
import { useGetUsersQuery } from '../../redux/api/userApi';

const Users = () => {
    const { data, isLoading } = useGetUsersQuery();


  return (
    <>
        {!isLoading && (
            <div>
                <table className='table-content'>
                    <thead className='table-content__thead'>
                        <th>firstname</th>
                        <th>lastname</th>
                        <th>phone</th>
                        <th>email</th>
                    </thead>
                    {data.map((user, index) => (
                        <tbody key={index} className='table-content__tbody'>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                        </tbody>
                    ))}
                </table>
            </div>

        )}
    </>
  )
}

export default Users