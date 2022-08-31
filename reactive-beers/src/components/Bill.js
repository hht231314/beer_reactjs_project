import React, { useState, useEffect } from "react"
import { Card, CardGroup, Button } from 'react-bootstrap'
import '../App.css'
import { getBill, onBillChange, removeBill } from "../api/bill"

export const Bill = () => {
  const [bills, setBill] = useState([])
  const refreshBill = () => getBill().then(setBill)
  useEffect(() => {
    refreshBill()
    const observer = onBillChange(refreshBill)
    return () => {
      observer.cancel()
    }
  }, [])
  function HoaDon() {
    let array = []
    bills.map(bill => {
      bills.map(mybill => {
        if (mybill.idhoadon === bill.idhoadon) {
          array.push(mybill)
        }
        return <div></div>
      })
      return <div></div>
    })
    return Array.from(new Set(array))
  }
  const getIdHoaDon = () => {
    let IDHD = []
    bills.map(bill => {
      IDHD.push(bill.idhoadon)
      return <div></div>
    })
    return Array.from(new Set(IDHD))
  }
  const RemoveBill = (idhoadon) => {
    bills.map(bill => {
      if (bill.idhoadon === idhoadon) {
        removeBill(bill._id, bill._rev)
      }
      return <div></div>
    })
  }
  const showTitle = (idhoadon) => {
    return (
      <CardGroup>
        <Card style={{ width: '285px', height: 'auto', margin: "10px 10px", background: '#d3afd3' }} className="card">
          <Card.Body>
            <Card.Title style={{ fontSize: '15px', color: 'red' }} >Mã hóa đơn: {idhoadon}
              <Button variant="danger" onClick={() => RemoveBill(idhoadon)} style={{ float: 'right' }}>Xóa</Button>
            </Card.Title>
            {XuatHD(idhoadon)}
          </Card.Body>
        </Card>
      </CardGroup>
    )
  }
  const XuatHD = (idhoadon) => {
    let bills = []
    let title
    let footer
    HoaDon().map(bill => {
      if (bill.idhoadon === idhoadon) {
        title = (
          <div>
            <Card.Title style={{ fontSize: '14px', color: 'green' }}>Mã đơn hàng: {bill.iddonhang}</Card.Title>
            <Card.Title style={{ fontSize: '14px' }}>Tên khách hàng: {bill.nameuser}  </Card.Title>
            <Card.Title style={{ fontSize: '14px' }}>Số điện thoại: {bill.phoneuser}  </Card.Title>
          </div>
        )
        footer = (
          <div>
            <Card.Title style={{ fontSize: '14px' }}>Tổng tiền phải thanh toán: {bill.tongtien} VND</Card.Title>
            <Card.Title style={{ fontSize: '14px' }}>Địa chỉ giao hàng: {bill.addressuser}</Card.Title>
            <Card.Title style={{ fontSize: '14px' }}> Người lập hóa đơn: {bill.nguoiduyet}  </Card.Title>
            <Card.Title style={{ fontSize: '14px' }}>Thời gian duyệt hóa đơn: {bill.ngaygio}</Card.Title>
          </div>
        )
      }
      return <div></div>
    })
    bills.push(title)
    HoaDon().map(bill => {
      if (bill.idhoadon === idhoadon) {
        bills.push(
          <div>
            <Card.Title style={{ fontSize: '14px' }}>Tên hàng hóa: {bill.namebeer} - Số lượng: {bill.soluong}</Card.Title>
          </div>
        )
      }
      return <div></div>
    })
    bills.push(footer)
    return bills
  }
  return (
    <div className="listbill" style={{ width: "1070px", margin: 'auto' }}>{
      getIdHoaDon().map(id => {
        return showTitle(id)
      })
    }
    </div>
  )

}
