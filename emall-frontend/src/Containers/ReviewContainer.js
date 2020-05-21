import React, {Component, Fragment} from 'react';
import ReviewCard from '../Components/ReviewCard'

export default class ReviewContainer extends Component{
    render(){
        // console.log(this.props.reviews)
        return(
        <Fragment>
            {this.props.reviews.map(review => <ReviewCard key={review.id} review={review} delReview={this.props.delReview}/>)}
        </Fragment>
        )
    }
}