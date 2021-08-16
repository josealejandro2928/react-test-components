import React from 'react';
import logo from '../../assets/images/logo.svg';
import LinkBtn from '../LinkBtn/LinkBtn';
import './Header.scss';

function Header({ links = [] }: { links?: any[] }): JSX.Element {
  return (
    <div className="Header">
      <div className="section" style={{ flex: '1 0 100%', maxWidth: '40%' }}>
        <img className="logo" src={logo} alt="logo" />
        <span className="title">Testing React Components</span>
      </div>

      <div className="section" style={{ flex: '1 1 100%', maxWidth: '100%', justifyContent: 'flex-end' }}>
        {links.map((item, index) => (
          <LinkBtn key={index} name={item.name} icon={item.icon} />
        ))}
      </div>
    </div>
  );
}
export default Header;
