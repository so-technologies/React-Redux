import React from 'react';

class DateFilter extends React.Component {

    render() {
        const date = new Date(this.props.date).toDateString();
        return (
            <span>{date}</span>
        )
    }
}

export default DateFilter;