import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DateFilter from "../../filters/date";

class ImageDialog extends React.Component {
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
        const {image} = this.props;

        return (
            <div>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={true}
                    onRequestClose={(e) => this.handleClose(e)}
                    contentStyle={{width: 'auto'}}
                    autoScrollBodyContent={true}
                >
                    <div className={'view-gif'}>
                        <img src={image.thumbnailUrl} alt=""/>
                        <div className="row">
                            <label>Source URL</label>
                            <a href={image.contentUrl} target="_blank">{image.contentUrl}</a>
                        </div>
                        <div className="row">
                            <label>Name</label>
                            <span>{image.name}</span>
                        </div>
                        <div className="row">
                            <label>Import Date</label>
                            <DateFilter date={image.datePublished}/>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default ImageDialog;