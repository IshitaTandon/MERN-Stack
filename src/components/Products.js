import React, { Component } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import {Link} from 'react-router-dom';
//import {getCategory, deleteCategory} from '../services/Myser';
import {getproducts, delproducts} from '../services/Myser';
import {URL} from '../config/path';
export class Products extends Component {
    state={pdata:[]};
    componentDidMount(){
        getproducts().then(res=>{
            if(res.data.err==0){
              //  console.log(res.data.pdata1);
                this.setState({pdata:res.data.pdata1});
            }
        })
    }

    editpro=(pid)=>{
        //alert(cname+" "+warr+""+hd+""+price+""+pid);
      
        this.props.history.push("/dashboard/editproducts/"+pid);
    }

    delpro=(pid,pimage,cname,pname,pro,os,vc,mem,dis,hd,price,warr)=>{
      // alert(cname+" "+warr+""+hd+""+price+""+pid);
      if(window.confirm("Do you want to delete?")){
        delproducts(pid,pimage,cname,pname,pro,os,vc,mem,dis,hd,price,warr).then(res=>{
            if(res.data.err==0){
                alert(res.data.msg);
                getproducts().then(res=>{
                    if(res.data.err==0){
                      //  console.log(res.data.pdata1);
                        this.setState({pdata:res.data.pdata1});
                    }
                })
            }
            if(res.data.err==1){
                alert(res.data.msg);
            }
        })
    }
    }

   
    render() {
        return (
            <div> 
                <main>
                    <header><Header {...this.props}/></header> 
                        <br/>
                        <section className="row container">
                            <aside className="col-sm-3"><Sidebar/></aside>
                            <aside className="col-sm-8">
                                <h1>Products</h1>
                                <table className="table">
                                    <tr>
                                        <td colspan={12} className="text-center"><Link to="/dashboard/AddProducts" className="btn btn-danger">
                                                                                   Add Products</Link></td>
                                    </tr>
                                    <tr>
                                        <td>S.No</td>
                                        <td>Category Name</td>
                                        <td>Product Name</td>
                                        <td>Image</td>
                                        <td>Processor</td>
                                        <td>Operating System</td>
                                        <td>Video Card</td>
                                        <td>Memory</td>
                                        <td>Display</td>
                                        <td>Hard Drive</td>
                                        <td>Price</td>
                                        <td>Warranty</td>
                                        <td>Action</td>
                                        
                                    </tr>
                        
                                    {this.state.pdata.map((product,addpro)=>     //koi bhi variable eg. add liya h jisse S.No pe +1 automatically ho jaaye
                                                                          //yeh (_id) database waali id h jo automatically generate hoti h aur jb hum delete krenge toh iska use krenge 
                                                                          //yeh category database waali category h
                                                                          //delCat h id aur image isliye diya h jisse delete hone pr uski id+image dono delete ho jaaye
                                    <tr>
                                        <td>{addpro+1}</td>
                                        <td>{product.categoryname}</td>
                                        <td>{product.productname}</td>    
                                        <td>
                                            <img src={`${URL}${product.image}`} width={50} height={50}/>
                                        </td>
                                        <td>{product.processor}</td>
                                        <td>{product.operatingsystem}</td>
                                        <td>{product.videocard}</td>
                                        <td>{product.memory}</td>
                                        <td>{product.display}</td>
                                        <td>{product.harddrive}</td>
                                        <td>{product.price}</td>
                                        <td>{product.warranty}</td>
                                        <button className="alert alert-dark blue" onClick={()=>this.editpro(product._id)}>EDIT</button>
                                        <button className="alert alert-danger" onClick={()=>this.delpro(product._id,product.image,product.categoryname,product.productname,product.processor,product.operatingsystem,product.videocard,
                                                               product.memory,product.display,product.harddrive,product.price,product.warranty)}>DELETE</button>
                                    </tr>
                                                                            )}
                                </table>
                            </aside>
                        </section>
                </main>
            </div>
        )
    }
}

export default Products
