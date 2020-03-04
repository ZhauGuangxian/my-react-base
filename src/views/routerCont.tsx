import React, { Component } from 'react';
import renderRoutes from '@/routes/guard.jsx';

class RouteContent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const routes = (this.props.route || {}).routes || [];
        return <div>{renderRoutes(routes)}</div>;
    }
}

export default RouteContent;