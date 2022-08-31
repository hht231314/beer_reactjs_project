import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import AuthApi from './AuthApi'
import Cookie from 'js-cookie'
import { getUsers, onUsersChange } from '../api/users'
import { Button, Card } from 'react-bootstrap'
function Admin() {
    const [info] = useState({ name: "", address: "" })
    const [users, setUsers] = useState([])
    const iduser = Cookie.get("id")

    const refreshUsers = () => getUsers().then(setUsers)
    useEffect(() => {
        refreshUsers();
        const observer = onUsersChange(refreshUsers)
        return () => {
            observer.cancel()
        }
    }, [])
    users.map(user => {
        if (iduser === user._id) {
            info.name = user.name
            info.email = user.email
            info.phone = user.phone
            info.address = user.address


        }
        return (<div></div>)
    })
    const Auth = React.useContext(AuthApi)
    const handleOnClick = () => {
        Auth.setAuth(false)
        Cookies.remove("id")
        Cookies.remove("level")
        refresh()
    }//Cai nay de Logout
    const refresh = () => {
        window.location.reload();
    }
    return (
        <div>
            <center>
                <Card style={{ width: '26rem', margin: '20px 0px', background: 'aqua' }}>
                    <Card.Img variant="top" src="./user.png" style={{ width: '200px', height: '200px', margin: '0px 170px' }} />
                    <Card.Body>
                        <Card.Title>Tên: {info.name} </Card.Title>
                        <Card.Text>Email: {info.email} </Card.Text>
                        <Card.Text>Số điện thoại: {info.phone}</Card.Text>
                        <Card.Text>Địa chỉ: {info.address}</Card.Text>
                        <Button variant="danger" onClick={handleOnClick} >Log out</Button>
                    </Card.Body>
                </Card>
            </center>
        </div>
    )
}//Dong User
export default Admin