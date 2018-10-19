import React , {Component} from "react";
import Pubsub from 'pubsub-js';

export  default class Header extends Component  {

    pesquisa(event){
        event.preventDefault();
        fetch(`http://instalura-api.herokuapp.com/api/public/fotos/${this.loginPesquisado.value}`)
        .then(response => {
            if(response.ok){
                return response.json();
            }else{
                throw new Error("não foi possivel carregar as fotos");
            }

        })
        .then(fotos => {
            Pubsub.publish('timeline-pesquisa',{fotos});
        });
    }

    render(){

        return(
        <header className="header container">
            <h1 className="header-logo">
                Instasedis
            </h1>

            <form className="header-busca" onSubmit={this.pesquisa.bind(this)}>
                <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={input => this.loginPesquisado = input}/>
                <input type="submit" value="Buscar" className="header-busca-submit"/>
            </form>

            <nav>
                <ul className="header-nav">
                    <li className="header-nav-item">
                        <a href="/logout">
                            sair
                            {/*                 ♥ */}
                            {/* Quem deu like nas minhas fotos */}
                        </a>
                    </li>
                </ul>
            </nav>

        </header>

        );
    }

}