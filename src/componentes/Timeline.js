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

        if(this.props.login === undefined) {
            urlPerfil = `http://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {
            urlPerfil = `http://instalura-api.herokuapp.com/api/public/fotos/${this.props.login}`;
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