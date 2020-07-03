import React, { Component } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import {addCategory} from '../services/Myser'; 

export class Addcat extends Component {
    state={cname:' ',imagePath:' ',errMsg:' '};
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
                                
                                <h1>Add Category</h1>
                                {this.state.errMsg!=" "?<div className="alert alert-danger">
                                    {this.state.errMsg}
                                </div>:" "}
                                <form onSubmit={this.addcat}>
                                    <div className="form-group">
                                        <label>CName</label>
                                        <input type="text" name="cname" className="form-control" onChange={this.handler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Image</label>
                                        <input type="file" name="attach" className="form-control" onChange={this.attach}/>
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

export default Addcat
