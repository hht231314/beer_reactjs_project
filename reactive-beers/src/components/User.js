import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import AuthApi from './AuthApi'
import Cookie from 'js-cookie'
import { getPurchases, onPurchasesChange } from "../api/purchases"
import { Button, Card } from 'react-bootstrap';
import { getUsers, onUsersChange } from '../api/users'

function User() {
    const [purchases, setBeers] = useState([]);
    const iduser = Cookie.get("id")
    const refreshBeers = () => getPurchases().then(setBeers);
    useEffect(() => {
        refreshBeers();
        const observer = onPurchasesChange(refreshBeers);
        return () => {
            observer.cancel();
        };
    }, []);
    const [info] = useState({ namebeer: "", address: "" })
    const [users, setUsers] = useState([])
    const Auth = React.useContext(AuthApi)
    const handleOnClick = () => {
        Auth.setAuth(false)
        Cookies.remove("id")
        Cookie.remove("level")
    }//Cai nay de Logout
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
    const DonHang = () => {
        let array = []
        purchases.map(mypurchase => {
            purchases.map(purchase => {
                if (purchase.iduser === Cookie.get("id") && purchase.iddonhang === mypurchase.iddonhang) {
                    array.push(purchase)
                }
                return <div></div>
            })
            return <div></div>
        })
        return Array.from(new Set(array))
    }
    const getIDDonHang = () => {
        let IDDH = []
        purchases.map(purchase => {
            if (purchase.iduser === Cookie.get("id")) {
                IDDH.push(purchase.iddonhang)
            }
            return <div></div>
        })
        return Array.from(new Set(IDDH)) //Return 1 mang id don hang da xoa trung
    }
    const xuatDH = (iddonhang) => {
        let title
        let array = []
        DonHang().map(purchase => {
            if (iddonhang === purchase.iddonhang) {
                title = (
                    <div>
                        <hr/>
                        <Card.Text style={{fontWeight: 'bold'}}>M?? ????n h??ng: {purchase.iddonhang}</Card.Text>
                        <Card.Text style={{color: 'green', fontWeight: 'bold'}}>Tr???ng th??i: {purchase.status}</Card.Text>
                        <Card.Text style={{ fontSize: '20px' }}>Th??nh ti???n: {purchase.tongtien} VND</Card.Text>
                    </div>
                )
            }
            return <div></div>
        })
        array.push(title)
        DonHang().map(purchase => {
            if (purchase.iddonhang === iddonhang) {
                array.push(
                    <div>
                        <Card.Title style={{ fontSize: '20px' }}>T??n s???n ph???m: {purchase.namebeer} </Card.Title>
                        <Card.Title style={{ fontSize: '20px' }}>S??? l?????ng: {purchase.soluong} </Card.Title>
                        <Card.Text><img src={purchase.hinhanh} alt="beerimage" style={{ width: '300px', height: 'auto' }} /></Card.Text>
                    </div>
                )
            }
            return <div></div>
        })
        return array
    }
    return (
        <div>
            <div>
                <center>
                    <Card style={{ width: '29rem', margin: '62px 0px', background: 'aqua', float: 'left' }}>
                        <Card.Img variant="top" src="./user.png" style={{ width: '200px', hieght: '200px', margin: '0px 190px' }} />
                        <Card.Body>
                            <Card.Title>T??n: {info.name} </Card.Title>
                            <Card.Text>Email: {info.email} </Card.Text>
                            <Card.Text>S??? ??i???n tho???i: {info.phone}</Card.Text>
                            <Card.Text>?????a ch???: {info.address}</Card.Text>
                            <Button variant="danger" onClick={handleOnClick} >Log out</Button>
                            <Button href="/edituser" variant="primary" style={{ margin: '0px 8px' }} >Edit Profile</Button>
                        </Card.Body>
                    </Card>
                </center>
            </div>
            <div>
                <div >
                    <h2 style={{ color: 'red', marginLeft: '750px' }}>Danh s??ch ????n h??ng</h2>
                </div>{
                    <div>
                        <Card style={{ width: '850px', height: 'auto', margin: '3px 0px', background: 'aqua', float: 'right', marginRight: '10px' }}>
                            <Card.Body>
                            {getIDDonHang().map(id => {
                                return (xuatDH(id))
                            })}
                            </Card.Body>
                        </Card>
                    </div>
                }
            </div>
        </div>
    )
}//Dong User
export default User