import React from 'react'

const WorkspaceSimilar = ({ workspaces, linkToWorkspace }) => {
  workspaces = workspaces.slice(0, 4)
  return (
    <div className="box">
      <h3 className="subtitle is-5 has-text-weight-semibold">Similar Workspace</h3>
      <div className="columns is-multiline">
        {workspaces.map(workspace =>
          <div
            key={workspace._id}
            className="column is-offset-0 is-half has-text-weight-semibold"
            onClick={() => linkToWorkspace(workspace._id)}
          >
            <a>
              <figure className="image">
                <img src={workspace.image} />
              </figure>
              <p className="is-6 is-transparent">{workspace.name}</p>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default WorkspaceSimilar
