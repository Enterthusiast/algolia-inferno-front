import { linkEvent, Component } from 'inferno';

export default class Faceting extends Component<any, any> {
  constructor(props) {
    super(props);

    // register on resize event
    // so we can reset show/hide facet
    window.onresize = (e) => {
      if(e.target['visualViewport'].width > 600) {
        this.resetVisibility();
      }
    }
  }

  handleClick(instance, event) {
    const facetName = event.target.dataset.facetName;

    instance.props.toggle(facetName);
  }

  dataList(facet): any {
    return Object.keys(facet.data).map((dataName: any) => {
      return (
        <a className={facet.refined[dataName] ? 'collection-item facet-cursor active' : 'collection-item facet-cursor'}
            key={dataName}
            data-facet-name={dataName}
            data-selected="false"
            onClick={linkEvent(this, this.handleClick)}>
              <span className="new badge teal" data-badge-caption="">{facet.data[dataName]}</span>
              {dataName}
        </a>
      )
    })
  }

  facetList(): any {

    if(this.props.facets && this.props.facets.length > 0) {
      return this.props.facets.map((facet: any) => {
        return (
          <div id="faceting" className="collection with-header responsive-faceting faceting-small-hide">
            <div className="collection-header"><h6>{facet.name[0].toUpperCase() + facet.name.slice(1)}</h6></div>
            {this.dataList(facet)}
          </div>
        )
      })
    } else {
      return (
        <div className="row consistent-padding">
          <div className="card horizontal hoverable">
            <div className="card-stacked">
            <div className="card-content center-align">
              <span className="card-title">No Facet</span>
            </div>
            </div>
          </div>
        </div>
      )
    } 
  }

  resetVisibility() {
    const facetingElem = document.getElementById('faceting');
    facetingElem.classList.remove('faceting-small-show');
    facetingElem.classList.add('faceting-small-hide')
  }

  toggleVisibility(instance) {
    const facetingElem = document.getElementById('faceting');
    if(facetingElem.classList.contains('faceting-small-hide')) {
      facetingElem.classList.remove('faceting-small-hide');
      facetingElem.classList.add('faceting-small-show')
    } else {
      facetingElem.classList.remove('faceting-small-show');
      facetingElem.classList.add('faceting-small-hide')
    }
  }

  render() {
    return (
      <div>
        <div className="responsive-faceting-button center-align">
          <a className="waves-effect waves-light btn" onClick={linkEvent(this, this.toggleVisibility)}>
            Toggle Filter(s)
          </a>
        </div>
        {this.facetList()}
      </div>
    )
  }
}