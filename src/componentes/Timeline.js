import React , {Component} from "react";
import Publicacao from "./Publicacao";

export default class Timeline extends Component  {


    constructor(){
        super();
        this.state ={
            fotos:[]
        };
    }


    componentDidMount(){

        let urlPerfil;

        if(this.login === undefined) {
            urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {
            urlPerfil = `http://localhost:8080/api/public/fotos/${this.props.login}`;
        }

        fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => {
                this.setState({fotos:fotos});
            });
    }

    render(){

        return(
            <div className="fotos container">

                {
                    this.state.fotos.map(foto => <Publicacao foto={foto} key={foto.id}/>)
                }

            </div>

        );
    }

}