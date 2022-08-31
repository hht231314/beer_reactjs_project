// import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import Cookie from 'js-cookie'
import { Button, Form, Input, Label } from 'reactstrap'
import { getUsers, onUsersChange,editUser } from '../api/users'
function EditUser() {
  const [info, setInfo] = useState({ name: "", address: "", phone:"",password:"",email:"" })
  const [userinfo] = useState({ iduser: "", name: "",level: "", address: "", re: "", phone:"",password:"",email:"" })
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
      userinfo.iduser = user._id
      userinfo.re = user._rev
      userinfo.name = user.name
      userinfo.level = user.level
      userinfo.address = user.address
      userinfo.phone = user.phone
      userinfo.email = user.email
      userinfo.password = user.password
    }
    return (<div></div>)
  })
  const checkInput = () => {
    if(info.name ===""){
        info.name = userinfo.name   
      }
    if(info.address === ""){
      info.address = userinfo.address
    }
    if(info.phone === ""){
      info.phone = userinfo.phone
    }
    if(info.email === ""){
      info.email = userinfo.email
    }
  }
    const handleSubmit = (event) =>{
      checkInput()
      if(info.password === ""){
         editUser({
        _id: userinfo.iduser,
        _rev: userinfo.re,
        name: info.name,
        level: userinfo.level,
        password: userinfo.password,
        email: info.email,
        phone: info.phone,
        address: info.address
        })
      }else{
        editUser({
        _id: userinfo.iduser,
        _rev: userinfo.re,
        name: info.name,
        password: require('md5')(info.password),
        email: info.email,
        phone: info.phone,
        address: info.address
        })
      }
  }
  return (
    <center>
      <div className="form-tt">
        <h2>Form Edit User</h2>
        <Form onSubmit={handleSubmit}>
          <Label>Họ và tên:</Label>
          <Input onChange={event => setInfo({ ...info, name: event.target.value })} value={info.name} placeholder={userinfo.name} type="text" />
          <Label>Số điện thoại:</Label>
          <Input type="text" onChange={event => setInfo({ ...info, phone: event.target.value })} value={info.phone} placeholder={userinfo.phone} />
           <Label>Password New:</Label>
          <Input type="password" onChange={event => setInfo({ ...info, password: event.target.value })} value={info.password} />
          <Label>Địa chỉ:</Label>
          <Input type="text" onChange={event => setInfo({ ...info, address: event.target.value })} value={info.address} placeholder={userinfo.address} />
          <Label>Email:</Label>
          <Input type="text" onChange={event => setInfo({ ...info, email: event.target.value })} value={info.email} placeholder={userinfo.email} />
          <Button type="submit">Submit</Button>
        </Form>
      </div></center>
  )
}

export default EditUser