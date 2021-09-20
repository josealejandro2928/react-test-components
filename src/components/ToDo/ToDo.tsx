import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import styles from './ToDo.module.scss';
import { getTodos, saveTodosToStorage } from '../../store/actions/to-do.actions';
import ToDoItem from './TodoItem/TodoItem';
import Button from '../Button/Button';
import { useModal } from '../Modal/Modal';
import ToDoForm from './TodoForm/TodoForm';

const cx = classNames.bind({ ...styles });

function ToDo(): JSX.Element {
  const { list: allTodos } = useSelector((state: RootState) => state.toDo);
  const [mount, setMount] = useState(false);
  const dispatch = useDispatch();
  const { setComponentToRender } = useModal();

  useEffect(() => {
    dispatch(getTodos());
    setMount(true);
  }, []);

  useEffect(() => {
    if (mount) {
      saveTodosToStorage(allTodos);
    }
  }, [allTodos]);

  const toDoNotFinished = allTodos.filter((el) => !el.finished);
  const toDoFinished = allTodos.filter((el) => el.finished);

  return (
    <div className={cx('todo-container')}>
      <div className={cx('todo-container_left')}>
        <h2 style={{ margin: '1rem 0px' }}>Tasks not completed </h2>
        {toDoNotFinished.map((el) => (
          <ToDoItem toDo={el} key={el.id} />
        ))}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
          <Button
            onClick={() => {
              setComponentToRender(<ToDoForm />, {
                closeOnBackgroundOrEsc: false,
                width: '15cm',
                animation: true,
                title: 'Todo',
              });
            }}
            style={{ borderRadius: '50%', padding: '0px', height: '42px', width: '42px' }}
          >
            <i className="fas fa-plus"></i>
          </Button>
        </div>
      </div>
      <div className={cx('todo-container_right')}>
        <h2 style={{ margin: '1rem 0px' }}>Tasks completed </h2>
        {toDoFinished.map((el) => (
          <ToDoItem toDo={el} key={el.id} />
        ))}
      </div>
    </div>
  );
}
export default ToDo;
