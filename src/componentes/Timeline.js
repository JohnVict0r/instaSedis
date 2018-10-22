import React , {Component} from "react";
import Publicacao from "./Publicacao";
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import LogicaTimeline from '../logicas/LogicaTimeline';


export default class Timeline extends Component  {
    constructor(props){

        super(props);
        this.state ={fotos:[]};
        this.login = this.props.login;
        this.logicaTimeline = new LogicaTimeline();

    }

    componentWillMount(){
        this.logicaTimeline.subscribe(fotos => {
            this.setState({fotos})
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

    carregarFotos(){
        let urlPerfil;

        if(this.login === undefined) {
            urlPerfil = `http://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {
            urlPerfil = `http://instalura-api.herokuapp.com/api/public/fotos/${this.login}`;
        }

        this.logicaTimeline.listar(urlPerfil);

    }
    renderFotos(){
        return this.state.fotos.map(foto =>
            (
                <Publicacao foto={foto} key={foto.id} curtir={this.curtir.bind(this)} comentar={this.comentar.bind(this)}/>
            )
        );
    }

    curtir(fotoId){
        this.logicaTimeline.curtir(fotoId)
    }

    comentar(fotoId,comentario){
        this.logicaTimeline.comentar(fotoId,comentario)
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