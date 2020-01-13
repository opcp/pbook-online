import React from 'react'
class MyComponent extends React.Component {
  onAddTypeClicked = el => {
    console.log(el.value)
  }

  render() {
    return (
      <div>
        <input name="asset_types" ref={el => (this.assetTypesAdd = el)} />
        <button
          type="button"
          onClick={e => this.onAddTypeClicked(this.assetTypesAdd)}
        >
          Click me
        </button>
      </div>
    )
  }
}

// Render it
export default MyComponent
