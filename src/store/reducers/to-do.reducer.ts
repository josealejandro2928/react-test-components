////////////////////////// INTERFASES ////////////////////////
export interface ToDo {
  name: string;
  description: string;
  date: Date;
  id: string;
  tags?: string[];
  createdAt: Date;
  finished: boolean;
}

export interface ToDoState {
  list: Array<ToDo>;
  selectedTodo: ToDo | null | undefined;
  loading: boolean;
  error: any;
}
/////////////////////////////////////////////////////////////////

////////////////////////TYPES////////////////////////////////

export const ADD_NEW_TO_DO = 'ADD_NEW_TO_DO';
export const SET_ALL_TO_DO = 'SET_ALL_TO_DO';
export const DELETE_TO_DO = 'DELETE_TO_DO';
export const UPDATE_TO_DO = 'UPDATE_TO_DO';
export const LOADING_TO_DO = 'LOADING_TO_DO';
export const ERROR_TO_DO = 'ERROR_TO_DO';


///////////////////////////////////////////////////////////

const initialState: ToDoState = {
  list: [],
  selectedTodo: null,
  loading: false,
  error: null
};

const todoReducer = (state: ToDoState = initialState, action: { type: string; payload?: any }): ToDoState => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALL_TO_DO:
      return { ...state, list: payload, loading: false }
    case ADD_NEW_TO_DO:
      return { ...state, list: [...state.list, payload], loading: false }
    case DELETE_TO_DO:
      return { ...state, list: state.list.filter((el) => el.id !== payload), loading: false }
    case UPDATE_TO_DO:
      let todoIndex = state.list.findIndex((el) => el.id === payload.id);
      if (todoIndex === -1) return state;
      const todo: ToDo = { ...state.list[todoIndex], ...payload };
      const todoList = [...state.list];
      todoList[todoIndex] = todo;
      return { ...state, list: todoList, loading: false }
    case LOADING_TO_DO:
      return { ...state, loading: payload }
    case ERROR_TO_DO:
      return { ...state, error: payload, loading: false }
    default:
      return state;

  }
}

export default todoReducer;