import React, { Component } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import {Link} from 'react-router-dom';
import {getCategory, deleteCategory} from '../services/Myser';
import {URL} from '../config/path';
export class Category extends Component {
    state={cdata:[]};
    componentDidMount(){
        getCategory().then(res=>{
            if(res.data.err==0){
                this.setState({cdata:res.data.cdata1});
            }
        })
    }

    editCat=(cid)=>{
       // alert(cid);
       this.props.history.push("/dashboard/editcat/"+cid);      //jb bhi Edit pr click hoga tb editCat method call hoga aur  woh redirect hoga editcat pr aur uski cid bhi jaayegi
    }
    delCat=(cid,cimage)=>{          //cid koi bhi naam diya h jisse delete pe click krne pr id display ho jaaye
             //alert(cid);
        if(window.confirm("Do you want to delete?"))
        {
            deleteCategory(cid,cimage).then(res=>{
                if(res.data.err==0){
                    alert(res.data.msg);
                    getCategory().then(res=>{
                        if(res.data.err==0){
                            this.setState({cdata:res.data.cdata1});
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
                            <aside className="col-sm-9">
                                <h1>Category</h1>
                                <table className="table">
                                    <tr>
                                        <td colspan={5} className="text-center"><Link to="/dashboard/addcat" className="btn btn-danger">
                                                                                   Add Category</Link></td>
                                    </tr>
                                    <tr>
                                        <td>S.No</td>
                                        <td>CName</td>
                                        <td>Image</td>
                                        <td>Date</td>
                                        <td>Action</td>
                                    </tr>
                        
                                    {this.state.cdata.map((cat,add)=>     //koi bhi variable eg. add liya h jisse S.No pe +1 automatically ho jaaye
                                                                          //yeh (_id) database waali id h jo automatically generate hoti h aur jb hum delete krenge toh iska use krenge 
                                                                          //yeh category database waali category h
                                                                          //delCat h id aur image isliye diya h jisse delete hone pr uski id+image dono delete ho jaaye
                                    <tr>
                                        <td>{add+1}</td>
                                        <td>{cat.category}</td>    
                                        <td>
                                            <img src={`${URL}${cat.image}`} width={50} height={50}/>
                                        </td>
                                        <td>{cat.created_at}</td>
                                        <td>
                                            <button className="alert alert-dark" onClick={()=>this.editCat(cat._id)}>Edit</button> <br/>
                                            <button className="alert alert-danger" onClick={()=>this.delCat(cat._id, cat.image)}>Delete</button>    
                                                                                                                                                     
                                        </td>
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

export default Category
