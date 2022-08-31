// import Cookies from 'js-cookie'
// import React, { useState, useEffect } from 'react'
// import AuthApi from './AuthApi'
import React from 'react'
import Cookie from 'js-cookie'
// import { getUsers, onUsersChange } from '../api/users'
import Admin from './Admin'
import User from './User'
export default class ProFile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            trangthai: Cookie.get("level")
        }
    }

    displayCheck = () => {
        if(this.state.trangthai==='user'){
            return <User />
        }else{
            return <Admin />
        }
    }
    render(){
        return(
            <div>    
                <this.displayCheck></this.displayCheck>
            </div>
        )
    }
}