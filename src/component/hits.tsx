import { Component } from 'inferno';

export default class Hits extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  hitString(hit: any, key: string): string {
    // TODO support every characters
    if(hit._highlightResult && hit._highlightResult[key]) {
      return hit._highlightResult[key].value.replace(/&amp;/g, "&");
    } else if(hit[key]) {
      return hit[key].replace(/&amp;/g, "&");
    } else {
      return '';
    }
  }

  hitImageError(event) {
    event.target.src=""
  }

  hitList(): any {

    if(this.props.hits && this.props.hits.length > 0) {
      return this.props.hits.map((hit: any) => {
        return (
          <ul>
              <div className="col s12">
                <div className="card horizontal hoverable">
                  <div className="card-image">
                    <img id={hit.image} src={hit.image} onError={(e)=>{ this.hitImageError(e) }}/>
                  </div>
                  <div className="card-stacked">
                  
                    <div className="card-content">
                      <span className="card-title" dangerouslySetInnerHTML={{ __html: this.hitString(hit, 'name') }}></span>
                      <p className="valign-wrapper">
                        <i className="material-icons">filter_list</i><span className="new badge grey" data-badge-caption="">{hit.rank}</span>
                      </p>
                      <p className="valign-wrapper">
                        <i className="material-icons">folder_open</i><span className="new badge grey" data-badge-caption="" dangerouslySetInnerHTML={{ __html: this.hitString(hit, 'category') }}></span>
                      </p>
                    </div>
                    <div className="card-action">
                      <a href={hit.link}>Open in Apple App Store</a>
                    </div>
                  </div>
                </div>
              </div>
          </ul>
        )
      })
    } else {
      return (
        <div className="row consistent-padding">
          <div className="card horizontal hoverable">
            <div className="card-stacked">
            <div className="card-content center-align">
              <span className="card-title">No Hit</span>
            </div>
            </div>
          </div>
        </div>
      )
    } 
  }

  render() {
    return (
      <div>
        {this.hitList()}
      </div>
    )
  }
}