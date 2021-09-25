/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState } from 'react';
import classes from './styles.module.scss';

export interface StepperProps {
  children?: Array<ReactElement> | null | undefined;
  indexStep?: number;
  stepChange?: Function;
  headerStyles?: HeaderStepStyles;
  linearMode?: boolean;
  verticalLabels?: boolean;
  hideLabels?: boolean;
  hideLines?: boolean;
}

export function Stepper({
  children,
  indexStep = 1,
  stepChange = (_index: number) => {},
  linearMode = false,
  verticalLabels = false,
  hideLabels = false,
  hideLines = false,
  headerStyles = { color: '#fff', activatedStepBackground: '#3f51b5', stepsBackgroud: '#616161', lineColor: '#616161' },
}: StepperProps): JSX.Element {
  const [steps, setSteps] = useState<Array<ReactElement> | null | undefined>([]);
  const [labels, setLabels] = useState<Array<{ label?: string; id?: string }>>([]);
  const [activatedStep, setActivatesStep] = useState<number>(indexStep);

  useEffect(() => {
    if (children && children.length) {
      initSteps();
    }
  }, [children]);

  useEffect(() => {
    if (steps?.length) {
      let index = Math.max(0, indexStep);
      index = Math.min(index, steps?.length - 1);
      if (steps && steps[index].props.disabled) {
        stepChange(activatedStep);
        return;
      }
      if (!linearMode || Math.abs(activatedStep - index) === 1) {
        setActivatesStep(index);
        stepChange(index);
      }
    }
  }, [indexStep]);

  function initSteps() {
    setSteps(children);
    setLabels(
      (children || []).map((step) => ({
        label: step.props.label,
        id: Math.random() + '',
      }))
    );
  }

  function onClickStep(index: number) {
    if (steps && steps[index].props.disabled) {
      stepChange(activatedStep);
      return;
    }
    if (!linearMode || Math.abs(activatedStep - index) === 1) {
      setActivatesStep(index);
      stepChange(index);
    }
  }

  return (
    <div>
      <HeaderStep
        clickStep={onClickStep}
        labels={labels}
        activeLabel={activatedStep}
        headerStyles={headerStyles}
        verticalLabels={verticalLabels}
        hideLabels={hideLabels}
        hideLines={hideLines}
      ></HeaderStep>

      <div className={classes['body']}>
        {steps?.map((step: ReactElement, index) => {
          if (index < activatedStep) {
            return (
              <div
                className={classes['step-container']}
                key={index}
                style={{ transform: 'translate3d(-100%, 0px, 0px)', height: '0px', overflow: 'hidden' }}
              >
                {step}
              </div>
            );
          }
          if (index > activatedStep) {
            return (
              <div
                className={classes['step-container']}
                key={index}
                style={{ transform: 'translate3d(100%, 0px, 0px)', height: '0px', overflow: 'hidden' }}
              >
                {step}
              </div>
            );
          } else {
            return (
              <div
                className={classes['step-container']}
                key={index}
                style={{ visibility: 'inherit', overflow: 'auto', height: 'auto' }}
              >
                {step}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

//////////////////HEADER STEPS///////////////////

export interface HeaderSteps {
  labels: Array<{ label?: string; id?: string }>;
  activeLabel: number;
  headerStyles?: HeaderStepStyles;
  clickStep: Function;
  verticalLabels?: boolean;
  hideLabels?: boolean;
  hideLines?: boolean;
}

export interface HeaderStepStyles {
  color?: string;
  activatedStepBackground?: string;
  stepsBackgroud?: string;
  lineColor?: string;
}

export const HeaderStep = React.memo(function ({
  labels,
  activeLabel,
  headerStyles = { color: '#fff', activatedStepBackground: '#3f51b5', stepsBackgroud: '#616161', lineColor: '#616161' },
  clickStep = (_index: number) => {},
  verticalLabels = false,
  hideLines = false,
  hideLabels = false,
}: HeaderSteps): JSX.Element {
  const headerEl = labels.map((label, index) => (
    <React.Fragment key={label.id}>
      <div
        className={classes['label']}
        onClick={() => {
          clickStep(index);
        }}
        style={{ flexDirection: verticalLabels ? 'column' : 'row' }}
      >
        <div
          className={classes['index']}
          style={{
            color: headerStyles.color,
            backgroundColor: index === activeLabel ? headerStyles.activatedStepBackground : headerStyles.stepsBackgroud,
          }}
        >
          {index + 1}
        </div>
        {label.label && !hideLabels && (
          <span
            className={index === activeLabel ? classes['text-selected'] : ''}
            style={{ margin: verticalLabels ? '10px 0px 10px 0px' : '10px 0px 10px 10px' }}
          >
            {label.label}
          </span>
        )}
      </div>
      {!hideLines && <div className={classes['line']} style={{ borderColor: headerStyles.lineColor }}></div>}
    </React.Fragment>
  ));
  return <div className={classes['header']}>{headerEl}</div>;
});

//////////////////STEPS///////////////////
export interface Steps {
  children?: any;
  label?: string;
  disabled?: boolean;
}

export function Step({ children, label, disabled = false }: Steps): JSX.Element {
  return <div>{children}</div>;
}
