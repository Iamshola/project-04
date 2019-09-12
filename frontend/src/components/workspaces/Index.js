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

const genreOptions = [
  { label: 'All', value: '' },
  { label: 'Animal Friendly', value: 1 },
  { label: 'Quiet Section', value: 2 },
  { label: 'Meeting Tables', value: 3  },
  { label: 'Wifi', value: 4 },
  { label: 'Food and Drinks Permitted', value: 5 },
  { label: 'Free',  value: 6 },
  { label: 'Wheelchair accessible', value: 7 }
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
    axios.get('/api/workspaces/')
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
      return re.test(workspace.name) && (this.state.genres ? workspace.genres.map(genre => genre.id).includes(this.state.genres) : true)
    })

    return _.orderBy(filtered, [field], [order])
  }

  render() {
    console.log(this.state.genres)
    if(!this.state.workspaces) return null

    return(
      <section className="section">
        <div className="container">
          <hr />
        </div>
        <div className="container">
          <div className="columns">
            <div className="column is-2">

              <div className="field">
                <h1 className="title is-6 heading">Your search currently matches {this.filterWorkspaces().length} workspaces</h1>
                <hr />
                <label className="label has-text-left title is-6 heading">Search your favourites</label>

                <input className="input" type="text" placeholder="Favourite space?"  onKeyUp={this.handleKeyUp}/>

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
                <hr />
                <div className="field">
                  <label className="label has-text-left title is-6 heading">Genre Types</label>
                  <hr />
                  <Select
                    name="genres"
                    className="filter"
                    options={genreOptions}
                    defaultValue={genreOptions[0]}
                    onChange={selected => this.handleFilter(selected, 'genres')}
                    value={genreOptions.find(option => option.name === this.state.genres)}
                  />
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



      </section>

    )
  }

}


export default WorkspacesIndex
