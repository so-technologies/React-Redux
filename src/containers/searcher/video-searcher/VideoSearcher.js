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

import * as videoActions from '../../../actions/searcher/video';
import VideoDialog from "../../../components/searcher/video-searcher/video-dialog";

class VideoSearcher extends Component {

    search(e) {
        const {video} = this.props;
        video.query = e.target.value;
        if (video.timeout) {
            clearTimeout(video.timeout);
        }
        video.timeout = setTimeout(() => {
            this.startSearch();
        }, 1000);
    }

    startSearch() {
        const {video} = this.props;
        video.offset = 0;
        this.refs.scrollRef._container.scrollTop = 0;
        this.props.videoActions.getVideo(video);
    }

    viewVideo(e, index) {
        const {video} = this.props;
        this.props.videoActions.toggleViewDialog(true, video.video[index]);
    }

    closeDialog(e) {
        this.props.videoActions.toggleViewDialog(false);
    }

    scrollHandle(container) {
        const {video} = this.props;
        if (video.loading)
            return;
        if (container.scrollHeight - container.scrollTop <= 700) {
            this.props.videoActions.getVideo(video);
        }
    }

    render() {
        const {video} = this.props;
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
                        hintText="Type to search video...">
                    </TextField>
                    {video.loading && <CircularProgress size={20}/>}
                </div>
                <PerfectScrollbar ref={'scrollRef'} onScrollDown={container => this.scrollHandle(container)}>
                    {video.video.length === 0 &&
                    <div className="no-results">
                        <h2>No results!</h2>
                    </div>}
                    <GridList cols={4} cellHeight={200} style={styles.gridList}>
                        {video.video.map((movie, index) => (
                            <GridTile key={movie.id.videoId} style={{cursor: 'pointer'}} onClick={(e) => this.viewVideo(e, index)}>
                                <img src={movie.snippet.thumbnails.medium.url} alt=""/>
                            </GridTile>
                        ))}
                    </GridList>
                </PerfectScrollbar>
                {video.viewDialogStatus && <VideoDialog video={video.selectedVideo} close={(e) => this.closeDialog(e)}/>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        video: state.video
    }
}

function mapDispatchToProps(dispatch) {
    return {
        videoActions: bindActionCreators(videoActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoSearcher);