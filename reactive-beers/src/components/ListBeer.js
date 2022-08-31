import React, { useState, useEffect } from "react"
import { getBeers, onBeersChange, removeBeer } from "../api/beers"
import { Button, Table } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import "../App.css"
import Cookies from "js-cookie"
import { Redirect } from 'react-router'

export const ListBeer = () => {
  const [beers, setBeers] = useState([]);

  const refreshBeers = () => getBeers().then(setBeers);

  useEffect(() => {
    refreshBeers()
    const observer = onBeersChange(refreshBeers);
    return () => {
      observer.cancel();
    };
  }, [])
  if (Cookies.get("level") !== "admin") {
    return (<Redirect to="/signin" />)
  }else {
  return (
    <div >
      <div className="listuser">
        <center>
          <h3>Quản lý danh sách Beer</h3>
        </center>
      </div>
      <Table variant="primary" className="table" >
        <thead>
          <tr>
            <th style={{ width: '160px' }}>Tên bia</th>
            <th style={{ width: '150px' }}>Hình ảnh</th>
            <th style={{ width: '85px' }}>Số lượng</th>
            <th style={{ width: '100px' }}>Giá</th>
            <th style={{ width: '100px' }}>Trạng thái</th>
            <th style={{ width: '500px' }}>Mô tả</th>

            <th>Quản lý &nbsp; &nbsp;  &nbsp;  <Button variant="success" style={{ margin: '0px 8px' }} href="/addbeer">Thêm</Button></th>

          </tr>
        </thead>
      </Table>
      <div > {
        beers.map(beer => (
          <Table key={beer._id}>
            <tbody>
              <tr>
                <td style={{ width: '160px' }}>{beer.name}</td>
                <td style={{ width: '150px' }}><img src={beer.hinhanh.path.path} alt="beerimage" style={{ width: '100px', height: '60px' }} /></td>
                <td style={{ width: '85px' }}>{beer.soluong}</td>
                <td style={{ width: '100px' }}>{beer.gia}</td>
                <td style={{ width: '100px' }}>{beer.status}</td>
                <td style={{ width: '500px' }}>{beer.mota}</td>
                <td >
                  <Link to="/editbeer"><Button variant="primary" onClick={() => {Cookies.set("idbeer", beer._id)}} style={{ margin: '0px 8px' }} >Sửa</Button></Link>
                  <Button onClick={() => removeBeer(beer._id)} style={{ margin: '0px 8px' }} variant="danger">Xóa</Button>
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