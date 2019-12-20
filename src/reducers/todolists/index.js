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
            state.TodoLists.filter(list=>(list.Id == state.activeListId))[0].Tasks.push(action.data);
            return {...state};
        }
        case 'UPDATE_TASK': {
            state.TodoLists.filter(list=>(list.Id == state.activeListId))[0].Tasks.filter(task=>(task.Id == action.data.Id))[0].Name = action.data.Name;
            return {...state};
        }
        case 'FINISH_TASK': {
            state.TodoLists.filter(list=>(list.Id == state.activeListId))[0].Tasks.filter(task=>(task.Id == action.data.Id))[0].IsActive = action.data.IsActive;
            return {...state};
        }
        default:
            break;
    }
    return {...state};
}

export default todolists;