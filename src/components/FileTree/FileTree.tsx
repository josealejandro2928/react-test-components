import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import styles from './FileTree.module.scss';

const cx = classNames.bind({ ...styles });

export interface IFile {
  name: string;
  type: string;
  children?: Array<IFile>;
  open?: boolean;
}

function FileTree(): JSX.Element {
  const [tree, setTree] = useState<IFile[]>([
    {
      name: 'Music',
      type: 'directory',
      children: [
        {
          name: 'pop',
          type: 'directory',
          children: [
            { name: 'Example music #1.mp3', type: 'file' },
            { name: 'Example music #2.mp3', type: 'file' },
          ],
        },
        {
          name: 'rock',
          type: 'directory',
          children: [
            { name: 'Example music rock #1.mp3', type: 'file' },
            { name: 'Example music rock #2.mp3', type: 'file' },
          ],
        },
      ],
    },
    {
      name: 'Photos',
      type: 'directory',
      children: [
        { name: 'Example image #1.png', type: 'file' },
        { name: 'Example image #2.jpeg', type: 'file' },
        { name: 'Example image #3.jpeg', type: 'file' },
      ],
    },
  ]);

  function onToogleItem(id: string) {
    let levels = id.split('-');
    let nodes: any = tree;
    while (levels.length) {
      const index: any = levels.shift();
      if (index) {
        if (Array.isArray(nodes)) {
          nodes = nodes[index];
        } else {
          nodes = nodes?.children[index];
        }
      }
    }
    if (nodes.type === 'file') return;
    nodes.open = !nodes.open;
    setTree([...tree]);
  }

  return (
    <div style={{ padding: '20px' }}>
      {tree?.map((el: IFile, index: number) => (
        <FileItem key={Math.random() + index} file={el} setToogle={onToogleItem} id={`${index}-`} />
      ))}
    </div>
  );
}
export default React.memo(FileTree);

const FileItem = React.memo(
  ({ file, setToogle = () => {}, id }: { file: IFile; setToogle: Function; id: string }): JSX.Element => {
    return (
      <>
        {file && (
          <div className={cx({ File: true, File_directory: file.type === 'directory' && file.open })}>
            <div
              style={{ cursor: file.type === 'directory' ? 'pointer' : 'default' }}
              onClick={() => {
                setToogle(id);
              }}
              className={cx('File_header')}
            >
              {file.type === 'directory' && (
                <i className={cx('fa fa-chevron-up', file.open ? 'file-open' : 'file-close')}></i>
              )}{' '}
              {file.name}
            </div>
            {file.type === 'directory' && file.open && (
              <div className={cx('File_body')}>
                {file?.children?.map((el, index) => (
                  <FileItem key={Math.random() + index} file={el} setToogle={setToogle} id={`${id}${index}-`} />
                ))}
              </div>
            )}
          </div>
        )}
      </>
    );
  }
);
