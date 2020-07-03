import React, { Component } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import {URL} from '../config/path';
import {getproductsbyid,editproductswithimage} from '../services/Myser';
import{editproductswithoutimage} from '../services/Myser';
export class Editproducts extends Component {
    state={catdata:[], pname:'', imageurl:'', imagepath:''};
    state={cname:'',pro:'',os:'',vc:'',mem:'',dis:'',hd:'',price:'',warr:'',errMsg:''}
   /* componentDidMount(){
        getCategory().then(res=>{
            if(res.data.err==0){
                this.setState({catdata:res.data.cdata1});
            }
        })
    }*/
    componentDidMount(){
        let pid=this.props.match.params.pid;  //to read the pid from url
       // console.log(pid);
       getproductsbyid(pid).then(res=>{
           if(res.data.err==0){
                this.setState({cname:res.data.pdata1.categoryname});
               this.setState({pname:res.data.pdata1.productname});
               this.setState({imageurl:res.data.pdata1.image});
               this.setState({pro:res.data.pdata1.processor});
               this.setState({os:res.data.pdata1.operatingsystem});
               this.setState({vc:res.data.pdata1.videocard});
               this.setState({mem:res.data.pdata1.memory});
               this.setState({dis:res.data.pdata1.display});
               this.setState({hd:res.data.pdata1.harddrive});
               this.setState({price:res.data.pdata1.price});
               this.setState({warr:res.data.pdata1.warranty});
              
           }
           console.log(res.data);
       })

       }
      handler=(event)=>{
        // this.setState({pdata:event.target.value});
        this.setState({
         [event.target.name]: event.target.value
     });
        
 } 
    
 attach=(event)=>{
     if(event.target.files.length>0){
         this.setState({imagepath:event.target.files[0]});
     }

 }
 editpro=(event)=>{
     event.preventDefault();
     if(this.state.imagepath==undefined){
        // console.log("Without image data updated.");
        let formData={pname:this.state.pname,pro:this.state.pro,os:this.state.os,vc:this.state.vc,mem:this.state.mem,
                        dis:this.state.dis,hd:this.state.hd,price:this.state.price,warr:this.state.warr,pid:this.props.match.params.pid};
        editproductswithoutimage(formData).then(res=>{
           if(res.data.err==0){
               alert(res.data.msg);
              this.props.history.push("/dashboard/products");
           }
           if(res.data.err==1){
            alert(res.data.msg);
        }

        })
      
     }else{
       // console.log("With image data updated.");
       if(this.state.imagepath.type=="image/png" ||this.state.imagepath.type=="image/jpg"||this.state.imagepath.type=="image/jpeg"){
           let formData=new FormData();
                 formData.append("pid",this.props.match.params.pid);
                 formData.append("pname",this.state.pname)
                 formData.append("attach1",this.state.imagepath)
                 formData.append("pro",this.state.pro)
                 formData.append("os",this.state.os)
                 formData.append("vc",this.state.vc)
                 formData.append("mem",this.state.mem)
                 formData.append("dis",this.state.dis)
                 formData.append("hd",this.state.hd)
                 formData.append("price",this.state.price)
                 formData.append("warr",this.state.warr)
                 editproductswithimage(formData).then(res=>{
                    if(res.data.err==0){
                        alert(res.data.msg);
                        this.props.history.push("/dashboard/products");
                    }
                    if(res.data.err==1){
                     alert(res.data.msg);
                 }
         
                 })

       }else{
          this.setState({errMsg:'Only jpg/png images are supported'});
       }
     }

 }

    render() {
        return (
            <div>
                <main>
                    <header><Header {...this.props} /></header> 
                        <br/>
                        <section className="row container">
                            <aside className="col-sm-3"><Sidebar/></aside>
                            <aside className="col-sm-9">
                                {this.state.errMsg!=""?
                                <div className="alert alert-danger">
                                  {this.state.errMsg}
                                </div>:""}
                                     <h1>Edit Products</h1>
                                     <form onSubmit={this.editpro}>
                                    <div className="form-group">
                                        <label>Category Name</label>
                                        <input type="text"  name="cname" className="form-control" onChange={this.handler} value={this.state.cname} disabled/>
                                   </div>
                                    <div className="form-group">
                                        <label>Product Name</label>
                                        <input type="text" name="pname" className="form-control" onChange={this.handler} value={this.state.pname}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Image</label>
                                        <input type="file" name="att" className="form-control" onChange={this.attach}/>
                                        <img src={`${URL}${this.state.imageurl}`} width={50} height={50}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Processor</label>
                                        <input type="text" name="pro" className="form-control" onChange={this.handler} value={this.state.pro}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Operating System</label>
                                        <input type="text" name="os" className="form-control" onChange={this.handler} value={this.state.os}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Video Card</label>
                                        <input type="text" name="vc" className="form-control" onChange={this.handler} value={this.state.vc}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Memory</label>
                                        <input type="text" name="mem" className="form-control" onChange={this.handler} value={this.state.mem}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Display</label>
                                        <input type="text" name="dis" className="form-control" onChange={this.handler} value={this.state.dis}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Hard Drive</label>
                                        <input type="text" name="hd" className="form-control" onChange={this.handler} value={this.state.hd}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Price</label>
                                        <input type="text" name="price" className="form-control" onChange={this.handler} value={this.state.price}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Warranty</label>
                                        <input type="text" name="warr" className="form-control" onChange={this.handler} value={this.state.warr}/>
                                    </div>
                                    
                                    <input type="submit" value="Submit" class="btn btn-success"/>
                                </form>
                            </aside>
                        </section>
                    </main>
            </div>
        )
    }
}

export default Editproducts
