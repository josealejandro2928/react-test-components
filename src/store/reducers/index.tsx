import { combineReducers } from 'redux';

import todoReducer, { ToDoState } from './to-do.reducer';

export interface RootState {
  toDo: ToDoState;
}

const rootReducer = combineReducers<RootState>({
  toDo: todoReducer,
});

export default rootReducer;
