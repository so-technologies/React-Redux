import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import {GridList, GridTile} from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import * as gifActions from '../../../actions/searcher/gif';
import GifDialog from "../../../components/searcher/gif-searcher/gif-dialog";

class GifSearcher extends Component {

    search(e) {
        const {gif} = this.props;
        gif.query = e.target.value;
        if (gif.timeout) {
            clearTimeout(gif.timeout);
        }
        gif.timeout = setTimeout(() => {
            this.startSearch();
        }, 1000);
    }

    startSearch() {
        const {gif} = this.props;
        gif.page = 0;
        this.refs.scrollRef._container.scrollTop = 0;
        this.props.gifActions.getGifs(gif);
    }

    viewGif(e, index) {
        const {gif} = this.props;
        this.props.gifActions.toggleViewDialog(true, gif.gifs[index]);
    }

    closeDialog(e) {
        this.props.gifActions.toggleViewDialog(false);
    }

    scrollHandle(container) {
        const {gif} = this.props;
        if (gif.loading)
            return;
        if (container.scrollHeight - container.scrollTop <= 700) {
            gif.page++;
            gif.offset = gif.page * gif.limit;
            this.props.gifActions.getGifs(gif);
        }
    }

    render() {
        const {gif} = this.props;
        const styles = {
            gridList: {
                width: 1500,
                margin: 'auto'
            }
        };
        return (
            <div className="searcher-container">
                <div>
                    <Link to={'/'}>
                        <FontIcon className="material-icons">arrow_back_ios</FontIcon>
                    </Link>
                    <TextField
                        onChange={(e) => this.search(e)}
                        hintText="Type to search gifs...">
                    </TextField>
                    {gif.loading && <CircularProgress size={20}/>}
                </div>
                <PerfectScrollbar ref={'scrollRef'} onScrollDown={container => this.scrollHandle(container)}>
                    {gif.gifs.length === 0 &&
                    <div className="no-results">
                        <h2>No results!</h2>
                    </div>}
                    <GridList cols={4} cellHeight={200} style={styles.gridList}>
                        {gif.gifs.map((gif, index) => (
                            <GridTile key={gif.id} style={{cursor: 'pointer'}} onClick={(e) => this.viewGif(e, index)}>
                                <img src={gif.images.fixed_height.url} alt=""/>
                            </GridTile>
                        ))}
                    </GridList>
                </PerfectScrollbar>
                {gif.viewDialogStatus && <GifDialog gif={gif.selectedGif} close={(e) => this.closeDialog(e)}/>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        gif: state.gif
    }
}

function mapDispatchToProps(dispatch) {
    return {
        gifActions: bindActionCreators(gifActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GifSearcher);