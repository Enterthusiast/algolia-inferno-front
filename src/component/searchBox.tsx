import { linkEvent, Component } from 'inferno';

export default class Search extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  handleKeyUp(instance) {
    // Work around onChange not triggering on each keypress 
    // also the keyboard event only give the current character
    // so we get the global value of the input

    // @ts-ignore
    const searchValue = searchInput.value;

    instance.props.search(searchValue);
  }

  clearInput(instance) {
    // @ts-ignore
    searchInput.value = '';

    instance.handleKeyUp(instance);
  }

  render() {
    return (
      <div>
        <nav className="navbar-fixed">
          <div className="nav-wrapper">
            <form onSubmit={(e) => { e.preventDefault(); }} >
              <div className="input-field">
                <input id="searchInput" type="search" autoComplete="off" autoCorrect="off" autoCapitalize="off" placeholder="Search" onKeyUp={linkEvent(this, this.handleKeyUp)} />
                <label className="label-icon" htmlFor="searchInput"><i className="material-icons">search</i></label>
                <span className="search-match right-align">{this.props.nbHits} result(s)</span>
                <i className="material-icons" onClick={linkEvent(this, this.clearInput)}>close</i>
              </div>
            </form>
          </div>
        </nav>
      </div>
    )
  }
}