import { linkEvent, Component } from 'inferno';

export default class Search extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  handleClick(instance, event) {
    const facetName = event.target.dataset.facetName;

    instance.props.toggle(facetName);
  }

  facetList(): any {

    console.log(this.props.facets);

    if(this.props.facets && this.props.facets.length > 0) {
      return this.props.facets.map((facet: any) => {
        return (
          <ul>
            {facet.name}
            {
              Object.keys(facet.data).map((dataName: any) => {
                return (
                  <li key={dataName}
                      data-facet-name={dataName}
                      style={facet.refined[dataName] ? 'background-color: grey' : ''}
                      data-selected="false"
                      onClick={linkEvent(this, this.handleClick)}>{dataName} - {facet.data[dataName]}</li>
                )
              })
            }
          </ul>
        )
      })
    } else {
      return (
        <ul>No facet</ul>
      )
    } 
  }

  render() {
    return (
      <div>
        Faceting
        {this.facetList()}
      </div>
    )
  }
}