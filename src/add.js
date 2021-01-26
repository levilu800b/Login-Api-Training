import React from 'react';


class Add extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
    }
  }

  submitHandler(e) {
    e.preventDefault()
    this.setState({ disabled: true })
    let result
    if (this.props.currentAd) {
      result = this.props.client.updateAd(this.props.currentAd._id, e.target.adName.value, e.target.price.value)
    } else {
      result = this.props.client.addAd(e.target.adName.value, e.target.price.value)
    }
    console.log(result)
    result.then(() => {
      this.setState({ disabled: false })
      document.getElementById("addForm").reset()
      this.props.refreshList()
    })
      .catch(() => {
        console.log("catch")
        alert("an error occured, please try again");
        this.setState({ disabled: false })
      })
  }

  render() {
    console.log(this.props.currentAd)
    return (
      <>

        {this.props.currentAd ? "Update" : "Add"}<br />

        <form onSubmit={(e) => this.submitHandler(e)} id="addForm" >
          Name: <br />
          <input type="text" defaultValue={this.props.currentAd?.name} name="adName" disabled={this.state.disabled} /><br />
          Price:<br />
          <input type="text" defaultValue={this.props.currentAd?.price} name="price" disabled={this.state.disabled} /><br /><br />
          <button type="submit" disabled={this.state.disabled}> Submit </button>
        </form>
      </>
    )
  }
}

export default Add;
