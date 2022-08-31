import React, { useState, useEffect } from 'react'
import { getBeers, onBeersChange } from '../api/beers'
import { Button, Card, CardGroup } from 'react-bootstrap';
import '../App.css'
import Cookie from 'js-cookie'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';

export const BeerCard = () => {
    const [beers, setBeers] = useState([]);
    const refreshBeers = () => getBeers().then(setBeers);
    useEffect(() => {
        refreshBeers();
        const observer = onBeersChange(refreshBeers);
        return () => {
            observer.cancel();
        }
    }, [])
    const checkLogin = (idbeer) => {
        if (Cookies.get("id")) {
            return (<Link to="/buybeer"><Button onClick={() => { (Cookie.set("idbeer", idbeer)) }} variant="primary">Buy Now</Button></Link>)
        } else {
            return (<Link to="/signin"><Button variant="primary">Buy Now</Button></Link>)
        }
    }
    const checkOutPut = (status, beer) => {
        if (status === "active") {
            return (
                <center >
                    <CardGroup style={{ margin: '20px 0px' }} >
                        <Card key={beer._id} style={{ width: '320px', height: '420px', margin: '20px 20px' }}>
                            <Card.Img style={{ width: '320px', height: '200px' }} src={beer.hinhanh.path.path} />
                            <Card.Body >
                                <Card.Title > {beer.name} </Card.Title>
                                <Card.Title > Price: {beer.gia} </Card.Title>
                                <Card.Title > Amount: {beer.soluong} </Card.Title>
                                {checkLogin(beer._id)}
                                <Link to="/beerdetails"><Button onClick={() => { (Cookie.set("idbeer", beer._id)) }} variant="secondary"> See More </Button></Link>
                            </Card.Body >
                        </Card>
                    </CardGroup >
                </center>
            )
        }
    }
    return (
        <div className="row" style={{ marginLeft: '45px', marginTop: '10px' }} > {
            beers.map(beer => (
                <div>{checkOutPut(beer.status, beer)}</div>
            ))
        }
        </div>
    )
}