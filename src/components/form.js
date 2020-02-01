import React from 'react';


export default class FormDataComponent extends React.Component {
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
      this.handleInputChange = this.handleInputChange.bind(this);
      this.state = {
          name: '',
          email: '',
          company: '',
          status:'init',
          message:'Votre nom doit comporter au moins 3 caractères',
          rgpd_1:true,
          rgpd_2:true,
          rgpd_3:true,
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
        message:"Votre nom doit comporter au moins 3 caractères"
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
    let cases = true
    if(!this.state.rgpd_1 || !this.state.rgpd_2 || !this.state.rgpd_3){
      this.setState({
        status:"notice",
        message:"Veuillez cocher les cases"
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
    var emails = component.props.db.database().ref('/emails');
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
    component.props.db.database().ref("/emails").push({
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
  handleInputChange(e){
    let target = e.target;
    const name = target.name;
    if(this.state[name] === true){
      this.state[name] = false;
      this.setState({
        [name]: false
      });
    }else{
      this.state[name] = true;
      this.setState({
        [name]: true
      });
    }
    this.checkFields();
  }
  render() {
      if(this.state.status === 'save' || this.state.status === 'error'){
        return(<div className="result">{this.state.message}</div>);
      }else{
        return (<div className="container">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label><span className="label">Prénom & nom*</span>
                    <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} /></label>
                </div>
                <div className="form-group">
                    <label><span className="label">E-mail*</span>
                    <input type="email" className="form-control" value={this.state.email} onChange={this.onChangeEmail} /></label>
                </div>
                <div className="form-group">
                    <label><span className="label">Société</span>
                    <input type="tel" className="form-control" value={this.state.company} onChange={this.onChangeCompany} /></label>
                </div>
                <div className="form-cases">
                    <label>
                      <input className={this.state.rgpd_1 ? 'checked' : ''} type="checkbox" name="rgpd_1" id="rgpd_1" checked={this.state.rgpd_1} onChange={this.handleInputChange} />
                      <span className="label">* J’accepte que mon adresse mail soit collectée afin de recevoir mon score et une lettre d’information au sujet des meilleurs gestes à adopter pour l’environnement.</span>
                    </label>
                    <label>
                      <input className={this.state.rgpd_2 ? 'checked' : ''} type="checkbox" name="rgpd_2" id="rgpd_2" checked={this.state.rgpd_2} onChange={this.handleInputChange} />
                      <span className="label">* J’accepte que mon adresse mail soit collectée, conservée et traitée par le Groupe ESD-ESP suite à ma participation au quizz durant un an.</span>
                    </label>
                    <label>
                      <input className={this.state.rgpd_3 ? 'checked' : ''} type="checkbox" name="rgpd_3" id="rgpd_3" checked={this.state.rgpd_3} onChange={this.handleInputChange} />
                      <span className="label">* J’accepte que mon adresse mail soit consultée et traitée par les étudiants et intervenants de l’atelier Bloom.</span>
                    </label>
                </div>
                <div className="form-cases">Pour en savoir plus sur la façon dont mes données seront conservées et utilisées rendez-vous sur https://bit.ly/38SyNar</div>
                <span className="notice">{this.state.message}</span>
                {this.state.status === 'ready' && <button type="submit" className="btn btn-primary btn-block">Envoyer</button>}
            </form>
        </div>)
    }
  }
}
