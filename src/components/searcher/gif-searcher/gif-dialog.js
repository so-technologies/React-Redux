import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class GifDialog extends React.Component {
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
        const {gif} = this.props;

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
                        <img src={gif.images.fixed_height.url} alt=""/>
                        <div className={'row'}>
                            <label>Source URL</label>
                            <a href={gif.url} target="_blank">{gif.url}</a>
                        </div>
                        <div className={'row'}>
                            <label>Content Rating</label>
                            <span>{gif.rating}</span>
                        </div>
                        <div className={'row'}>
                            <label>Import Date</label>
                            <span>{gif.import_datetime}</span>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default GifDialog;