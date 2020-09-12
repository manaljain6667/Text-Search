import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Question = props => (
  <tr>
    <td className="query">{props.questions.query}</td>
    <td className="topic">{props.questions.topic}</td>
    <td>{props.questions.tags.map((tag,i)=>(
      <li key={tag}>
      {tag}
    </li>
    ))}</td>
    <td>
      <Link to={"/edit/"+props.questions._id}>edit</Link> | <a href="#" onClick={() => { props.deleteQuestions(props.questions._id) }}>delete</a>
    </td>
  </tr>
)
export default class QuestionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      search:''
    };
    
    this.deleteQuestions = this.deleteQuestions.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }
  componentDidMount() {
    axios.get('http://localhost:5000/questions/')
     .then(response => {
       this.setState({ questions: response.data });
     })
     .catch((error) => {
        console.log(error);
     })
  }
  onChangeSearch(e){
    this.setState({
      search:e.target.value
    })
  }
  questionsList() {
    return this.state.questions.map(currentquestion => {
      return <Question questions={currentquestion} deleteQuestions={this.deleteQuestions} key={currentquestion._id}/>;
    })
  }
  deleteQuestions(id) {
    axios.delete('http://localhost:5000/questions/'+id)
      .then(res => console.log(res.data));
    this.setState({
      questions: this.state.questions.filter(el => el._id !== id)
    })
  }
  render() {

    return (
      <div>
            <input label="search" icon="search" id="searchTxt" />
      <h3>Logged Questions</h3>
      <table className="table" >
        <thead className="thead-light">
          <tr>
            <th>Questions</th>
            <th>Topic</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { this.questionsList() }
        </tbody>
      </table>
    </div>
    )
  }
}

// let search = document.getElementById('searchTxt');
// if(search != null){
//   search.addEventListener("input", function () {

//     let inputVal = search.value.toLowerCase();
//     console.log('Input event fired!', inputVal);
    
// })
// }
