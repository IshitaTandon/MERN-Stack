import React, { Component } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import {getCategoryById, editCategoryWithImage, editCategoryWithoutImage} from '../services/Myser';
import {URL} from '../config/path';
export class Editcat extends Component {
    state={cname:' ',imageUrl:' ',imagePath:' ',errMsg:' '};
    componentDidMount(){
         //read params
        let cid=this.props.match.params.cid;    //jo cid aai h url se usko sbse phele read krna hoga 
       // console.log(cid);
       getCategoryById(cid).then(res=>{
           if(res.data.err==0){
                     this.setState({cname:res.data.cdata1.category});
                     this.setState({imageUrl:res.data.cdata1.image});
           }
           console.log(res.data);
           
       })
    }
    handler=(event)=>{
        this.setState({cname:event.target.value});
    }
    attach=(event)=>{
      if(event.target.files.length>0){
          this.setState({imagePath:event.target.files[0]});
      }
    }
    editcat=(event)=>{
      event.preventDefault();
      if(this.state.imagePath==" "){
         // console.log("Without Image Data Updated.");
         let formData={cname:this.state.cname, cid:this.props.match.params.cid};
         editCategoryWithoutImage(formData).then(res=>{
             if(res.data.err==0){
                 alert(res.data.msg);
                 this.props.history.push('/dashboard/category');
             }
             if(res.data.err==1){
                alert(res.data.msg);
            }
         })
      }else{
         // console.log("With Image Data Updated.");
          if(this.state.imagePath.type=="image/jpg" || this.state.imagePath.type=="image/jpeg" || this.state.imagePath.type=="image/png"){
                   let formData= new FormData;
                   formData.append("cname",this.state.cname);
                   formData.append("attach1",this.state.imagePath);
                   formData.append("cid",this.props.match.params.cid);
                   editCategoryWithImage(formData).then(res=>{
                    if(res.data.err==0){
                        alert(res.data.msg);
                        this.props.history.push('/dashboard/category');
                    }
                    if(res.data.err==1){
                       alert(res.data.msg);
                   }
                })

          }else{
          this.setState({errMsg:"Only jpg/jpeg/png images are allowed."})

          }
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
                                {this.state.errMsg!=" "?
                                <div className="alert alert-danger">
                                   {this.state.errMsg}
                                </div>:""}
                                     <h1>Edit Category</h1>
                              
                                <form onSubmit={this.editcat}>
                                    <div className="form-group">
                                        <label>CName</label>
                                        <input type="text" name="cname" className="form-control" onChange={this.handler} value={this.state.cname}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Image</label>
                                        <input type="file" name="attach" className="form-control" onChange={this.attach}/>
                                        <img src={`${URL}${this.state.imageUrl}`} width={50} height={50}/>
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

export default Editcat
