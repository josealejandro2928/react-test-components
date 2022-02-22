import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { ToDo } from '../../../store/reducers/to-do.reducer';
import SlideToogle from '../../SlideToogle/SlideToogle';
import styles from './../ToDo.module.scss';
import { updateToDO } from '../../../store/actions/to-do.actions';

const cx = classNames.bind({ ...styles });

function ToDoItem({ toDo }: { toDo: ToDo }): JSX.Element {
  const dispatch = useDispatch();

  function onToogleState(state: boolean) {
    const c = setTimeout(() => {
      dispatch(updateToDO({ id: toDo.id, finished: state }));
      clearTimeout(c);
    }, 300);
  }

  return (
    <div className={cx('todo-item')}>
      <h3 className={cx('todo-item_title', toDo?.finished ? 'completed' : '')}>{toDo?.name}</h3>
      <p className={cx('todo-item_desc', toDo?.finished ? 'completed' : '')}>{toDo?.description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p className={cx('todo-item_date')}>{toDo?.date}</p>
        <SlideToogle checked={toDo.finished} change={onToogleState}></SlideToogle>
      </div>
    </div>
  );
}
export default ToDoItem;
