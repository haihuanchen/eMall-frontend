import React, {Component, Fragment} from 'react';
import ReviewCard from '../Components/ReviewCard'

const baseUrl = 'http://localhost:3000'

export default class ReviewContainer extends Component{
    state ={
        reviews: []
    }

    componentDidMount(){
        fetch(`${baseUrl}/reviews`)
        .then(res => res.json())
        .then(data => this.setState({reviews: data}))
    }
    
    render(){
        let targetedReviews = this.state.reviews.filter(review => review['item_id'] === this.props.currentItem)
        return(
            <Fragment>
                {targetedReviews.map(review => <ReviewCard key={review.id} review={review} />)}
            </Fragment>
        )
    }
}