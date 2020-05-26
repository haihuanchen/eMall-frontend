import React from 'react'
import { withRouter } from "react-router-dom";
import '../App.css'

const itemUrl = 'http://localhost:3000/items'

class CreateItem extends React.Component{
    state = {
        title: this.props.currentItem.title ? this.props.currentItem.title : '',
        description: this.props.currentItem.description ? this.props.currentItem.description : '',
        price: this.props.currentItem.price ? this.props.currentItem.price : 0,
        quantity: this.props.currentItem.quantity ? this.props.currentItem.quantity : 1,
        category: this.props.currentItem.category ? this.props.currentItem.category : '',
        image: this.props.currentItem.image ? this.props.currentItem.image : '',
        condition: this.props.currentItem.condition ? this.props.currentItem.condition : ''
    }

    handleChange = (e)=>{
        // console.log([e.target.name], e.target.value)
        this.setState({ [e.target.name]: e.target.value})
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        // console.log(this.state)
        let {title, description, price, quantity, category, image, condition} = this.state;
        if(this.props.currentItem.id){
            // console.log("inside edit form", this.props.currentItem.title)
            fetch(`${itemUrl}/${this.props.currentItem.id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept:  'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    price,
                    quantity,
                    category,
                    image,
                    condition
                })
            })
            .then(res=>res.json())
            .then(changedItem=> this.props.editItem(changedItem))
            this.setState({title: '', description: '', price: 0, quantity: 1,category: '', image: '', condition: ''})
            this.props.history.push('/home')
        }
        else{
            fetch(itemUrl,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept:  'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    price,
                    quantity,
                    category,
                    image,
                    condition,
                    user_id: this.props.sellerId
                })
            })
            .then(res=>res.json())
            .then(newItem=> this.props.addItem(newItem))
            this.setState({title: '', description: '', price: 0, quantity: 1,category: '', image: '', condition: ''})
            this.props.history.push('/home')
        }      
    }

    render(){
        // console.log(this.props.sellerId)
        const {title, description, price, quantity, category, image, condition} = this.state
        return(
            <form className="form" onSubmit={this.handleSubmit}>
            <h1>{this.props.currentItem.title ? "Edit this Item" : "Add a new Item"}</h1><br/>
            <label>
                Title: <input name="title" type="text" value={title} onChange={this.handleChange}/>
            </label><br/><br/>
            <label>
                Description: <input name="description" type="text-area" value={description} onChange={this.handleChange}/>
            </label><br/><br/>
            <label>
                Price: <input name="price" type="float" value={price} onChange={this.handleChange}/>
            </label><br/><br/>
            <label>
                Quantity: <input name="quantity" type="number" value={quantity} onChange={this.handleChange}/>
            </label><br/><br/>
            <label>
                Category: <input name="category" type="text" value={category} onChange={this.handleChange}/>
            </label><br/><br/>
            <label>
                Item Image: <input name="image" type="text" value={image} onChange={this.handleChange}/>
            </label><br/><br/>
            <label>
                Item Condition: <input name="condition" type="text" value={condition} onChange={this.handleChange}/>
            </label><br/><br/>
            <input type="submit" value={this.props.currentItem.title ? "Edit this Item" : "Add Item"} />
        </form>
        )
    }
}
export default withRouter(CreateItem)