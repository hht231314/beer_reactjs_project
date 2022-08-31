import Cookie from 'js-cookie'
import React from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import "../App.css"
function Menu() {
  if (Cookie.get("level") === "admin") {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/"><img src="./logoa.png" alt="home" style={{ width: '180px', height: '80px' }} /> </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/" style={{ margin: '0px 15px', marginTop: '20px' }}>Trang chủ</Nav.Link>
              <Nav.Link href="/quanlyuser" style={{ margin: '0px 15px', marginTop: '20px' }}>Quản lý User</Nav.Link>
              <Nav.Link href="/quanlybeer" style={{ margin: '0px 15px', marginTop: '20px' }}>Quản lý Beer</Nav.Link>
              <Nav.Link href="/quanlyhoadon" style={{ margin: '0px 15px', marginTop: '20px' }}>Quản lý hóa đơn</Nav.Link>
              <Nav.Link href="/quanlydonhang" style={{ margin: '0px 15px', marginTop: '20px' }}>Quản lý  đơn hàng</Nav.Link>
              <Nav.Link href="/profile" ><img style={{width: '70px', marginLeft: '50px'}} alt="" src="./user.png" /></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

    )
  } else {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/"><img src="./logoa.png" alt="home" style={{ width: '180px', height: '80px' }} /> </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/" style={{ margin: '0px 15px', marginTop: '20px' }}>Trang chủ</Nav.Link>
              <Nav.Link href="/gioithieu" style={{ margin: '0px 15px', marginTop: '20px' }}>Giới thiệu</Nav.Link>
              <Nav.Link href="/signup" style={{ margin: '0px 15px', marginTop: '20px' }}>Đăng kí</Nav.Link>
              <Nav.Link href="/signin" style={{ margin: '0px 15px', marginTop: '20px' }}>Đăng Nhập</Nav.Link>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{ margin: '0px 30px', width: '300px' }} />
                <Button style={{ margin: '0px 15px' }} variant="outline-success">Search</Button>
              </Form>
              <Nav.Link href="/profile" ><img style={{width: '70px', marginLeft: '10px'}} alt="" src="./user.png" /></Nav.Link>
              <Nav.Link href="/cart" ><img style={{width: '70px', marginLeft: '10px'}} alt="" src="./cart.png" /></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
export default Menu;