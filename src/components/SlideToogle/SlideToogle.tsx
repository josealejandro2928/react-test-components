import React, { useEffect, useState } from 'react';
import './SlideToogle.scss';

function SlideToogle({
  checked = false,
  label = false,
  disabled = false,
  change = (status: boolean) => {},
}): JSX.Element {
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    setActivated(checked);
  }, []);

  function onClickHandler() {
    if (disabled) return;
    setActivated(!activated);
    change(!activated);
  }

  let classContainer = activated ? 'SlideToogle activated' : 'SlideToogle';
  let classToogle = activated ? 'toogle activated' : 'toogle';

  disabled && (classContainer += ' disabled');

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div onClick={onClickHandler} className={classContainer}>
        <div className={classToogle}></div>
      </div>
      {label && (activated ? <span style={{ marginLeft: 8 }}>On</span> : <span style={{ marginLeft: 8 }}>Off</span>)}
    </div>
  );
}
export default SlideToogle;
