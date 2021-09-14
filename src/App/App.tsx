import React from 'react';
import Button from '../components/Button/Button';
import FileTree from '../components/FileTree/FileTree';
import Header from '../components/Header/Header';
import Modal, { useModal } from '../components/Modal/Modal';
import SlideToogle from '../components/SlideToogle/SlideToogle';
import './App.scss';

function App() {
  const linksApp = [
    { name: 'Home', icon: 'fas fa-home' },
    { name: 'Notifications', icon: 'fas fa-bell' },
    { name: 'Account', icon: 'fas fa-user-circle' },
    { name: 'Settings', icon: 'fas fa-cogs' },
  ];

  const { setComponentToRender } = useModal(onCloseFunction);

  function onCloseFunction(data: any) {
    console.log('Close callback', data);
  }

  return (
    <div className="App">
      <Header links={linksApp} />
      <Section title="Slide Toogle" description="*Componente para implementar la funcionalidad de los switch">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', rowGap: '1rem', maxWidth: '200px' }}>
          <SlideToogle></SlideToogle>
          <br />
          <SlideToogle label></SlideToogle>
          <br />
          <SlideToogle checked></SlideToogle>
          <br />
          <SlideToogle checked disabled></SlideToogle>
        </div>
      </Section>

      <Section title="File tree" description="*Componente para la vista de ficheros">
        <FileTree />
      </Section>

      <Section title="Dynamic Modal" description="*Componente para implementar Modales">
        <Button
          onClick={(e: any) => {
            setComponentToRender(<FileTree />, {
              title: 'Arbol de archivos',
              dataProps: { name: 'Jose Alejandro' },
              width: '20cm',
              height: '45vh',
            });
          }}
        >
          Modal 1
        </Button>
      </Section>

      {/* Modal section here */}
      <Modal styles={{ container: { width: '30rem', backgroundColor: '#323232', color: '#fff' } }} />
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
