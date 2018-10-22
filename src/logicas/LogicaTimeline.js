import Pubsub from 'pubsub-js';

export default class LogicaTimeline {


    constructor(fotos){
        this.fotos = fotos;
    }

    listar(urlPerfil){
        fetch(urlPerfil)
            .then(response => {
                if(response.ok){
                    return response.json();
                }else{
                    throw new Error("não foi possivel carregar as fotos");
                }
            })
            .then(fotos => {
                this.fotos = fotos;
                Pubsub.publish('timeline',this.fotos);
            })
    }
    subscribe(callback){
        Pubsub.subscribe('timeline',(topico,fotos) => {
            callback(fotos);
        });

    }

    curtir(fotoId,){
        let curtirUrl = `http://instalura-api.herokuapp.com/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;

        fetch(curtirUrl, {
            method: 'POST'
        })
            .then(response => {
                if(response.ok){
                    return response.json();
                }else{
                    throw new Error("não foi possivel curtir a foto");
                }
            })
            .then (liker => {
                const fotoEncontrada = this.fotos.find(foto => foto.id === fotoId);
                fotoEncontrada.likeada=!fotoEncontrada.likeada;
                const possivelLiker = fotoEncontrada.likers.find(likerAtual => likerAtual.login === liker.login);

                if(possivelLiker === undefined){
                    fotoEncontrada.likers.push(liker);
                }else {
                    const novosLikers = fotoEncontrada.likers.filter(likerAtual => likerAtual.login !== liker.login);
                    fotoEncontrada.likers = novosLikers;
                }
                Pubsub.publish('timeline',this.fotos)
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
                const fotoEncontrada = this.fotos.find(foto => foto.id === fotoId);
                fotoEncontrada.comentarios.push(novoComentario);
                Pubsub.publish('timeline', this.fotos);
            })
    }
}