import { Component } from 'inferno';

export default class Search extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  hitList(): any {

    console.log(this.props.hits);

    if(this.props.hits && this.props.hits.length > 0) {
      return this.props.hits.map((hit: any) => {
        return (
          <ul>
            {hit.name}
            <br />
            {hit.category}
            <br />
            {hit.rank}
            <br />
            {hit.image}
            <br />
            {hit.link}
          </ul>
        )
      })
    } else {
      return (
        <ul>No hit</ul>
      )
    } 
  }

  render() {
    return (
      <div>
        Hits
        {this.hitList()}
      </div>
    )
  }
}