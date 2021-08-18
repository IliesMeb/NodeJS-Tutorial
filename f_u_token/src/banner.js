import React from 'react';
import './App.css';
import background from "./ABSTRACT_BACKGROUND_01.jpg";

export class Banner extends React.Component {
    render() {
        return (
            <div className="Banner" style={{
                backgroundImage: `url(${background})`
                                }}>
                <div className="Banner-Heading">
                    <h1>Fuck you Token</h1>
                    <h2>Pay full - get half back </h2>
                </div>
            </div>
        )
    }
}

export default Banner;