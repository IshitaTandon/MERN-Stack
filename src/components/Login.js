import React, { Component } from 'react'
import {receiveddata} from '../services/Myser';
export class Login extends Component {
    state={email:'',password:'',check:'',errMsg:''}
    handleChange=(event)=>{

        const{name,value}=event.target;
       this.setState({[name]:value});
    }
    submitfunc=(event)=>{
             
             event.preventDefault();
            // console.log(this.state);
           /* receiveddata(this.state).then(res=>{
                //console.log(res.data);     //data server pr chala gya
                
            })*/
       /*     receiveddata(this.state).then(res=>{
                //console.log(res.data);    
                if(res.data.err==0){
                    alert(res.data.msg);    // database waala part h yeh 
                }
                if(res.data.err==1){       
                    alert(res.data.msg);      database waala part h yeh 
                 
                }
            })*/
            receiveddata(this.state).then(res=>{
                 
                if(res.data.err==0){
                    localStorage.setItem("uid",res.data.uid);    //store in local Storage
                    this.props.history.push("/dashboard");   //redirect
                }
                if(res.data.err==1){       
                    this.setState({errMsg:res.data.msg});
                 
                }
            })
            
    }
    render() {
        return (
            <div>
               <main>
                   <header className="jumbotron">
                       <h1 className="text-center">
                           Admin Panel(Master)
                       </h1>
                   </header>
                   <section className="container">
                       {
                       this.state.errMsg!=""?
                       <div className="alert alert-danger">
                           {this.state.errMsg}
                       </div>: null
                       }
                       <form onSubmit={this.submitfunc}>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" name="email" className="form-control" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" className="form-control" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input type="checkbox" name="check" onChange={this.handleChange}/>
                            <label>Remember Me</label>
                        </div>
                       <input type="submit" value="Submit" className="btn btn-success"/>
                       </form>

                   </section>
               </main>
            </div>
        )
    }
}

export default Login
