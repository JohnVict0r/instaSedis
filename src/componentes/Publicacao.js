import React , {Component} from "react";
import {Link} from 'react-router-dom';
import Pubsub from 'pubsub-js';

class FotoHeader extends Component{

    render(){
        return(
        <header className="foto-header">
            <figure className="foto-usuario">
                <img src={this.props.foto.urlPerfil} alt="foto do usuario"/>
                <figcaption className="foto-usuario">
                    <Link to={`/timeline/${this.props.foto.loginUsuario}`} >
                        {this.props.foto.loginUsuario}
                    </Link>
                </figcaption>
            </figure>

            <time className="foto-data">{this.props.foto.horario}</time>
        </header>
        );
    }
}

class FotoInfo extends Component{


    constructor(props){
        super(props);
        this.state = {
            likers : this.props.foto.likers,
            comentarios:this.props.foto.comentarios
        };
    }

    componentWillMount(){
        Pubsub.subscribe('atualiza-liker',(topico,infoLiker) => {
            if(this.props.foto.id === infoLiker.fotoId){
                const possivelLiker = this.state.likers.find(liker => liker.login === infoLiker.liker.login);
                if(possivelLiker === undefined){
                    const novosLikers = this.state.likers.concat(infoLiker.liker);
                    this.setState({likers:novosLikers});
                }else {
                    const novosLikers = this.state.likers.filter(liker => liker.login !== infoLiker.liker.login);
                    this.setState({likers:novosLikers});
                }
            }
        });
        Pubsub.subscribe('novo-comentarios', (topico,infoComentario) =>
        {
            if(this.props.foto.id === infoComentario.fotoId){
                const novosComentarios = this.state.comentarios.concat(infoComentario.novoComentario);
                this.setState({comentarios:novosComentarios});
            }
        });
    }
    render(){

        return(

            <div className="foto-info">
                <div className="foto-info-likes">

                    {
                        this.state.likers.map(curtida => {
                            return (
                                <Link key={curtida.login} to={`/timeline/${curtida.login}`} >{curtida.login},</Link>)
                    })
                    }
                    ... curtiram
                </div>

                <p className="foto-info-legenda">
                    <Link to={`/timeline/${this.props.foto.loginUsuario} `} className="foto-info-autor">{this.props.foto.loginUsuario} </Link>
                    {this.props.foto.comentario}
                </p>

                <ul className="foto-info-comentarios">

                    {
                        this.state.comentarios.map(comentario => {
                            return(
                                <li className="comentarios" key={comentario.id}>
                                    <Link to={`/timeline/${comentario.login} `} className="foto-info-autor">
                                    {comentario.login}
                                    </Link>
                                    {comentario.texto}
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        );
    }
}

class FotoAtualizacoes extends Component{


    constructor(props){
        super(props);

        this.state = {
            likeada: this.props.foto.likeada,
        };
    }

    curtir(event){
        event.preventDefault();

        let curtirUrl = `http://instalura-api.herokuapp.com/api/fotos/${this.props.foto.id}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;

        fetch(curtirUrl, {method: 'POST'})
        .then(response => {
            if(response.ok){
                return response.json();
            }else{
                throw new Error("não foi possivel curtir a foto");
            }

        })
        .then (liker => {
            this.setState({likeada : !this.state.likeada});
            Pubsub.publish('atualiza-liker',{fotoId:this.props.foto.id,liker});
        })
    }

    comenta(event){
        event.preventDefault();
        const requestInfo = {
            method:'POST',
            body:JSON.stringify({texto:this.comentario.value}),
            headers: new Headers({
                'Content-type':'application/json'
            })
        };

        let comment = `https://instalura-api.herokuapp.com/api/fotos/${this.props.foto.id}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;

        fetch(comment,requestInfo)
            .then(response => {
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error("não foi possível comentar");
                }
            })
            .then(novoComentario => {
                Pubsub.publish('novo-comentarios', { fotoId:this.props.foto.id,novoComentario});
            })
    };

    render(){

        return(
            <section className="fotoAtualizacoes">
                <a onClick={this.curtir.bind(this)} className={this.state.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Linkar</a>
                <form className="fotoAtualizacoes-form" onSubmit={this.comenta.bind(this)}>
                    <input type="text" ref={input => this.comentario = input} placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
                </form>
            </section>
        );
    }
}




export default class Publicacao extends Component{


    componentWillMount(){
        Pubsub.subscribe('atualiza-liker',(topico, infoLiker) => {
            console.log(infoLiker);
        });
    }

    render(){

        return(

            <div className="foto">
                <FotoHeader foto={this.props.foto}/>
                <img alt="foto" className="foto-src" src={this.props.foto.urlFoto}/>
                <FotoInfo foto={this.props.foto} key={this.props.foto.id}/>
                {isLoggedIn() ? '' : (<FotoAtualizacoes foto={this.props.foto}/>)}
            </div>

        );
    }

}

function isLoggedIn() {

    return (localStorage.getItem('auth-token')) === null;

}
/* Cachorro: https://i.pinimg.com/originals/c2/f1/15/c2f1157bd0e45b018fffacccc4624401.jpg*/