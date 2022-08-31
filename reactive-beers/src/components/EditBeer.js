import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import { Button, Form, Input } from 'reactstrap'
import { Card } from 'react-bootstrap'
import { getBeers, editBeer, onBeersChange } from '../api/beers.js'
export const EditBeer = () => {
    const idbeer = Cookies.get("idbeer")
    const [beers, setBeers] = useState([])
    const [info, setInfo] = useState({ name: "", soluong: "", gia: "", mota: "", hinhanh: "", tenanh: "", path: "", size: "", type: "" })
    const [userinfo] = useState({ id: "", rev: "", name: "", soluong: "", gia: "", status: "", mota: "", hinhanh: "", tenanh: "", path: "", type: "", size: "" })
    const refreshBeers = () => getBeers().then(setBeers)
    useEffect(() => {
        refreshBeers()
        const observer = onBeersChange(refreshBeers)
        return () => {
            observer.cancel()
        }
    }, [])
    beers.map(beer => {
        if (idbeer === beer._id) {
            userinfo.id = beer._id
            userinfo.rev = beer._rev
            userinfo.name = beer.name
            userinfo.soluong = beer.soluong
            userinfo.gia = beer.gia
            userinfo.status = beer.status
            userinfo.mota = beer.mota
            userinfo.hinhanh = beer.hinhanh
            userinfo.tenanh = beer.hinhanh.tenanh
            userinfo.path = beer.hinhanh.path.path
            userinfo.type = beer.hinhanh.type
            userinfo.size = beer.hinhanh.size
            if (info.path === "") {
                info.path = userinfo.path
            }
        }
        return <div></div>
    })
    const checkInput = () => {
        if (info.name === "") {
            info.name = userinfo.name
        }
        if (info.soluong === "") {
            info.soluong = userinfo.soluong
        }
        if (info.gia === "") {
            info.gia = userinfo.gia
        }
        if (info.mota === "") {
            info.mota = userinfo.mota
        }
        if (info.tenanh === "") {
            info.tenanh = userinfo.tenanh
            info.path = userinfo.path
            info.size = userinfo.size
            info.type = userinfo.type
        }
    }
    const imagechange = (event) => {
        info.hinhanh = event.target.files[0]
        info.tenanh = info.hinhanh.name
        info.size = info.hinhanh.size
        info.type = info.hinhanh.type
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setInfo({ ...info, path: reader.result })
            }
        }
        reader.readAsDataURL(event.target.files[0])
    }
    const handleSubmit = (event) => {
        checkInput()
        if(info.soluong === 0){
            userinfo.status = "passive"
          }else{
            userinfo.status = "active"
          }
        editBeer({
            _id: userinfo.id,
            _rev: userinfo.rev,
            name: info.name,
            soluong: info.soluong,
            gia: info.gia,
            status: userinfo.status,
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
                <h2>Form Update Beer</h2>
                <Form onSubmit={handleSubmit}>
                    <Input onChange={event => setInfo({ ...info, name: event.target.value })} value={info.name} placeholder={userinfo.name} type="text" />
                    <Input onChange={event => setInfo({ ...info, soluong: event.target.value })} value={info.soluong} placeholder={userinfo.soluong} type="number" min="1" max="99999" />
                    <Input onChange={event => setInfo({ ...info, gia: event.target.value })} value={info.gia} placeholder={userinfo.gia} type="number" min="1000" max="999999999" />
                    <Input onChange={event => setInfo({ ...info, mota: event.target.value })} value={info.mota} placeholder={userinfo.mota} type="textarea" style={{ height: '250px' }} />
                    <Input onChange={imagechange} type="file" />
                    <Card.Img style={{ marginTop: '12px', width: '290px', height: '200px' }} src={info.path} />
                    <Button type="submit" >Submit</Button>
                </Form>
            </div>
        </center>
    )
}