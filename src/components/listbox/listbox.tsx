import React from 'react';
import './listbox.css';
import classNames from 'classnames';

type Props = {}

export default function ListBox( props : React.HTMLProps<HTMLDivElement> )
{
    // 들어온 클래스명을 합친다
    const { className } = props;
    const combinedClassName = classNames('box-style1', className)
    
    return(
        <div 
            {...props}
            className={combinedClassName}>
        </div>
    )
}

