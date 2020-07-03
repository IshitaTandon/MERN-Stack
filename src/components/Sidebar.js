import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export class Sidebar extends Component {
    render() {
        return (
            <div>
                <div className="list-group">
  <Link to="/dashboard/category" className="list-group-item list-group-item-action active">
    Category
  </Link>
  <Link to="/dashboard/products" className="list-group-item list-group-item-action active">
    Products
  </Link>
  <Link to="/dashboard/order" className="list-group-item list-group-item-action active">
    Orders
  </Link>
  <Link to="/dashboard/feedback" className="list-group-item list-group-item-action active">
    Feedback
  </Link>
  
</div>
            </div>
        )
    }
}

export default Sidebar
