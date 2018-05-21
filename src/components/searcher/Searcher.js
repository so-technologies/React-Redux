import React from 'react';
import { Link } from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import './Searcher.css';

class Searcher extends React.Component {

    render() {
        return (
            <div>
                <h1>
                    Welcome to Searcher!
                </h1>
                < div className="navigation">
                    <RaisedButton primary={true} className='links'>
                        <Link className={'navigation'} to="/gifs">Gifs</Link>
                    </RaisedButton>
                    <RaisedButton primary={true} className='links'>
                        <Link className={'navigation'} to="/video">Video</Link>
                    </RaisedButton>
                    <RaisedButton primary={true} className='links'>
                        <Link className={'navigation'} to="/images">Images</Link>
                    </RaisedButton>
                </div>
            </div>
        );
    }
}

export default Searcher;