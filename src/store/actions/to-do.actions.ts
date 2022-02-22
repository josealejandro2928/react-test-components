import { ADD_NEW_TO_DO, ERROR_TO_DO, SET_ALL_TO_DO, ToDo, UPDATE_TO_DO } from "../reducers/to-do.reducer";

const getTodosFromStorage = () => {
  return new Promise((resolve) => {
    resolve(JSON.parse(localStorage.getItem('to-do') || '[]'));
  })
}

export const saveTodosToStorage = (data: ToDo[]) => {
  return new Promise((resolve) => {
    localStorage.setItem('to-do', JSON.stringify(data || []))
    resolve(true);
  })
}

export const getTodos = () => (
  async (dispatch: Function) => {
    try {
      let data = await getTodosFromStorage();
      dispatch({
        type: SET_ALL_TO_DO,
        payload: data
      })

    } catch (err) {
      const error: any = err;
      dispatch({
        type: ERROR_TO_DO,
        payload: error?.message
      })
    }
  }
)

export const createTodo = (data: ToDo) => (
  (dispatch: Function) => {
    dispatch({
      type: ADD_NEW_TO_DO,
      payload: data
    })
  }
)

export const updateToDO = (data: any) => (
  (dispatch: Function) => {
    dispatch({
      type: UPDATE_TO_DO,
      payload: data
    })
  }
)
