//REDUCER
export function timelineReducer(state=[], action) {
    if(action.type === 'LISTAGEM'){

        return action.fotos;
    }
    return state;

}

