import React from 'react';
import Add from "./Add"


class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ads: [],
      currentAd: undefined
    }
  }

  refreshList(){
    this.props.client.getAds()
    .then((response) => this.setState({ ads: response.data }))
  }

  removeAdvert(id){
    this.props.client.removeAd(id)
    .then(() =>this.refreshList())
  }

  updateAdvert(ad){
    this.setState({currentAd: ad})
  }

  componentDidMount() {
    this.refreshList()
  }

  buildrows() {
    return this.state.ads.map((current) => {
      return (<tr key={current._id}>
        <td>{current.name}</td>
        <td>£{current.price}</td>
        <td>
          <button onClick={()=> this.removeAdvert(current._id)}> remove</button>
          <button onClick={()=> this.updateAdvert(current)}> update</button>
        </td>
      </tr>)
    })
  }

  render() {
    return (
      <>
        Dashboard<br />
        <table>
          <thead>
            <tr>
              <th>
                Advert Name
              </th>
              <th>
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {this.buildrows()}
          </tbody>
        </table>
        <br /><br />
        <Add client={this.props.client} refreshList={() => {
          this.refreshList()
          this.setState({
            currentAd: undefined})
          }} 
          currentAd={this.state.currentAd}/>
      </>
    )

  }
}

export default Dashboard;
