import React, { useState, useEffect } from "react";
import { getUsers, onUsersChange, editUser, removeUser } from "../api/users";
import { Button, Table } from 'react-bootstrap';
import "../App.css"
import { Redirect } from 'react-router'
import Cookies from "js-cookie"
export const ListUser = () => {
  const [users, setUsers] = useState([]);

  const refreshUsers = () => getUsers().then(setUsers)

  useEffect(() => {
    refreshUsers()
    const observer = onUsersChange(refreshUsers)
    return () => {
      observer.cancel()
    };
  }, []);
  const editLevel = (user) => {
    if (user.level === "user") {
      editUser({
        _id: user._id,
        _rev: user._rev,
        name: user.name,
        level: "admin",
        password: user.password,
        email: user.email,
        phone: user.phone,
        address: user.address
      })
    } else {
      editUser({
        _id: user._id,
        _rev: user._rev,
        name: user.name,
        level: "user",
        password: user.password,
        email: user.email,
        phone: user.phone,
        address: user.address
      })
    }
  }
  function setAdmin(user) {
    if (user.level === "admin") {
      return <Button style={{ width: '124px' }} variant="success" onClick={() => editLevel(user)}>Set User</Button>
    } else {
      return <Button variant="success" onClick={() => editLevel(user)}> Set Admin </Button>
    }
  }
  if (Cookies.get("level") !== "admin") {
    return (<Redirect to="/signin" />)
  }else {
    return (
      <div >
        <div className="listuser">
          <center>
            <h3>Quản lý danh sách User</h3>
          </center>
        </div>
        <Table variant="primary" className="table" >
          <thead>
            <tr>
              <th style={{ width: '200px' }}>Full Name</th>
              <th style={{ width: '70px' }}>Type</th>
              <th style={{ width: '300px' }}>Email</th>
              <th style={{ width: '150px' }}>Phone</th>
              <th style={{ width: '300px' }}>Address</th>
              <th>Manage</th>

            </tr>
          </thead>
        </Table>
        <div > {
          users.map(user => (
            <Table key={user._id}>
              <tbody>
                <tr>
                  <td style={{ width: '200px' }}>{user.name}</td>
                  <td style={{ width: '70px' }}>{user.level}</td>
                  <td style={{ width: '300px' }}>{user.email}</td>
                  <td style={{ width: '150px' }}>{user.phone}</td>
                  <td style={{ width: '300px' }}>{user.address}</td>
                  <td >
                    <Button onClick={() => removeUser(user._id)} style={{ margin: '0px 8px' }} variant="danger">Xóa</Button>
                    {setAdmin(user)}
                  </td>
                </tr>
              </tbody>
            </Table>
          ))
        }
        </div>
      </div>
    )
  }
}