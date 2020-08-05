import React, {Component, Fragment} from 'react';
import { withRouter } from "react-router-dom";

class ReviewCard extends Component{
    render(){
        const {title, rating, content} = this.props.review
        return(
        <Fragment>
            <h3>Title: {title}</h3>
            <p>Ratings: {rating} <span role='img' aria-label='star'>🌟</span></p>
            <p>{content}</p><br/>
        </Fragment>
        )
    }
}

export default withRouter(ReviewCard)