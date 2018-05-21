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

import * as imageActions from '../../../actions/searcher/image';
import ImageDialog from "../../../components/searcher/image-searcher/image-dialog";

class ImageSearcher extends Component {

    search(e) {
        const {image} = this.props;
        image.query = e.target.value;
        if (image.timeout) {
            clearTimeout(image.timeout);
        }
        image.timeout = setTimeout(() => {
            this.startSearch();
        }, 1000);
    }

    startSearch() {
        const {image} = this.props;
        image.page = 0;
        this.refs.scrollRef._container.scrollTop = 0;
        this.props.imageActions.getImages(image);
    }

    viewImage(e, index) {
        const {image} = this.props;
        this.props.imageActions.toggleViewDialog(true, image.images[index]);
    }

    closeDialog(e) {
        this.props.imageActions.toggleViewDialog(false);
    }

    scrollHandle(container) {
        const {image} = this.props;
        if (image.loading)
            return;
        if (container.scrollHeight - container.scrollTop <= 700) {
            image.page++;
            image.offset = image.page * image.limit;
            this.props.imageActions.getImages(image);
        }
    }

    render() {
        const {image} = this.props;
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
                        hintText="Type to search images...">
                    </TextField>
                    {image.loading && <CircularProgress size={20}/>}
                </div>
                <PerfectScrollbar ref={'scrollRef'} onScrollDown={container => this.scrollHandle(container)}>
                    {image.images.length === 0 &&
                    <div className="no-results">
                        <h2>No results!</h2>
                    </div>}
                    <GridList cols={4} cellHeight={200} style={styles.gridList}>
                        {image.images.map((image, index) => (
                            <GridTile key={image.imageId} style={{cursor: 'pointer'}} onClick={(e) => this.viewImage(e, index)}>
                                <img src={image.thumbnailUrl} alt=""/>
                            </GridTile>
                        ))}
                    </GridList>
                </PerfectScrollbar>
                {image.viewDialogStatus && <ImageDialog image={image.selectedImage} close={(e) => this.closeDialog(e)}/>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        image: state.image
    }
}

function mapDispatchToProps(dispatch) {
    return {
        imageActions: bindActionCreators(imageActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageSearcher);