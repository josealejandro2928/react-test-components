/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './LinkBtn.scss';

function LinkBtn({ name = '', icon = '' }: { name: string; icon: string }): JSX.Element {
  return (
    <a href="#" className="LinkBtn">
      <i className={icon}></i>
      <div className="tooltip">{name}</div>
    </a>
  );
}
export default LinkBtn;
