import React, { Component } from 'react';
import axios from 'axios';

export default class CreateQuestion extends Component {
    constructor(props){
        super(props);

        this.onChangeQuestion = this.onChangeQuestion.bind(this);
        this.onChangeTopic = this.onChangeTopic.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            query:'',
            topic:'',
            tags:[],
            errors: {}
        }
    }
    removeTag = (i) => {
      const newTags = [ ...this.state.tags ];
      newTags.splice(i, 1);
      this.setState({ tags: newTags });
    }
    inputKeyDown = (e) => {
      const val = e.target.value;
      if (e.keyCode ===32  && val) {
        if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
          return;
        }
        this.setState({ tags: [...this.state.tags, val]});
        this.tagInput.value = null;
      } else if (e.key === 'Backspace' && !val) {
        this.removeTag(this.state.tags.length - 1);
      }
    }
    onChangeQuestion(e) {
        this.setState({
          query: e.target.value
        });
      }
    onChangeTopic(e) {
        this.setState({
          topic: e.target.value
        });
      }
    handleValidation(){
      let query=this.state.query;
      let formIsValid = true;
      let errors = {};
      if(query.length < 10){
        formIsValid=false
        errors["query"]="length should be greater than or equal to 10"
      }
      this.setState({errors: errors});
    }
    onSubmit(e) {
        e.preventDefault();
        let errors = {};
        const questions = {
          query: this.state.query,
          topic: this.state.topic,
          tags: this.state.tags,
        };
        if(this.handleValidation()){
          axios.post('http://localhost:5000/questions/add', questions).then(res => console.log(res.data));
      //console.log(questions);
      window.location = '/';
        }
        else{
          
        }
      }
  render() {
    return (
      <div className="container">
        <h3>Create New Question</h3>
        
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Question: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.query}
                onChange={this.onChangeQuestion}
                />
            <span style={{color: "red"}}>{this.state.errors["query"]}</span>
          </div>
          <div className="form-group">
            <label>Add Tags:</label>
            <ul className="input-tag__tags">
                { this.state.tags.map((tag, i) => (
                <li key={tag}>
                  {tag}
                  <button type="button" onClick={() => { this.removeTag(i); }}>Remove</button>
                </li>
              ))}
              <li className="input-tag__tags__input">
                <input type="text" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} placeholder="press Spacebar" />
              </li>
            </ul>
          </div>
          <div className="form-group"> 
            <label>Topic: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.topic}
                onChange={this.onChangeTopic}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Question Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}