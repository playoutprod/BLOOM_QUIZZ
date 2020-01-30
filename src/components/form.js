import DbConfig from '../config/database';
import React from 'react';


export default class FormDataComponent extends React.Component {

  userData;

  constructor(props) {
      super(props);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangeCompany = this.onChangeCompany.bind(this);
      this.onChangeCompany = this.onChangeCompany.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.checkUser = this.checkUser.bind(this);
      this.saveUser = this.saveUser.bind(this);
      this.checkFields = this.checkFields.bind(this);
      this.state = {
          name: '',
          email: '',
          company: '',
          status:'init',
          message:''
      }
  }

  // Form Events
  onChangeName(e) {
      this.setState({ name: e.target.value })
      this.checkFields();
  }
  onChangeEmail(e) {
    this.setState({email: e.target.value});
    this.checkFields()
  }
  onChangeCompany(e) {
      this.setState({ company: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault();
    if(this.state.email !== ''){
      this.checkUser();
    }
  }
  checkFields(){
    if(this.state.name.length<3){
      this.setState({
        status:"notice",
        message:"Veuillez entrer un nom"
      });
      return(false);
    }
    let re = /\S+@\S+\.\S+/;
    if(!re.test(this.state.email)){
      this.setState({
        status:"notice",
        message:"Veuillez entrer un email valide"
      });
      return(false);
    }
    this.setState({
      status:"ready",
      message:""
    });
  }
  checkUser(){
    this.setState({
      status:'loading'
    })
    const component = this;
    var emails = DbConfig.database().ref('/emails');
    emails.on("value", function(snapshot) {
      let users = snapshot.val();
      emails.off();
      let found = false;
      for(var index in users) {
        if(users[index].email === component.state.email ){
          found = true;
          component.setState({
            status:'error',
            message:'Désolé, cet email est déjà enregistré'
          });
          const int = setInterval(function(){
            component.setState({
              status:'init'
            });
            clearInterval(int);
          },3000)
          return(false);
        }
      }
      if(found===false){
          component.saveUser();
      }
    }, function (errorObject) {
      component.setState({
        name: '',
        email: '',
        company: '',
        status:'error',
        message:"The read failed: " + errorObject.code
      })
    });
  }
  saveUser(){
    const component = this;
    DbConfig.database().ref("/emails").push({
      username: this.state.name,
      email: this.state.email,
      company : this.state.company,
      score : component.props.score
    },function(error) {
      if (error) {
        component.setState({
          name: '',
          email: '',
          company: '',
          status:'error',
          message:error
        })
      } else {
        component.setState({
          name: '',
          email: '',
          company: '',
          status:'save',
          message:'Merci !'
        })
      }
      if(component.props.onFinish){
        component.props.onFinish();
      }
    });
  }
  render() {
      if(this.state.status === 'save' || this.state.status === 'error'){
        return(<div className="result">{this.state.message}</div>);
      }else{
        return (<div className="container">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Nom
                    <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} /></label>
                </div>
                <div className="form-group">
                    <label>E-mail
                    <input type="email" className="form-control" value={this.state.email} onChange={this.onChangeEmail} /></label>
                </div>
                <div className="form-group">
                    <label>Société
                    <input type="tel" className="form-control" value={this.state.company} onChange={this.onChangeCompany} /></label>
                </div>
                <span className="notice">{this.state.message}</span>
                {this.state.status === 'ready' && <button type="submit" className="btn btn-primary btn-block">Envoyer</button>}
            </form>
        </div>)
    }
  }
}
