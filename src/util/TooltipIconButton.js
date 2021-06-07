import React from 'react';
//MUI stuff
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const TooltipIconButton = ({ children, onclick, tip, tipClass, btnClass }) => (
    <Tooltip title={tip} className={tipClass} placement="top">
        <IconButton className={btnClass} onClick={onclick}>
            {children}
        </IconButton>
    </Tooltip>
)

export default TooltipIconButton;
