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

  render() {
    return (
      <div>
        Search
        <input type="text" id="searchInput" onKeyUp={linkEvent(this, this.handleKeyUp)} />
      </div>
    )
  }
}