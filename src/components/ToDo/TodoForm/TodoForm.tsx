/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ToDo } from '../../../store/reducers/to-do.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import Button from '../../Button/Button';
import { createTodo } from '../../../store/actions/to-do.actions';
import { useModal } from 'react-hook-modal';

function ToDoForm(): JSX.Element {
  const [toDoForm, setToDoForm] = useState<any>({
    name: {
      value: '',
      error: false,
      blur: false,
    },
    description: {
      value: '',
      error: false,
      blur: false,
    },
    date: {
      value: '',
      error: false,
      blur: false,
    },
  });
  const { setFooter, closeModal } = useModal();
  const dispatch = useDispatch();

  const selectedTodo = useSelector((state: RootState) => state.toDo.selectedTodo);

  useEffect(() => {
    buildForm(selectedTodo);
    updateErrorState();
  }, [selectedTodo]);

  function buildForm(toDo?: any) {
    if (!toDo) {
      setToDoForm({
        name: {
          value: '',
          error: false,
          blur: false,
        },
        description: {
          value: '',
          error: false,
          blur: false,
        },
        date: {
          value: '',
          error: false,
          blur: false,
        },
      });
    } else {
      Object.keys(toDo).map((key) => setDataValue(key, toDo[key]));
    }
  }

  function setDataValue(key: string, value: any) {
    if (key in toDoForm) {
      setToDoForm({ ...toDoForm, [key]: { value, error: value ? '' : `${key} value is required` } });
    }
  }

  function isDisabled() {
    return Object.keys(toDoForm).reduce((acc, curr) => {
      return acc || toDoForm[curr].error;
    }, false);
  }

  function updateErrorState() {
    let form = { ...toDoForm };
    Object.keys(toDoForm).map((key) => {
      if (!toDoForm[key].value) {
        setToDoForm({ ...toDoForm, [key]: { ...form[key], error: `${key} value is required` } });
      }
      return true;
    });
  }

  function onSaveToDo() {
    let todo: ToDo = Object.keys(toDoForm).reduce((acc, curr) => {
      acc[curr] = toDoForm[curr].value;
      return acc;
    }, {} as any);
    todo.id = Math.floor(Math.random() * 100000) + '';
    todo.finished = false;
    todo.createdAt = new Date();
    dispatch(createTodo(todo));
    closeModal();
  }

  /////PUTTING THE SUBMIT BUTTON INSIDE THE FOOTER OF MODAL /////////////////
  const footer = (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button disabled={isDisabled()} onClick={onSaveToDo}>
        Guardar
      </Button>
    </div>
  );
  ////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setFooter(footer);
  }, [toDoForm]);

  return (
    <div>
      <div className="form-item">
        <label htmlFor="name">Name</label>
        <input
          onChange={(e) => setDataValue('name', e.target.value)}
          value={toDoForm?.name?.value}
          name="name"
          type="text"
          onBlur={() => setToDoForm({ ...toDoForm, name: { ...toDoForm.name, blur: true } })}
        />
        {toDoForm.name.error && toDoForm.name.blur && <small className="error">{toDoForm.name.error}</small>}
      </div>
      <div className="form-item">
        <label htmlFor="description">Description</label>
        <textarea
          onChange={(e) => setDataValue('description', e.target.value)}
          value={toDoForm?.description?.value}
          name="description"
          onBlur={() => setToDoForm({ ...toDoForm, description: { ...toDoForm.description, blur: true } })}
        ></textarea>
        {toDoForm.description.error && toDoForm.description.blur && (
          <small className="error">{toDoForm.description.error}</small>
        )}
      </div>
      <div className="form-item">
        <label htmlFor="date">Date</label>
        <input
          onChange={(e) => setDataValue('date', e.target.value)}
          value={toDoForm?.date?.value}
          name="date"
          type="date"
          onBlur={() => setToDoForm({ ...toDoForm, date: { ...toDoForm.date, blur: true } })}
        />
        {toDoForm.date.error && toDoForm.date.blur && <small className="error">{toDoForm.date.error}</small>}
      </div>
    </div>
  );
}
export default ToDoForm;
