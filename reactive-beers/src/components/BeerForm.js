import React from 'react';
import { Button, Form, Input } from 'reactstrap'
// import { Form, Field } from 'react-final-form'
import { addBeer } from '../api/beers'
import "../App.css"
// import axios from 'axios'

export default class BeerForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      mota: '',
      hinhanh: '',
      nameanh: '',
      size: '',
      type: '',
      path: '',
      status: '',
      errorname: '',
      errorsl: '',
      errorgia: '',
      errormota: '',
      errorhinhanh: ''
    }
  }
  validate() {
    let isValid = true
    if (!this.state.name) {
      this.setState({ errorname: "Vui lòng nhập tên !!" })
      isValid = false
    }
    if (!this.state.soluong) {
      this.setState({ errorsl: "Vui lòng nhập số lượng!!" })
      isValid = false
    }
    if (!this.state.gia) {
      this.setState({ errorgia: "Vui lòng nhập giá!!" })
      isValid = false
    }
    if (!this.state.mota) {
      this.setState({ errormota: "Vui lòng nhập mô tả!!" })
      isValid = false
    }
    if (!this.state.nameanh) {
      this.setState({ errorhinhanh: "Vui lòng chọn hình ảnh!!" })
      isValid = false
    }
    return isValid
  }
  them = () => addBeer({
    name: this.state.name,
    soluong: this.state.soluong,
    gia: this.state.gia,
    status: 'active',
    mota: this.state.mota,
    hinhanh: ({ tenanh: this.state.nameanh, path: { path: this.state.path }, type: this.state.type, size: this.state.size })
  })
  setName = (event) => {
    this.setState({ name: event.target.value })
  }
  setSoLuong = (event) => {
    this.setState({ soluong: event.target.value })
  }
  setPrice = (event) => {
    this.setState({ gia: event.target.value })
  }
  setSatus = (event) => {
    this.setState({ status: event.target.value })
  }
  setMoTa = (event) => {
    this.setState({ mota: event.target.value })
  }
  isFileChange = (event) => {
    const anh = event.target.files[0]

    this.setState({
      nameanh: anh.name,
      size: anh.size,
      type: anh.type,
      // path: anh.name
    })
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ path: reader.result })
      }
    }
    reader.readAsDataURL(event.target.files[0])
  }
  handleSubmit = event => {
    if (this.validate()) {
      this.them()
    } else {
      event.preventDefault()
      alert(" There was an error when registering. Please re-enter !!")
    }
  }
  render() {
    return (
      <center>
        <div className="form-tt">
          <h2>Form Add Beer</h2>
          <Form onSubmit={this.handleSubmit}>
            <Input onChange={this.setName} type="text" placeholder="Nhập tên bia" value={this.state.name} />
            <p  >{this.state.errorname}</p>
            <Input onChange={this.setSoLuong} type="number" min="1" max="99999" placeholder="Nhập số lượng bia" value={this.state.soluong} />
            <p  >{this.state.errorsl}</p>
            <Input onChange={this.setPrice} type="number" min="1000" max="999999999" placeholder="Nhập giá bia" value={this.state.gia} />
            <p  >{this.state.errorgia}</p>
            <Input onChange={this.setMoTa} type="textarea" style={{ height: '250px' }} placeholder="Nhập mô tả" value={this.state.mota} />
            <p  >{this.state.errormota}</p>
            <input onChange={(event) => this.isFileChange(event)} type="file" />
            <p  >{this.state.errorhinhanh}</p>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </center>
    )
  }
}
