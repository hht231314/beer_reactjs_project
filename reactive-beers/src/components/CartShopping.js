import React, { useState, useEffect } from "react"
import { getCart, onCartChange, editCart, removeCart } from "../api/cart"
import { Table } from 'react-bootstrap'
import { Input, Button, Form } from 'reactstrap'
import "../App.css"
import { Redirect } from 'react-router'
import { editBeer, getBeers, onBeersChange } from '../api/beers'
import { getUsers, onUsersChange } from '../api/users'
import { getPurchases, onPurchasesChange, addPurchase } from "../api/purchases"
import Cookie from 'js-cookie'
export const CartShopping = () => {
    const [cart, setCart] = useState([])
    const [amount, setAmount] = useState({ soluong: "" })
    const refreshCart = () => getCart().then(setCart)
    useEffect(() => {
        refreshCart()
        const observer = onCartChange(refreshCart)
        return () => {
            observer.cancel()
        }
    }, [])
    //Ham tinh tong tien
    const tongtien = function () {
        let tongtien = 0
        cart.map(mcart => {
            if (mcart.iduser === Cookie.get("id")) {
                tongtien = tongtien + mcart.thanhtien
            }
            return <div></div>
        })
        return tongtien
    }
    const [beers, setBeers] = useState([])
    const refreshBeers = () => getBeers().then(setBeers)
    useEffect(() => {
        refreshBeers()
        const observer = onBeersChange(refreshBeers)
        return () => {
            observer.cancel()
        }
    }, [])
    //Ham lay so luong beer
    const max = function (idbeer) {
        let max = 0
        beers.map(beer => {
            if (idbeer === beer._id) {
                max = beer.soluong
            }
            return <div></div>
        })
        return max
    }
    const [errors, setErrors] = useState({ erroramount: "" })
    const checkInput = (mycart) => {
        let check = true
        if (!amount.soluong) {
            check = false
            setErrors({ ...errors, erroramount: "Vui lòng nhập số lượng !!" })
        } else {
            if (typeof amount.soluong !== "undefined") {
                let patternAmount = new RegExp(/^[0-9]{1,4}$/)
                if (!patternAmount.test(amount.soluong)) {
                    check = false
                    setErrors({ ...errors, erroramount: "Vui lòng chỉ nhập số có giá trị từ 1 đến 9999 !!" })
                } else {
                    if (parseInt(amount.soluong) > max(mycart.idbeer) || parseInt(amount.soluong) < 1) {
                        check = false
                        setErrors({ ...errors, erroramount: "Số lượng ít nhất 1 và nhiều nhất " + max(mycart.idbeer) })
                    }
                }
            }
        }
        return check
    }
    const EditAmount = (mycart) => {
        if (checkInput(mycart)) {
            alert("Cập nhật thành công !!")
            editCart({
                _id: mycart._id,
                _rev: mycart._rev,
                iduser: mycart.iduser,
                idbeer: mycart.idbeer,
                namebeer: mycart.namebeer,
                hinhanh: mycart.hinhanh,
                gia: mycart.gia,
                soluong: amount.soluong,
                thanhtien: amount.soluong * mycart.gia,
            })
            tongtien()
        } else {
            alert(errors.erroramount)
        }
    }
    const [purchases, setPurchases] = useState([])
    const refreshPurchases = () => getPurchases().then(setPurchases)
    useEffect(() => {
        refreshPurchases()
        const observer = onPurchasesChange(refreshPurchases)
        return () => {
            observer.cancel()
        }
    }, [])
    const IdDonHang = function () {
        let ID = 0
        purchases.map(purchase => {
            if (parseInt(purchase.iddonhang) > ID) {
                ID = parseInt(purchase.iddonhang)
            }
            return <div></div>
        })
        return ID + 1
    }
    const [users, setUsers] = useState([])
    const refreshUsers = () => getUsers().then(setUsers)
    useEffect(() => {
        refreshUsers()
        const observer = onUsersChange(refreshUsers)
        return () => {
            observer.cancel()
        }
    }, [])
    //Lấy thông tin user
    const [info] = useState({ iduser: "", name: "", address: "", phone: "" })
    users.map(user => {
        if (Cookie.get("id") === user._id) {
            info.iduser = user._id
            info.name = user.name
            info.address = user.address
            info.phone = user.phone
        }
        return (<div></div>)
    })
    //Hàm kiểm tra giỏ hàng rỗng
    const checkThanhToan = function () {
        let check = 0
        cart.map(mycart => {
            if (Cookie.get("id") === mycart.iduser) {
                check = parseInt(check) + 1
            }
            return <div></div>
        })
        return check
    }
    //Nếu giỏ hàng rỗng thì không hiện button thanh toán
    const ThanhToan = () => {
        if (checkThanhToan() >= 1) {
            return (
                <Form><Button type="button" onClick={() => handleSubmit()}>Đặt Hàng</Button></Form>
            )
        }
    }
    // const them = (mycart) => 
    const EditBeerinCart = () => {
        cart.map(mcart => {
            if (mcart.iduser === Cookie.get("id")) {
                beers.map(beer => {
                    if (beer._id === mcart.idbeer) {
                        let status = beer.status
                        if(parseInt(beer.soluong) - parseInt(mcart.soluong) === 0){
                            status = "passive"
                        }
                        editBeer({
                            _id: beer._id,
                            _rev: beer._rev,
                            name: beer.name,
                            soluong: parseInt(beer.soluong) - parseInt(mcart.soluong),
                            gia: beer.gia,
                            status: status,
                            mota: beer.mota,
                            hinhanh: {
                                tenanh: beer.hinhanh.tenanh,
                                path: {
                                    path: beer.hinhanh.path.path
                                },
                                type: beer.hinhanh.type,
                                size: beer.hinhanh.size
                            }
                        })
                        refreshBeers()
                    }
                    return <div></div>
                })
            }
            return <div></div>
        })
    }
    const RemoveCart = () => {
        cart.map(mmcart => {
            if (mmcart.iduser === Cookie.get("id")) {
                removeCart(mmcart._id, mmcart._rev)
                refreshCart()
            }
            return <div></div>
        })
    }
    const handleSubmit = () => {
        cart.map(mycart => {
            if (mycart.iduser === Cookie.get("id")) {
                addPurchase({
                    iddonhang: IdDonHang(),
                    iduser: info.iduser,
                    nameuser: info.name,
                    addressuser: info.address,
                    phoneuser: info.phone,
                    namebeer: mycart.namebeer,
                    hinhanh: mycart.hinhanh,
                    giabeer: mycart.gia,
                    soluong: parseInt(mycart.soluong),
                    tongtien: tongtien(),
                    status: "Chờ xử lý"
                })
                refreshCart()
            }
            return <div></div>
        })
        EditBeerinCart()
        alert("Đã đặt hàng !!")
        RemoveCart()
    }
    const ShowCart = (mycart) => {
        if (mycart.iduser === Cookie.get("id")) {
            return (
                <Table key={mycart._id}>
                    <tbody>
                        <tr>
                            <td style={{ width: '100px', paddingTop: '30px' }}>{mycart.namebeer}</td>
                            <td style={{ width: '100px', paddingLeft: '5px', paddingRight: '5px' }}><img src={mycart.hinhanh} alt="beerimage" style={{ width: '80px', height: '60px' }} /></td>
                            <td style={{ width: '100px', paddingTop: '30px' }}>{mycart.gia} VND</td>
                            <td style={{ width: '100px', paddingTop: '30px' }}>{mycart.soluong}</td>
                            <td style={{ width: '100px', paddingTop: '30px' }}>
                                <Input type="text" onChange={event => setAmount({ ...amount, soluong: event.target.value })} value={amount.soluong} />
                            </td>
                            <td style={{ width: '100px', paddingTop: '30px' }}>{mycart.thanhtien} VND</td>
                            <td style={{ width: '130px', paddingTop: '30px' }}>
                                <Button type="button" onClick={() => EditAmount(mycart)} style={{ margin: '0px 8px', marginTop: '10px' }} >Cập Nhật</Button>
                                <Button type="button" onClick={() => removeCart(mycart._id)} style={{ margin: '0px 8px', marginTop: '10px' }}>Xóa</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            )
        }
    }
    if (!Cookie.get("id")) {
        return (<Redirect to="/signin" />)
    } else {
        return (
            <div >
                <div className="listuser">
                    <center>
                        <h3>Giỏ Hàng</h3>
                    </center>
                </div>
                <Table variant="primary" className="table" >
                    <thead>
                        <tr>
                            <th style={{ width: '100px' }}>Tên Bia</th>
                            <th style={{ width: '100px' }}>Hình ảnh</th>
                            <th style={{ width: '100px' }}>Giá</th>
                            <th style={{ width: '100px' }}>Số Lượng</th>
                            <th style={{ width: '100px' }}>Cập Nhật Số Lượng</th>
                            <th style={{ width: '100px' }}>Thành Tiền</th>
                            <th style={{ width: '130px' }}>Hành Động</th>
                        </tr>
                    </thead>
                </Table>
                <div>{
                    cart.map(mycart => (
                        <div>{ShowCart(mycart)}</div>
                    ))
                }
                    <Table>
                        <tbody>
                            <tr>
                                <th>Tổng tiền: {tongtien()} VND</th>
                                <th>{ThanhToan()}</th>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }

}