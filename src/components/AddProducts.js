import React, { Component } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
//import {addCategory} from '../services/Myser'; 
import {getCategory} from '../services/Myser';
import {addproducts} from '../services/Myser'; 
export class AddProducts extends Component {
    state={catdata:[], pdata:'', imagePath:'', errMsg:''};
    componentDidMount(){
        getCategory().then(res=>{
            if(res.data.err==0){
                this.setState({catdata:res.data.cdata1});
            }
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

         let attachdata=event.target.files[0];
         this.setState({imagePath:attachdata});
         console.log(attachdata);
            
            }
    }

    addpro=(event)=>{
          event.preventDefault();
          if(this.state.imagePath!=''){
              if(this.state.imagePath.type=='image/png' ||this.state.imagePath.type=='image/jpg'||this.state.imagePath.type=='image/jpeg'){
                 let formData= new FormData();
                 formData.append("cname",this.state.cname)
                 formData.append("pname",this.state.pname)
                 formData.append("attach1",this.state.imagePath)
                 formData.append("pro",this.state.pro)
                 formData.append("os",this.state.os)
                 formData.append("vc",this.state.vc)
                 formData.append("mem",this.state.mem)
                 formData.append("dis",this.state.dis)
                 formData.append("hd",this.state.hd)
                 formData.append("price",this.state.price)
                 formData.append("warr",this.state.warr)
                 addproducts(formData).then(res=>{
                     if(res.data.err==0){
                         alert(res.data.msg);
                      //   alert('You are adding a'+" "+this.state.hd +" "+this.state.cname+" "+this.state.pname);
                         this.props.history.push('/dashboard/products');
                     }
                     if(res.data.err==1){
                        alert(res.data.msg);
                    }
                 }) 
              }else{
                  this.setState({errMsg:'Only jpg/png images are supported.'});
              }

          }else{
              this.setState({errMsg:'Please select any image.'})
          }

    }
  /*  state={cname:' ',imagePath:' ',errMsg:' '};
    handler=(event)=>{
            this.setState({cname:event.target.value});
    }
    attach=(event)=>{
        if(event.target.files.length>0){
            let attachdata=event.target.files[0];
            this.setState({imagePath:attachdata});
            console.log(attachdata);
        }
    }
    addcat=(event)=>{
            event.preventDefault();
            if(this.state.imagePath!=" "){   //check file
                 if(this.state.imagePath.type=="image/png"||this.state.imagePath.type=="image/jpg"||this.state.imagePath.type=="image/jpeg"){
                     let formData= new FormData();
                     formData.append("cname",this.state.cname); 
                     formData.append("attach1",this.state.imagePath); 
                     addCategory(formData).then(res=>{
                         if(res.data.err==0){
                             alert(res.data.msg);
                             this.props.history.push('/dashboard/category');    //isko krne se jb aap category add krdoge toh aap redirect ho jaaoge category waale page pr
                                                                                // aur aapka naya category aapne aap hi udhar upload ho jaayega
                         }
                         if(res.data.err==1){
                            alert(res.data.msg);
                        }
                     })

                 }else{
                     this.setState({errMsg:'Only png/jpg/jpeg images are allowed.'})
                 }

            }else{
                this.setState({errMsg:'Please select the image.'});
            }
    }*/
   
    render() {
        return (
            <div>
                <main>
                    <header><Header {...this.props} /></header> 
                        <br/>
                        <section className="row container">
                            <aside className="col-sm-3"><Sidebar/></aside>
                            <aside className="col-sm-9">
                                
                                <h1>Add Products</h1>
                                {this.state.errMsg!=''?
                                <div className="alert alert-danger">
                                    {this.state.errMsg}
                                </div>:''}
                                <form onSubmit={this.addpro}>
                                <div className="form-group">
                                        <label>Category Name</label>
                                        <select name="cname" className="form-control" onChange={this.handler}>
                                        <option disabled selected value> -- select an option -- </option>
                                            {this.state.catdata.map(data=>
                                            
                                               
                                               <option>{data.category}</option>
                                          )}
                                            
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Product Name</label>
                                        <input type="text" name="pname" className="form-control" onChange={this.handler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Image</label>
                                        <input type="file" name="att" className="form-control" onChange={this.attach}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Processor</label>
                                        <input type="text" name="pro" className="form-control" onChange={this.handler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Operating System</label>
                                        <input type="text" name="os" className="form-control" onChange={this.handler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Video Card</label>
                                        <input type="text" name="vc" className="form-control" onChange={this.handler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Memory</label>
                                        <input type="text" name="mem" className="form-control" onChange={this.handler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Display</label>
                                        <input type="text" name="dis" className="form-control" onChange={this.handler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Hard Drive</label>
                                        <input type="text" name="hd" className="form-control" onChange={this.handler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Price</label>
                                        <input type="text" name="price" className="form-control" onChange={this.handler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Warranty</label>
                                        <input type="text" name="warr" className="form-control" onChange={this.handler}/>
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

export default AddProducts
