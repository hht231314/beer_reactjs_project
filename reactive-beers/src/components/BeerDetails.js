import React, { useState, useEffect } from 'react'
import Cookie from 'js-cookie'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'reactstrap';
import { getBeers, onBeersChange } from '../api/beers'
import { addCart, editCart } from '../api/cart'
import { getCart, onCartChange } from '../api/cart'
const BeerDetails = () => {
  const [beers, setBeers] = useState([])
  const refreshBeers = () => getBeers().then(setBeers)
  const [info] = useState({ idbeer: "", name: "", gia: "", hinhanh: "", soluong: "", mota: "" })
  let [amount, setAmount] = useState({ soluong: 1, amount: "1" })
  useEffect(() => {
    refreshBeers()
    const observer = onBeersChange(refreshBeers)
    return () => {
      observer.cancel()
    }
  }, [])
  beers.map(beer => {
    if (Cookie.get("idbeer") === beer._id) {
      info.idbeer = beer._id
      info.revbeer = beer._rev
      info.name = beer.name
      info.soluong = beer.soluong
      info.gia = beer.gia
      info.status = beer.status
      info.mota = beer.mota
      info.tenanh = beer.hinhanh.tenanh
      info.hinhanh = beer.hinhanh.path.path
      info.size = beer.hinhanh.size
      info.type = beer.hinhanh.type
    }
    return <div></div>
  }
  )
  //Neu de trong thi so luong = 1
  // if (amount.soluong === "") {
  //   amount.soluong = 1
  // }
  const [cart, setCart] = useState([])
  const refreshCart = () => getCart().then(setCart)
  useEffect(() => {
    refreshCart()
    const observer = onCartChange(refreshCart)
    return () => {
      observer.cancel()
    }
  }, [])
  const [errors, setErrors] = useState({ erroramount: "" })
  const checkInput = () => {
    let check = true
    if (!amount.soluong) {
      check = false
      setErrors({ ...errors, erroramount: "Vui lòng nhập số lượng !!" })
    } else {
      if (typeof amount.soluong !== "undefined") {
        let patternAmount = new RegExp(/^[0-9]{1,4}$/)
        if (!patternAmount.test(amount.soluong)) {
          check = false
          setErrors({ ...errors, erroramount: "Vui lòng chỉ nhập số có giá trị từ 1 đến " + info.soluong })
        } else {
          if (parseInt(amount.soluong) > info.soluong || parseInt(amount.soluong) < 1) {
            check = false
            setErrors({ ...errors, erroramount: "Số lượng ít nhất 1 và nhiều nhất " + info.soluong })
          }
        }
      }
    }
    return check
  }
  const handleSubmit = () => {
    if (checkInput()) {
      cart.map(mycart => {
        if (mycart.iduser === Cookie.get("id") && mycart.idbeer === Cookie.get("idbeer")) {
          let soluong = parseInt(amount.soluong) + parseInt(mycart.soluong)
          if (soluong > info.soluong) {
            soluong = parseInt(info.soluong)
          }
          amount.amount = "2"
          editCart({
            _id: mycart._id,
            _rev: mycart._rev,
            iduser: Cookie.get("id"),
            idbeer: info.idbeer,
            namebeer: info.name,
            hinhanh: info.hinhanh,
            gia: info.gia,
            soluong: soluong,
            thanhtien: info.gia * soluong
          })
          alert("Đã cập nhật giỏ hàng !!")
        }
        return <div></div>
      })
      if (amount.amount === "1") {
        addCart({
          iduser: Cookie.get("id"),
          idbeer: info.idbeer,
          namebeer: info.name,
          hinhanh: info.hinhanh,
          gia: info.gia,
          soluong: amount.soluong,
          thanhtien: info.gia * amount.soluong
        })
        alert("Đã thêm vào giỏ !!")
      }
    } else {
      alert(errors.erroramount)
    }
  }
  const checkLogin = () => {
    if (Cookie.get("id")) {
      return (
        <Form>
          <Input onChange={event => setAmount({ ...amount, soluong: event.target.value })} value={amount.soluong} type="text" style={{ marginTop: '35px', width: '276px' }} />
          <Button onClick={() => handleSubmit()} type="button" variant="primary" style={{ marginTop: '35px' }}>Thêm vào giỏ hàng</Button>
        </Form >
      )
    } else {
      return (
        <Link to="/signin"><Button type="submit" variant="primary">Thêm vào giỏ hàng</Button></Link>
      )
    }
  }
  return (
    <div className="wrapper">
      <div className="product-img">
        <img alt="img" src={info.hinhanh} height={300} width={400} />
      </div>
      <div className="product-info">
        <div className="product-text">
          <h1>Tên sản phẩm: {info.name}</h1>
          <h2>Số lượng:{info.soluong}</h2>
          <p>Mô tả sản phẩm: {info.mota}</p>
        </div>
        <div className="product-price-btn">
          <p><span>Giá: {info.gia}</span>VND</p>
          <br />
          {checkLogin()}
        </div>
      </div>
    </div>
  )

}
export default BeerDetails