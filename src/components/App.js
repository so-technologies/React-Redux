import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Searcher from './searcher/Searcher';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GifSearcher from "../containers/searcher/gif-searcher/GifSearcher";
import VideoSearcher from "../containers/searcher/video-searcher/VideoSearcher";
import ImageSearcher from "../containers/searcher/image-searcher/ImageSearcher";

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="container">
                    <Searcher/>
                    <div>
                        <Route path="/gifs" component={GifSearcher}/>
                        <Route path="/video" component={VideoSearcher}/>
                        <Route path="/images" component={ImageSearcher}/>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
