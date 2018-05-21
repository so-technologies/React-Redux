import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import YouTube from 'react-youtube';
import DateFilter from "../../filters/date";

class VideoDialog extends React.Component {
    handleClose(e) {
        this.props.close(e);
    };

    render() {
        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                onClick={(e) => this.handleClose(e)}
            />,
        ];
        const {video} = this.props;

        return (
            <div>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={true}
                    onRequestClose={(e) => this.handleClose(e)}
                    autoScrollBodyContent={true}
                >
                    <div className={'view-gif'}>
                        <div style={{height: 390}}>
                            <YouTube videoId={video.id.videoId}></YouTube>
                        </div>
                        <div className="row">
                            <label>Title</label>
                            <span>{video.snippet.title}</span>
                        </div>
                        <div className="row">
                            <label>Description</label>
                            <span>{video.snippet.description}</span>
                        </div>
                        <div className="row">
                            <label>Published At</label>
                            <DateFilter date={video.snippet.publishedAt}/>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default VideoDialog;