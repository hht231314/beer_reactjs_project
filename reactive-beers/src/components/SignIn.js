import React, { useState } from 'react'
import { useEffect } from 'react'
import { getUsers, onUsersChange } from '../api/users'
import { Button, FormGroup, Label, Input, Form } from 'reactstrap'
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom'
import AuthApi from './AuthApi'
import ProFile from './ProFile'
import Cookie from 'js-cookie'
function SignIn() {
  const [auth, setAuth] = React.useState(false)
  const readCookie = () => {
    const user = Cookie.get("id")
    if (user) {
      setAuth(true)
    }
  }
  React.useEffect(() => {
    readCookie()

  }, [])
  return (
    <div>
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Router>
          <Routes />
        </Router>
      </AuthApi.Provider>
    </div>
  )
}
const Login = () => {
  const [details, setDetails] = useState({ phone: "", password: ""})
  const [errors, setErrors] = useState({errorphone: ""})
  const [errorpassword, setErrorpassword] = useState({errorpassword: ""})
  const [users, setUsers] = useState([])
  const Auth = React.useContext(AuthApi)
  var md5 = require('md5')

  const refreshUsers = () => getUsers().then(setUsers)

  useEffect(() => {
    refreshUsers();
    const observer = onUsersChange(refreshUsers)
    return () => {
      observer.cancel()
    }
  }, [])
  const checkInput = event => {
    let check = true
    if (!details.phone) {
      check = false
      setErrors({ ...errors, errorphone: "Vui lòng nhập tên !!" })
    }
    if (!details.password) {
      check = false
      setErrorpassword({ ...errorpassword, errorpassword: "Vui lòng nhập password" })
    }
    return check
  }
  const refresh = () => {
    window.location.reload()
  }
  const handleSubmit = event => {
    if (checkInput()) {  
      users.map(user => {
        if (details.phone === user.phone && md5(details.password) === user.password) {
          Auth.setAuth(true)
          Cookie.set("id", user._id)
          Cookie.set("level", user.level)
          if(user.level === "admin"){
            refresh()
          }
        }
        return (<div></div>)
      })
      if(!Cookie.get("id")){
        alert("Bạn đã nhập sai số điện thoại hoặc password !!")
      }
    }else{
      event.preventDefault()
      alert("Vui lòng nhập lại !!")
    }

  }
  return (
    <center>
      <div className="form-tt">
        <Form onSubmit={handleSubmit}>
          <h2> Form Login</h2>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input type="text" onChange={event => setDetails({ ...details, phone: event.target.value })} value={details.phone} placeholder="Phone...." />
            <Label for="exampleName" className="mr-sm-2" style={{ color: 'red' }}>{errors.errorphone}</Label>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input type="password" onChange={event => setDetails({ ...details, password: event.target.value })} value={details.password} placeholder="Password...." />
            <Label for="exampleName" className="mr-sm-2" style={{ color: 'red' }}>{errorpassword.errorpassword}</Label>
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </center>
  )
} // Dong component Login
const Routes = () => {
  const Auth = React.useContext(AuthApi)
  return (
    <Switch>
      <ProtectLogin path="/signin" auth={Auth.auth} component={Login} />
      <ProtectRoute path="/profile" auth={Auth.auth} component={ProFile} />
    </Switch>
  )
}
const ProtectRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => auth ? (
        <Component />
      ) :
        (
          <Redirect to="/signin" />
        )
      }
    />
  )
}//Khong co Cookie thi chuyen ve signin
const ProtectLogin = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => !auth ? (
        <Component />
      ) :
        (
          <Redirect to="/profile" />
        )
      }
    />
  )
}
export default SignIn