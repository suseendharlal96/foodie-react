import React from 'react';

import styels from './DrawerToggle.module.css';

const drawerToggle = (props) => (
    <div className={styels.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;