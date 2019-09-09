import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Card from './Card'
import Select from 'react-select'
import _ from 'lodash'



const genreOptions = [
  { value: '', label: 'All' },
  { value: 'Animal Friendly', label: 'Animal Friendly' },
  { value: 'Quiet Section', label: 'Quiet Section' },
  { value: 'Meeting Tables', label: 'Meeting Tables' },
  { value: 'Wifi', label: 'Wifi' },
  { value: 'Music', label: 'Music' },
  { value: 'Food and Drinks Permitted', label: 'Food and Drinks Permitted' },
  { value: 'Free', label: 'Free' },
  { value: 'Wheelchair accessible', label: 'Wheelchair accessible' }
]

class WorkspacesIndex extends React.Component{


  constructor() {
    super()
    this.state = {
      workspaces: [],
      searchTerm: '',
      sortTerm: 'name|asc'
    }

    this.handleFilter = this.handleFilter.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleChange = this.handleChange.bind(this)

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
  handleChange(e){
    this.setState({ sortTerm: e.target.value})
  }


  handleFilter(selected, field) {
    this.setState({ [field]: selected.value })
  }

  filterWorkspaces(){
    const re = new RegExp(this.state.searchTerm, 'i')
    const [field, order] = this.state.sortTerm.split('|')

    const filterWorkspaces = _.filter(this.state.workspaces, workspace => {
      return re.test(workspace.name) && (this.state.genre ? workspace.genre.includes(this.state.genre) : true)
    })
    const sortedWorkspaces = _.orderBy(filterWorkspaces, [field], [order])

    return sortedWorkspaces
  }



  render() {
    if(!this.state.workspaces) return null
    console.log(this.filterWorkspaces)
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
          <div className="columns">
            <div className="column">
              <div className="navbar-item">
                <div className="field">
                  <label className="label has-text-left">Activity Type</label>
                  <Select
                    name="genre"
                    className="filter"
                    options={genreOptions}
                    defaultValue={genreOptions[0]}
                    onChange={selected => this.handleFilter(selected, 'genre')}
                    value={genreOptions.find(option => option.value === this.state.genre)}
                  />
                </div>
                <br />
                <br />
                <div className="column">
                  <div className="field">
                    <label className="label has-text-left">Search your favourite space</label>
                    <input className="input" type="text" placeholder="Search your favourite space"  onKeyUp={this.handleKeyUp}/>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label className="label has-text-left"> Alphabetical Order:  </label>
                    <div className="column">
                      <select onChange={this.handleChange}>
                        <option value="name|asc">A-Z </option>
                        <option value="name|desc">Z-A </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


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
      </section>

    )
  }

}


export default WorkspacesIndex
