const initialState = {
    TodoLists: [],
    activeListId: 0
};

const list = {
    Id: 0,
    IsActive: true,
    Name: "",
    DateCreated: "",
    DateFinished: "",
    Tasks: []
};


const todolists = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_LIST': {
            return Object.assign({}, state, {
                TodoLists: state.TodoLists.concat(action.data)
            });
        }
        case 'UPDATE_ACTIVE_LIST': {
            state.activeListId = action.data.value;
            return {...state};
        }
        case 'ADD_TASK': {
            console.log('test='+JSON.stringify(state.TodoLists.filter(list=>(list.Id == state.activeListId))));
            state.TodoLists.filter(list=>(list.Id == state.activeListId))[0].Tasks.push(action.data);
            return {...state};
        }   
        default:
            break;
    }
    return {...state};
}

export default todolists;