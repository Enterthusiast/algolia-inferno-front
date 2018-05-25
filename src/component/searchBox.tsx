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
        <nav class="navbar-fixed">
          <div class="nav-wrapper">
            <form onSubmit={(e) => { e.preventDefault(); }} >
              <div class="input-field">
                <input id="searchInput" type="search" placeholder="What app are you looking for?" onKeyUp={linkEvent(this, this.handleKeyUp)} />
                <label class="label-icon" htmlFor="searchInput"><i class="material-icons">search</i></label>
                <i class="material-icons" onClick={linkEvent(this, this.clearInput)}>close</i>
              </div>
            </form>
          </div>
        </nav>
      </div>
    )
  }
}