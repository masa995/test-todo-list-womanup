import React from 'react'
import dayjs from 'dayjs';
// import PropTypes from 'prop-types'

import checkImg from '../../assets/img/check.svg';
import editImg from '../../assets/img/edit.svg';
import removeImg from '../../assets/img/remove.svg';

function Task({ onRemoveTask, onCompleteTask, onEditTask, limit, id, title, text, date, file, complete }) {

  return (
    <li className={!limit ? 'todo__item limit' : 'todo__item'}>
      <div className="checkbox todo__checkbox">
        <input
          className='hidden'
          id={id}
          type="checkbox"
          checked={complete}
          onChange={(e) => { onCompleteTask(id, e.target.checked) }}
        />

        <label htmlFor={id}>
          <img src={checkImg} alt="Выполнено" />
        </label>
      </div>

      <div className='todo__item-content'>
        <p className='todo__item-title'>{title}</p>
        <p className='todo__item-desc'>{text}</p>
        <p className='todo__item-date'>{`до ${dayjs(date).format('D.M.YYYY')}`}</p>
      </div>

      <div className='todo__item-box'>
        <button
          className='button'
          onClick={() => onEditTask(id)}
        >
          <img src={editImg} alt="Редактировать задачу" />
        </button>
        <button
          className='button'
          onClick={() => { onRemoveTask(id) }}
        >
          <img src={removeImg} alt="Удалить задачу" />
        </button>

        <div className='todo__file-box'>
          <p>{file ? file.name : ''}</p>
        </div>
      </div>
    </li>
  )
}

// Task.propTypes = {}

export default Task
