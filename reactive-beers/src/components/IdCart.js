import React, { useState, useEffect } from 'react'
import { getCart, onCartChange } from '../api/cart'

const IdCart = () => {
    const refreshBeers = () => getBeers().then(setBeers)
    useEffect(() => {
        refreshBeers();
        const observer = onBeersChange(refreshBeers);
        return () => {
          observer.cancel();
        };
      }, []);
      beers.map(beer => {})
}
export default IdCart