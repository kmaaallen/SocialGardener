import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

export default ({ children, onclick, tip, tipClass, btnClass}) => (
    <Tooltip title={tip} className={tipClass} placement="top">
        <IconButton className={btnClass} onClick={onclick}>
            {children}
        </IconButton>
    </Tooltip>
)
