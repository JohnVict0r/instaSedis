//REDUCER
export function timeline(state=[], action) {

    const fotoId = action.fotoId;
    const liker = action.liker;
    const novoComentario = action.novoComentario;

    if(action.type === 'LISTAGEM'){
        return action.fotos;
    }
    if(action.type === 'CURTIDA'){

        const fotoEncontrada = state.find(foto => foto.id === fotoId);
        fotoEncontrada.likeada = !fotoEncontrada.likeada;
        const possivelLiker = fotoEncontrada.likers.find(likerAtual => likerAtual.login === liker.login);

        if (possivelLiker === undefined) {
            fotoEncontrada.likers.push(liker);
        } else {
            const novosLikers = fotoEncontrada.likers.filter(likerAtual => likerAtual.login !== liker.login);
            fotoEncontrada.likers = novosLikers;
        }

        return state;
    }
    if(action.type === 'COMENTANDO'){

        const fotoEncontrada = state.find(foto => foto.id === fotoId);
        fotoEncontrada.comentarios.push(novoComentario);
        return state;
    }
    return state;

}

