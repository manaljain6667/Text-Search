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
       <a href="#" onClick={() => { props.deleteQuestions(props.questions._id) }}>delete</a>
    </td>
  </tr>
)
export default class QuestionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      filtered:[]
    };
    
    this.deleteQuestions = this.deleteQuestions.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    axios.get('http://localhost:5000/questions/')
     .then(response => {
       this.setState({ questions: response.data,filtered:response.data});
     })
     .catch((error) => {
        console.log(error);
     })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.questions
    });
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

  handleChange(e) {
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.state.filtered;
      newList = currentList.filter(question => {
        const filter = e.target.value.toLowerCase();
        const query = question.query.toLowerCase();
        var flag=false
        const tags=question.tags.filter(tags=>{
          const tg=tags.toLowerCase();
          if(tg.includes(filter)){
            flag=true
          }
          return tg.includes(filter)
        })
        return (query.includes(filter))|| (flag);
      });
    } else {
      newList = this.state.filtered;
    }
    this.setState({
      questions:newList
    });
    }

  render() {

    return (
      <div>
          <span>Search By Query or Tags</span>  <input label="search" icon="search" onChange={this.handleChange} />
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


