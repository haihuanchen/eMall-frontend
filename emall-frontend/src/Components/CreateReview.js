import React, {Component, Fragment} from 'react';
import { withRouter } from "react-router-dom";

class CreateReview extends Component{
    state = {
        title: '',
        content: '',
        rating: 1,
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {title, content, rating} = this.state
        const {currentItem, currentUser} = this.props
        fetch('http://localhost:3000/reviews',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept:  'application/json'
            },
            body: JSON.stringify({
                title,
                content,
                rating,
                user_id: currentUser,
                item_id: currentItem
            })
        })
        .then(res=>res.json())
        .then(newReview=> this.props.addReview(newReview))
        this.setState({title: '', content: '', rating: 1})
        this.props.history.push('/home')
        
    }
    
    render(){
        const {title, content, rating} = this.state
        return(
            <Fragment>
                <form className="item" onSubmit={this.handleSubmit}>
                    <h1>Create a Review</h1><br/>   
                    <label>
                        Title:
                        <input name="title" type="text" value={title} onChange={this.handleChange}/>
                    </label><br/><br/>
                    <label>
                        Rating:
                        <input name="rating" type="number" value={rating} onChange={this.handleChange}/>
                    </label><br/><br/>
                    <label>
                        Content:
                        <textarea id='content-area' name="content" value={content} onChange={this.handleChange}/>
                    </label><br/><br/>
                    <input type='submit'/>
                </form>
            </Fragment>
        )
    }
}

export default withRouter(CreateReview)