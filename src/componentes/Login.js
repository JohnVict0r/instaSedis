import React , {Component} from "react";



export default class Login extends Component{



    constructor(props) {
        super(props);

        let msg = '';
        let notLogged='';

        const queryParams = new URLSearchParams(props.location.search);
        const queryMsg = queryParams.get('notLogged');
        const logout= queryParams.get('logout');

        if(queryMsg) {
            notLogged = queryMsg;
        }
        if(notLogged === 'true' ){
            msg = 'É necessário Realizar o login!';
        }
        if(logout){
            localStorage.removeItem('auth-token');

        }

        this.state = {
            msg: msg
        };

    }


    envia(event){
        event.preventDefault();
        const requestInfo = {
            method:'POST',
            body:JSON.stringify({
                login:this.login.value,
                senha:this.senha.value
            }),
            headers: new Headers({
                'Content-type':'application/json'
            })
        }
        fetch('https://instalura-api.herokuapp.com/api/public/login', requestInfo)
            .then(response =>{
                if(response.ok){
                    return response.text();
                }else{
                    throw new Error('Usuário e/ou senha inválidos!');

                }
            })
            .then(token => {
                localStorage.setItem('auth-token',token);
                this.props.history.push('/timelineReducer');

            })
            .catch(error => {
                this.setState({msg:error.message});
            })
    }

    render(){
        return(
            <div className="login-box">
                <h1 className="header-logo">Instasedis</h1>
                {this.state.msg ? (
                    <div className="alert alert-danger" role="alert">
                        <span>{this.state.msg}</span>
                    </div>) : ''
                }


                <form onSubmit={this.envia.bind(this)}>
                    <input placeholder="Login" type="text" ref={(input) => this.login = input}/>
                    <input placeholder="Senha" type="password" ref={(input) => this.senha = input}/>
                    <input type="submit" value="Entrar"/>
                </form>
            </div>
        );
    }

}