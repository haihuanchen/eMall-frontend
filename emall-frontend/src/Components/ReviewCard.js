import React, {Component, Fragment} from 'react';
import { withRouter } from "react-router-dom";

class ReviewCard extends Component{
    render(){
        const {title, rating, content} = this.props.review
        return(
        <Fragment>

            <h5>Title: {title}</h5>
            <p>Ratings: {rating}</p>
            <p>{content}</p>
        </Fragment>
        )
    }
}

export default withRouter(ReviewCard)