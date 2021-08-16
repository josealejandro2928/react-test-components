import React from 'react';
import Header from '../components/Header/Header';
import SlideToogle from '../components/SlideToogle/SlideToogle';
import './App.scss';

function App() {
  const linksApp = [
    { name: 'Home', icon: 'fas fa-home' },
    { name: 'Notifications', icon: 'fas fa-bell' },
    { name: 'Account', icon: 'fas fa-user-circle' },
    { name: 'Settings', icon: 'fas fa-cogs' },
  ];

  return (
    <div className="App">
      <Header links={linksApp} />
      <Section title="Slide Toogle" description="*Componente para implementar la funcionalidad de los switch">
        <SlideToogle></SlideToogle>
        <br />
        <SlideToogle label></SlideToogle>
        <br />
        <SlideToogle checked></SlideToogle>
        <br />
        <SlideToogle checked disabled></SlideToogle>
      </Section>

      <Section title="File tree" description="*Componente para la vista de ficheros">
        Here goes the file tree
      </Section>
    </div>
  );
}

function Section({ children, title = '', description = '' }: { children: any; title?: string; description?: string }) {
  return (
    <section className="container Section">
      <h2>{title}</h2>
      {description && <p className="description">{description}</p>}
      {children}
    </section>
  );
}

export default App;
