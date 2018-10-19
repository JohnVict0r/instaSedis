import React , {Component} from "react";
import Publicacao from "./Publicacao";
import Pubsub from 'pubsub-js';

import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

export default class Timeline extends Component  {


    constructor(props){
        super(props);

        this.state ={fotos:[]};

        this.login = this.props.login;
    }

    componentWillMount(){
        Pubsub.subscribe('timeline',(topico,novasfotos) => {
            console.log(novasfotos)
            this.setState({fotos:novasfotos})

        })

    }

    carregarFotos(){
        let urlPerfil;

        if(this.login === undefined) {
            urlPerfil = `http://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {
            urlPerfil = `http://instalura-api.herokuapp.com/api/public/fotos/${this.login}`;
        }

        fetch(urlPerfil)
            .then(response => {
                if(response.ok){
                    return response.json();
                }else{
                    throw new Error("não foi possivel carregar as fotos");
                }

            })
            .then(novasFotos => {
                this.setState({fotos:novasFotos});

            })
    }

    componentDidMount(){

        this.carregarFotos();

    }

    renderFotos(){
        return this.state.fotos.map(foto =>
            (
                <Publicacao foto={foto} key={foto.id}/>
            )
        );
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.login !== undefined){
            this.login = nextProps.login;
            this.carregarFotos();
        }
    }


    render(){

        return(
            <div className="fotos container">

                <ReactCSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>

                    {this.renderFotos()}

                </ReactCSSTransitionGroup>

            </div>

        );
    }

}