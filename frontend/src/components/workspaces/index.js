import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Card from './Card'
import Select from 'react-select'
import _ from 'lodash'


const orderOption = [
  { value: 'name|asc', label: 'A-Z' },
  { value: 'name|desc', label: 'Z-A' }
]

class WorkspacesIndex extends React.Component{


  constructor() {
    super()
    this.state = {
      workspaces: [],
      searchTerm: '',
      sortTerm: 'name|asc',
      genres: ''
    }
    this.handleFilter = this.handleFilter.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
  }

  componentDidMount() {
    axios.get('/api/workspaces')
      .then(res => {
        this.setState({ workspaces: res.data})
      })
  }

  handleKeyUp(e){
    this.setState({ searchTerm: e.target.value})
  }

  handleChange(selected) {
    this.setState({ sortTerm: selected.value })
  }


  handleFilter(selected, field) {
    this.setState({ [field]: selected.value })
  }

  filterWorkspaces(){
    const re = new RegExp(this.state.searchTerm, 'i')
    const [field, order] = this.state.sortTerm.split('|')

    const filtered = _.filter(this.state.workspaces, workspace => {
      return re.test(workspace.name) && (this.state.opening_times_mon ? location.opening_times_mon.includes(this.state.opening_times_mon) : true)

    })
    return _.orderBy(filtered, [field], [order])
  }

  render() {
    if(!this.state.workspaces) return null
    console.log(this.state.workspaces.genres)
    return(
      <section className="section">
        <div className="container">
          <div className=" ">
            <div className="toggle-buttons">
              <Link to={'/workspaces/'}> <a className="view-buttons">List View</a> </Link>
              <Link to={'/users/'}> <a className="view-buttons">Map View</a> </Link>
            </div>
            <hr />
          </div>
          <div className="container">
            <div className="columns">
              <div className="column is-2">

                <div className="field">
                  <h1 className="title is-6 heading">Your search currently matches {this.filterWorkspaces().length} workspaces</h1>
                  <label className="label has-text-left title is-6 heading">Search your favourites</label>
                  <hr/>
                  <input className="input" type="text" placeholder="Search your favourite space"  onKeyUp={this.handleKeyUp}/>

                  <div className="field">
                    <br />
                    <label className="label has-text-left title is-6 heading">Order</label>
                    <hr />
                    <Select
                      name="order"
                      className="filter"
                      options={orderOption}
                      defaultValue={orderOption[0]}
                      onChange={this.handleChange}
                      value={orderOption.find(option => option.value === this.state.sortTerm)}
                    />
                  </div>

                  <div className="control">
                    <br />
                    <h1 className="title is-6 heading">Opening Times</h1>
                    <hr />
                    <label className="radio">
                      <input type="radio" name="answer" /> 08:00</label>
                    <label className="radio">
                      <input type="radio" name="answer" />  09:00</label>
                    <label className="radio">
                      <input type="radio" name="answer" /> 10:00</label>
                    <label className="radio">
                      <input type="radio" name="answer" />  11:00</label>
                    <label className="radio">
                      <input type="radio" name="answer" /> 12:00</label>
                  </div>
                  <br />
                  <div className="control">

                    <h1 className="title is-6 heading">Closing Times</h1>
                    <hr />
                    <label className="radio">
                      <input type="radio" name="answer" /> 08:00</label>
                    <label className="radio">
                      <input type="radio" name="answer" />  09:00</label>
                    <label className="radio">
                      <input type="radio" name="answer" /> 10:00</label>
                    <label className="radio">
                      <input type="radio" name="answer" />  11:00</label>
                    <label className="radio">
                      <input type="radio" name="answer" /> 12:00</label>
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="columns is-multiline">
                  {!this.state.workspaces && <h2 className="title is-2">Loading...</h2>}
                  {this.filterWorkspaces().map(workspaces =>

                    <div key={workspaces.id} className="column is-half-tablet is-one-quarter-desktop">
                      <Link to={`/workspaces/${workspaces.id}`}>
                        <Card {...workspaces} />
                      </Link>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>


      </section>

    )
  }

}


export default WorkspacesIndex
