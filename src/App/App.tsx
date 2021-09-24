import React from 'react';
import { Modal, useModal } from 'react-hook-modal';
import Button from '../components/Button/Button';
import FileTree from '../components/FileTree/FileTree';
import Header from '../components/Header/Header';

import SlideToogle from '../components/SlideToogle/SlideToogle';
import ToDo from '../components/ToDo/ToDo';
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
              width: '15cm',
              closeOnBackgroundOrEsc: false,
              animation: true,
            });
          }}
        >
          Modal 1
        </Button>
        <Button
          style={{ marginLeft: '8px' }}
          onClick={(e: any) => {
            setComponentToRender(
              <div>
                <h2>Lorem, ipsum dolor sit!</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, culpa quae? Quisquam voluptatem
                  amet porro, atque, omnis iure ea maiores soluta vel quibusdam nihil laudantium iste, incidunt
                  reprehenderit illo aliquam?
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, culpa quae? Quisquam voluptatem
                  amet porro, atque, omnis iure ea maiores soluta vel quibusdam nihil laudantium iste, incidunt
                  reprehenderit illo aliquam?
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, culpa quae? Quisquam voluptatem
                  amet porro, atque, omnis iure ea maiores soluta vel quibusdam nihil laudantium iste, incidunt
                  reprehenderit illo aliquam?
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, culpa quae? Quisquam voluptatem
                  amet porro, atque, omnis iure ea maiores soluta vel quibusdam nihil laudantium iste, incidunt
                  reprehenderit illo aliquam?
                </p>
                <blockquote>
                  <p>
                    Note: It is possible to use template-driven forms instead, if you prefer. We use reactive forms in
                    this example because it makes subscribing to changes in the input's value easy. For this example, be
                    sure to import <code>ReactiveFormsModule</code> from <code>@angular/forms</code> into your{' '}
                    <code>NgModule</code>. If you are unfamiliar with using reactive forms, you can read more about the
                    subject in the
                    <a href="https://angular.io/guide/reactive-forms">Angular documentation</a>.
                  </p>
                </blockquote>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, culpa quae? Quisquam voluptatem
                  amet porro, atque, omnis iure ea maiores soluta vel quibusdam nihil laudantium iste, incidunt
                  reprehenderit illo aliquam?
                </p>

                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, culpa quae? Quisquam voluptatem
                  amet porro, atque, omnis iure ea maiores soluta vel quibusdam nihil laudantium iste, incidunt
                  reprehenderit illo aliquam?
                </p>
              </div>,
              {
                title: 'Full Text Description',
                width: '25cm',
                closeOnBackgroundOrEsc: true,
                resizable: true,
              }
            );
          }}
        >
          Modal 2
        </Button>
        <Button
          style={{ marginLeft: '8px' }}
          onClick={(e: any) => {
            setComponentToRender(
              <div style={{ display: 'grid', placeItems: 'center', height: '80vh', maxHeight: '100%' }}>
                <iframe
                  style={{ width: 1280, height: 720, maxWidth: '100%', maxHeight: '100%' }}
                  src="https://www.youtube.com/embed/Tn6-PIqc4UM?list=PL0vfts4VzfNgUUEtEjxDVfh4iocVR3qIb"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>,
              {
                title: 'React explined in 100 seconds',
                closeOnBackgroundOrEsc: false,
                fullScreen: true,
              }
            );
          }}
        >
          Modal 3
        </Button>
      </Section>

      <Section title="TO-DO app with React Redux" description="*Example todo app for practice with redux">
        <ToDo />
      </Section>

      {/* Modal section here */}
      <Modal
        styles={{
          container: { width: '30rem', backgroundColor: '#323232', color: '#fff' },
          header: { backgroundColor: '#1e1e1e', color: '#fff' },
          body: { maxHeight: '80vh' },
        }}
      />
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
