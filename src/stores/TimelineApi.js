export default class TimelineApi {

    static listar(urlPerfil){
        return dispatch => {
            fetch(urlPerfil)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("não foi possivel carregar as fotos");
                    }
                })
                .then(fotos => {
                    dispatch({type: 'LISTAGEM', fotos});
                    return fotos;
                })
        }
    }

    static curtir(fotoId,){
        return dispatch => {
            const curtirUrl = `http://instalura-api.herokuapp.com/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;

            fetch(curtirUrl, {
                method: 'POST'
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("não foi possivel curtir a foto");
                    }
                })
                .then(liker => {
                    dispatch({type:'CURTIDA',fotoId,liker});
                    return liker;
                })
        }
    }

    static comentar(fotoId,comentario){

            return dispatch => {
                const requestInfo = {
                    method: 'POST',
                    body: JSON.stringify({texto: comentario}),
                    headers: new Headers({
                        'Content-type': 'application/json'
                    })
                };

                const comment = `https://instalura-api.herokuapp.com/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;

                fetch(comment, requestInfo)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error("não foi possível comentar");
                        }
                    })
                    .then(novoComentario => {
                        dispatch({type: 'COMENTANDO', fotoId, novoComentario});
                        return novoComentario;
                    })
            }
    }

}
