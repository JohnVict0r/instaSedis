import React , {Component} from "react";
import Publicacao from "./Publicacao";
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import TimelineApi from "../stores/TimelineApi";

export default class Timeline extends Component  {
    constructor(props){
        super(props);
        this.state ={fotos:[]};
        this.login = this.props.login;
    }

    componentWillMount(){
        this.props.store.subscribe(() => {
            this.setState({fotos:this.props.store.getState()})
            }
        )
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

    curtir(fotoId){
        this.props.store.curtir(fotoId)
    }

    comentar(fotoId,comentario){
        this.props.store.comentar(fotoId,comentario)
    }

    carregarFotos(){
        let urlPerfil;

        if(this.login === undefined) {
            urlPerfil = `http://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {
            urlPerfil = `http://instalura-api.herokuapp.com/api/public/fotos/${this.login}`;
        }

        this.props.store.dispatch(TimelineApi.listar(urlPerfil))

        //this.props.store.listar(urlPerfil);

    }
    renderFotos(){
        return this.state.fotos.map(foto =>
            (
                <Publicacao foto={foto} key={foto.id} curtir={this.curtir.bind(this)} comentar={this.comentar.bind(this)}/>
            )
        );
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