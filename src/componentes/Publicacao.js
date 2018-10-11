import React , {Component} from "react";
import {Link} from 'react-router-dom';

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

    render(){

        return(

            <div className="foto-info">
                <div className="foto-info-likes">

                    {
                        this.props.foto.likers.map(liker => {
                            return (
                                <Link key={liker.login} href={`/timeline/${liker.login}`} >{liker.login},</Link>)
                    })
                    }
                    ... curtiram
                </div>

                <p className="foto-info-legenda">
                    <a className="foto-info-autor">John_Alves </a>
                    {this.props.foto.comentario}
                </p>

                <ul className="foto-info-comentarios">

                    {
                        this.props.foto.comentarios.map(comentario => {
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
            likeada: this.props.foto.likeada
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
            this.setState({likeada : !this.likeada})
        })
    }

    render(){

        return(
            <section className="fotoAtualizacoes">
                <a onClick={this.curtir.bind(this)} className={this.state.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Linkar</a>
                <form className="fotoAtualizacoes-form">
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
                </form>
            </section>
        );
    }
}




export default class Publicacao extends Component{

    render(){

        return(

            <div className="foto">
                <FotoHeader foto={this.props.foto}/>
                <img alt="foto" className="foto-src" src={this.props.foto.urlFoto}/>
                <FotoInfo foto={this.props.foto} key={this.props.foto.id}/>
                <FotoAtualizacoes foto={this.props.foto}/>
            </div>

        );
    }

}

/* Cachorro: https://i.pinimg.com/originals/c2/f1/15/c2f1157bd0e45b018fffacccc4624401.jpg*/