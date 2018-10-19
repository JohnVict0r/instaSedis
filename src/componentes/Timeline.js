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

    componentDidMount(){

        this.carregarFotos();

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.login !== undefined){
            this.login = nextProps.login;
            this.carregarFotos();
        }
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


    renderFotos(){
        return this.state.fotos.map(foto =>
            (
                <Publicacao foto={foto} key={foto.id} curtir={this.curtir} comentar={this.comentar}/>
            )
        );
    }
    curtir(fotoId){

        let curtirUrl = `http://instalura-api.herokuapp.com/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;

        fetch(curtirUrl, {method: 'POST'})
            .then(response => {
                if(response.ok){
                    return response.json();
                }else{
                    throw new Error("não foi possivel curtir a foto");
                }

            })
            .then (liker => {
                Pubsub.publish('atualiza-liker',{fotoId,liker});
            })
    }
    comentar(fotoId,comentario){
        const requestInfo = {
            method:'POST',
            body:JSON.stringify({texto:comentario}),
            headers: new Headers({
                'Content-type':'application/json'
            })
        };

        let comment = `https://instalura-api.herokuapp.com/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;

        fetch(comment,requestInfo)
            .then(response => {
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error("não foi possível comentar");
                }
            })
            .then(novoComentario => {
                Pubsub.publish('novo-comentarios', { fotoId,novoComentario});

            })
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