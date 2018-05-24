import { linkEvent, Component } from 'inferno';

export default class Search extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  handleClick(instance, event) {
    const facetName = event.target.dataset.facetName;

    instance.props.toggle(facetName);
  }

  dataList(facet): any {
    return Object.keys(facet.data).map((dataName: any) => {
      return (
        <a className={facet.refined[dataName] ? 'collection-item active' : 'collection-item'}
            key={dataName}
            data-facet-name={dataName}
            data-selected="false"
            onClick={linkEvent(this, this.handleClick)}>
              <span class="new badge teal" data-badge-caption="">{facet.data[dataName]}</span>
              {dataName}
        </a>
      )
    })
  }

  facetList(): any {

    console.log(this.props.facets);

    if(this.props.facets && this.props.facets.length > 0) {
      return this.props.facets.map((facet: any) => {
        return (
          <div className="collection with-header">
            <div className="collection-header"><h6>{facet.name[0].toUpperCase() + facet.name.slice(1)}</h6></div>
            {this.dataList(facet)}
          </div>
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
        {this.facetList()}
      </div>
    )
  }
}