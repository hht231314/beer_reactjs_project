import React, { useState, useEffect } from "react";
import { getPurchases, onPurchasesChange, removePurchase, editPurchase } from "../api/purchases"
import { Button, Form } from 'react-bootstrap'
import { Card, CardGroup } from 'react-bootstrap'
import "../App.css"
import { Redirect } from 'react-router'
import Cookies from 'js-cookie'
import { getUsers, onUsersChange } from "../api/users"
import { addBill, getBill, onBillChange } from '../api/bill'
import { Link } from 'react-router-dom'

export const ListPurchase = () => {
  const id = Cookies.get("id")
  const [userinfo] = useState({ name: "" })
  const [users, setUsers] = useState([])
  const refreshUsers = () => getUsers().then(setUsers)
  useEffect(() => {
    refreshUsers();
    const observer = onUsersChange(refreshUsers)
    return () => {
      observer.cancel()
    }
  }, [])
  users.map(user => {
    if (id === user._id) {
      userinfo.name = user.name
    }
    return (<div></div>)
  })
  const [purchases, setPurchases] = useState([])
  const [info, setinfo] = useState({ select: "" })
  const refreshPurchases = () => getPurchases().then(setPurchases)
  useEffect(() => {
    refreshPurchases()
    const observer = onPurchasesChange(refreshPurchases)
    return () => {
      observer.cancel()
    }
  }, [])
  const checkStatus = (purchase) => {
    if (purchase.status === "Đã xử lý") {
      return (
        <Link to="/quanlyhoadon"><Button variant="primary" type="submit" onClick={() => them(purchase)} style={{ margin: '0px 8px', marginTop: '10px' }} >Xuất HĐ</Button></Link>
      )
    }
  }
  const [bills, setBill] = useState([])
  const refreshBill = () => getBill().then(setBill)
  useEffect(() => {
    refreshBill()
    const observer = onBillChange(refreshBill)
    return () => {
      observer.cancel()
    }
  }, [])
  const IdHoaDon = function () {
    let ID = 0
    bills.map(bill => {
      if (parseInt(bill.idhoadon) > ID) {
        ID = parseInt(bill.idhoadon)
      }
      return <div></div>
    })
    return ID + 1
  }
  const DateTime = new Date()
  const ngaygio = DateTime.toString()
  const them = (mypurchase) => {
    purchases.map(purchase => {
      if (purchase.iddonhang === mypurchase.iddonhang) {
        addBill({
          idhoadon: IdHoaDon(),
          iddonhang: purchase.iddonhang,
          iduser: purchase.iduser,
          nameuser: purchase.nameuser,
          addressuser: purchase.addressuser,
          phoneuser: purchase.phoneuser,
          namebeer: purchase.namebeer,
          hinhanh: purchase.hinhanh,
          giabeer: purchase.giabeer,
          soluong: purchase.soluong,
          tongtien: purchase.tongtien,
          nguoiduyet: userinfo.name,
          ngaygio: ngaygio
        })
      }
      return <div></div>
    })
  }
  const editStatus = (mypurchase) => {
    if (info.select === "--None--") {
      info.select = "Chờ xử lý"
    }
    purchases.map(purchase => {
      if (mypurchase.iddonhang === purchase.iddonhang) {
        editPurchase({
          _id: purchase._id,
          _rev: purchase._rev,
          iddonhang: purchase.iddonhang,
          iduser: purchase.iduser,
          nameuser: purchase.nameuser,
          addressuser: purchase.addressuser,
          phoneuser: purchase.phoneuser,
          namebeer: purchase.namebeer,
          hinhanh: purchase.hinhanh,
          giabeer: purchase.giabeer,
          soluong: purchase.soluong,
          tongtien: purchase.tongtien,
          status: info.select
        })
      }
      return <div></div>
    })
  }
  const RemovePurchase = (iddonhang) => {
    purchases.map(purchase => {
      if (purchase.iddonhang === iddonhang) {
        removePurchase(purchase._id, purchase._rev)
      }
      return <div></div>
    })
  }
  const DonHang = () => {
    let array = []
    purchases.map(mypurchase => {
      purchases.map(purchase => {
        if (purchase.iddonhang === mypurchase.iddonhang) {
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
      IDDH.push(purchase.iddonhang)
      return <div></div>
    })
    return Array.from(new Set(IDDH)) //Return 1 mang id don hang da xoa trung
  }
  const xuatDH = (iddonhang) => {
    let title
    let footer
    let array = []
    DonHang().map(purchase => {
      if (iddonhang === purchase.iddonhang) {
        title = (
          <div>
            <Card.Title style={{ fontSize: '14px', color: 'red' }}>Mã đơn hàng: {purchase.iddonhang}</Card.Title>
            <Card.Title style={{ fontSize: '14px' }}>Tên khách hàng: {purchase.nameuser}</Card.Title>
            <Card.Title style={{ fontSize: '14px' }}>Số điện thoại: {purchase.phoneuser}</Card.Title>
            <Card.Title style={{ fontSize: '14px' }}>Địa chỉ giao hàng: {purchase.addressuser}</Card.Title>
          </div>
        )
        footer = (
          <div>
            <hr style={{width: '400px'}}/>
            <Card.Title style={{ fontSize: '14px' }}> Tổng thanh toán: {purchase.tongtien} VND</Card.Title>
            <Card.Title style={{ fontSize: '14px', color: 'green' }}> Trạng thái đơn hàng: {purchase.status}</Card.Title>
            <Card.Title style={{ fontSize: '14px' }}>
              <Form.Control style={{width: '300px'}} as="select" value={info.select} onChange={event => setinfo({ ...info, select: event.target.value })} >
                <option>--None--</option>
                <option>Đang xử lý</option>
                <option>Đã xử lý</option>
              </Form.Control>
              <Button onClick={() => editStatus(purchase)} variant="success" style={{ margin: '0px 8px', marginTop: '10px' }} >Duyệt</Button>
              {checkStatus(purchase)}
              <Button onClick={() => RemovePurchase(purchase.iddonhang)} style={{ margin: '0px 8px', marginTop: '10px' }} variant="danger">Xóa</Button>
            </Card.Title>
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
            <hr style={{width: '400px'}} />
            <Card.Title style={{ fontSize: '14px' }}>Tên bia: {purchase.namebeer}</Card.Title>
            <Card.Title style={{ fontSize: '14px' }}> Số lượng: {purchase.soluong}</Card.Title>
            <Card.Title style={{ fontSize: '14px' }}><img src={purchase.hinhanh} alt="beerimage" style={{ width: '300px', height: 'auto' }} /></Card.Title>
          </div>
        )
      }
      return <div></div>
    })
    array.push(footer)
    return array
  }
  if (Cookies.get("level") !== "admin") {
    return (<Redirect to="/signin" />)
  } else {
    return (
      <div className="listbill" style={{ width: "1070px", margin: "auto"}}>
        <div>
          <center>
            <h3>Quản lý danh sách đơn hàng</h3>
          </center>
        </div>
        <div>{
          getIDDonHang().map(id => (
            <CardGroup>
              <Card style={{ width: '285px', height: 'auto', margin: "10px 10px", background: '#86ceb5' }} className="card">
                <Card.Body>
                  {xuatDH(id)}
                </Card.Body>
              </Card>
            </CardGroup>
          ))
        }
        </div>
      </div>
    )
  }
}