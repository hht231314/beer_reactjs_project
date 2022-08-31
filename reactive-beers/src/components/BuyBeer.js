// import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import Cookie from 'js-cookie'
import { Button, Form, Input, Label } from 'reactstrap'
import { addPurchase, getPurchases, onPurchasesChange } from '../api/purchases'
import { getBeers, onBeersChange, editBeer } from '../api/beers'
import { getUsers, onUsersChange } from '../api/users'
function BuyBeer() {
  const [info] = useState({ iduser: "", name: "", address: "", phone: "", idbeer: "", revbeer: "", beerName: "", slbeer: "", gia: "", status: "", mota: "", tenanh: "", path: "", type: "", size: "" })
  const [users, setUsers] = useState([])
  const [beers, setBeers] = useState([])
  const [details, setDetails] = useState({ soluong: 1 })
  const iduser = Cookie.get("id")
  const idbeer = Cookie.get("idbeer")
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
      info.iduser = user._id
      info.name = user.name
      info.address = user.address
      info.phone = user.phone
    }
    return (<div></div>)
  })
  if (details.soluong === "") {
    details.soluong = 1
  }
  const refreshBeers = () => getBeers().then(setBeers);
  useEffect(() => {
    refreshBeers();
    const observer = onBeersChange(refreshBeers);
    return () => {
      observer.cancel();
    }
  }, [])
  beers.map(beer => {
    if (idbeer === beer._id) {
      info.idbeer = beer._id
      info.revbeer = beer._rev
      info.beerName = beer.name
      info.slbeer = beer.soluong
      info.gia = beer.gia
      info.status = beer.status
      info.mota = beer.mota
      info.tenanh = beer.hinhanh.tenanh
      info.path = beer.hinhanh.path.path
      info.type = beer.hinhanh.type
      info.size = beer.hinhanh.size
    }
    return <div></div>
  })
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
  const them = () => addPurchase({
    iddonhang: IdDonHang(),
    iduser: info.iduser,
    nameuser: info.name,
    addressuser: info.address,
    phoneuser: info.phone,
    status: "Chờ Xử Lý",
    namebeer: info.beerName,
    hinhanh: info.path,
    giabeer: info.gia,
    soluong: details.soluong,
    tongtien: info.gia * details.soluong
  })
  const handleSubmit = (event) => {
    them()
    if (info.slbeer - details.soluong === 0) {
      info.status = "passive"
    }
    editBeer({
      _id: info.idbeer,
      _rev: info.revbeer,
      name: info.beerName,
      soluong: info.slbeer - details.soluong,
      gia: info.gia,
      status: info.status,
      mota: info.mota,
      hinhanh: {
        tenanh: info.tenanh,
        path: {
          path: info.path
        },
        type: info.type,
        size: info.size
      }
    })
  }
  return (
    <center>
      <div className="form-tt">
        <h2>Form Buy Beer</h2>
        <Form onSubmit={() => handleSubmit()}>
          <Label>Họ và tên:</Label>
          <Input type="text" value={info.name} />
          <Label>Số điện thoại:</Label>
          <Input type="text" value={info.phone} />
          <Label>Địa chỉ:</Label>
          <Input type="text" value={info.address} />
          <Label>Ten Bia:</Label>
          <Input type="text" value={info.beerName} />
          <Label>Gia Bia:</Label>
          <Input type="text" value={info.gia} />
          <Label>Số lượng:</Label>
          <Input onChange={event => setDetails({ ...details, soluong: event.target.value })} value={details.soluong} type="number" min="1" max={info.slbeer} placeholder="Nhập vào số lượng cần mua" />
          <Label style={{ width: '290px', backgroundColor: 'aqua', borderRadius: '10px', padding: '8px' }}>Tong Tien: {info.gia * details.soluong} </Label><br />
          <Button type="submit">Submit</Button>
        </Form>
      </div></center>
  );
}

export default BuyBeer;