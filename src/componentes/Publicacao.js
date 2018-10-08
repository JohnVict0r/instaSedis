import React , {Component} from "react";


class PublicacaoHeader extends Component{

    render(){
        return(
        <header className="foto-header">
            <figure className="foto-usuario">
                <img src={this.props.foto.urlPerfil} alt="foto do usuario"/>
                <figcaption className="foto-usuario">
                    <a href="#">
                        {this.props.foto.loginUsuario}
                    </a>
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
                                <a href="#" key={liker.id}>{liker.login}, </a>)
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
                                <li className="comentario" key={comentario.id}>
                                    <a className="foto-info-autor"> {comentario.login}</a>
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

    render(){

        return(
            <section className="fotoAtualizacoes">
                <a href="#" className="fotoAtualizacoes-like">Linkar</a>
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
                <PublicacaoHeader foto={this.props.foto}/>
                <img alt="foto" className="foto-src" src={this.props.foto.urlFoto}/>
                <FotoInfo foto={this.props.foto} key={this.props.foto.id}/>
                <FotoAtualizacoes/>
            </div>

        );
    }

}

/* Cachorro: https://i.pinimg.com/originals/c2/f1/15/c2f1157bd0e45b018fffacccc4624401.jpg*/