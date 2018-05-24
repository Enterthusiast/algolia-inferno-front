import { Component } from 'inferno';

export default class Search extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  hitNameDecoder(source): string {
    // TODO support every characters
    return source.replace(/&amp;/g, "&");
  }

  hitImageError(event) {
    event.target.src=""
  }

  hitList(): any {

    console.log(this.props.hits);

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
                      <span class="card-title">{this.hitNameDecoder(hit.name)}</span>
                      <p className="valign-wrapper">
                        <i class="material-icons">filter_list</i><span class="new badge grey" data-badge-caption="">{hit.rank}</span>
                      </p>
                      <p className="valign-wrapper">
                        <i class="material-icons">folder_open</i><span class="new badge grey" data-badge-caption="">{hit.category}</span>
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
        <ul>No hit</ul>
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