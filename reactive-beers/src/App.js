import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Menu from './components/Menu'
import GioiThieu from './components/GioiThieu'
import { BeerCard } from './components/BeerCard'
import BeerForm from './components/BeerForm'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import { ListUser } from './components/ListUser'
import { ListBeer } from './components/ListBeer'
import BuyBeer from './components/BuyBeer'
import BeerDetails from './components/BeerDetails'
import { ListPurchase } from './components/ListPurchase'
import  EditUser  from './components/EditUser'
import { EditBeer } from './components/EditBeer'
import { CartShopping } from './components/CartShopping'
import { Bill } from './components/Bill'
function App() {
  return (
    <Router>
      <Menu />
      <Route exact path="/" component={BeerCard} />
      <Route path="/gioithieu" component={GioiThieu} />
      <Route path="/addbeer" component={BeerForm} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/profile" component={SignIn} />
      <Route path="/quanlyuser" component={ListUser} />
      <Route path="/quanlybeer" component={ListBeer} />
      <Route path="/buybeer" component={BuyBeer} />
      <Route path="/beerdetails" component={BeerDetails} />
      <Route path="/quanlydonhang" component={ListPurchase} />
      <Route path="/edituser" component={EditUser} />
      <Route path="/editbeer" component={EditBeer} />
      <Route path="/cart" component={CartShopping} />
      <Route path="/quanlyhoadon" component={Bill} />
    </Router>
  );
}

export default App;