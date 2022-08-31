import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { addUser, getUsers, onUsersChange } from '../api/users'
import '../App.css'
import { useEffect, useState } from 'react'
const SignUp = () => {
  const [userinfo, setUserInfo] = useState({ name: "", address: "", phone: "", password: "", confirmpassword: "", email: "" })
  const [error, setError] = useState({ name: "" })
  const [error1, setError1] = useState({ address: "" })
  const [error2, setError2] = useState({ phone: "" })
  const [error3, setError3] = useState({ password: "" })
  const [error4, setError4] = useState({ confirmpassword: "" })
  const [error5, setError5] = useState({ email: "" })
  const [users, setUsers] = useState([])
  const refreshUsers = () => getUsers().then(setUsers)
    useEffect(() => {
        refreshUsers();
        const observer = onUsersChange(refreshUsers)
        return () => {
            observer.cancel()
        }
    }, [])
  const them = () => addUser({
    name: userinfo.name,
    level: 'user',
    password: require('md5')(userinfo.password),
    email: userinfo.email,
    phone: userinfo.phone,
    address: userinfo.address
  })
  const validate = (event) => {
    let isValid = true
    if (!userinfo.name) {
      setError({ ...error, name: "Vui lòng nhập tên !!"})
      isValid = false
    }
    if (!userinfo.password) {
      setError3({ ...error3, password: "Vui lòng nhập password !!"})
      isValid = false
    }
    if (!userinfo.confirmpassword) {
      isValid = false
      setError4({ ...error4, confirmpassword: "Vui lòng nhập lại password !!"})
    }
    if (typeof userinfo.password !== "undefined" && typeof userinfo.confirmpassword !== "undefined") {
      if (userinfo.password !== userinfo.confirmpassword) {
        isValid = false
        setError4({ ...error4, confirmpassword: "Pasword không khớp. Vui lòng nhập lại !!"})
      }
    }
    if (!userinfo.email) {
      isValid = false
      setError5({ ...error5, email: "Vui lòng nhập email !!"})
    } else {
      if (typeof userinfo.email !== "undefined") {
        var patternEmail = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
        if (!patternEmail.test(userinfo.email)) {
          isValid = false
          setError5({ ...error5, email: "Sai cú pháp. Vui lòng nhập đúng địa chỉ email của bạn !!"})
        }
      }
    }
    if (!userinfo.phone) {
      isValid = false
      setError2({ ...error2, phone: "Vui lòng nhập số điện thoại !!"})
    } else {
      if (typeof userinfo.phone !== "undefined") {
        var patternPhone = new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/g)
        if (!patternPhone.test(userinfo.phone)) {
          isValid = false
          setError2({ ...error2, phone: "Vui lòng nhập đúng số điện thoại !!"})
        }else{
          users.map(user => {
            if (userinfo.phone === user.phone) {
              isValid = false
              setError2({ ...error2, phone: "Số điện thoại đã tồn tại !!"})
            }
            return <div></div>
        })
        }
      }
    }
    if (!userinfo.address) {
      isValid = false
      setError1({ ...error1, address: "Vui lòng nhập địa chỉ !!"})
    }
    return isValid
  }
  const handleSubmit = event => {
    if (validate()) {
      alert("Thêm thành công !!")
      them()
    } else {
      event.preventDefault()
      alert("Có lỗi trong quá trình đăng ký !!")
    }
  }
  return (
    <center>
      <div className="form-tt">
        <Form onSubmit={handleSubmit} >
          <h2> Form Register Account</h2>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input onChange={event => setUserInfo({ ...userinfo, name: event.target.value })} value={userinfo.name} type="text" placeholder="Username...." />
            <Label for="exampleName" className="mr-sm-2" style={{ color: 'red' }}>{error.name}</Label>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input onChange={event => setUserInfo({ ...userinfo, password: event.target.value })} value={userinfo.password} type="password" placeholder="Password...." />
            <Label for="exampleName" className="mr-sm-2" style={{ color: 'red' }}> {error3.password} </Label>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input onChange={event => setUserInfo({ ...userinfo, confirmpassword: event.target.value })} value={userinfo.confirmpassword} type="password" placeholder="Confirm Your Password...." />
            <Label for="exampleName" className="mr-sm-2" style={{ color: 'red' }}> {error4.confirmpassword} </Label>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input onChange={event => setUserInfo({ ...userinfo, email: event.target.value })} value={userinfo.email} type="email" placeholder="Email...." />
            <Label for="exampleName" className="mr-sm-2" style={{ color: 'red' }}> {error5.email} </Label>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input onChange={event => setUserInfo({ ...userinfo, phone: event.target.value })} value={userinfo.phone} type="text" placeholder="Phone...." />
            <Label for="exampleName" className="mr-sm-2" style={{ color: 'red' }}> {error2.phone} </Label>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input onChange={event => setUserInfo({ ...userinfo, address: event.target.value })} value={userinfo.address} type="text" placeholder="Address...." />
            <Label for="exampleName" className="mr-sm-2" style={{ color: 'red' }}> {error1.address} </Label>
          </FormGroup>
          <Button type="submit" >Submit</Button>
        </Form>
      </div>
    </center>
  )
}
export default SignUp
