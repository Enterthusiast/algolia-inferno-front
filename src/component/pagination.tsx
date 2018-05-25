import { linkEvent, Component } from 'inferno';

export default class Pagination extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  pageList() {
    return this.props.list.map((page) => {
        return(
            <li class={this.props.current === page ? "active" : "waves-effect"}><a onClick={linkEvent(page, this.props.change)}>{page}</a></li>
        );
    });
  }

  render() {
    return (
      <div>
        <ul class="pagination center-align">
            <li class="waves-effect"><a onClick={linkEvent(0, this.props.change)}>first</a></li>
            <li class={this.props.previous !== null ? "waves-effect" : "disabled"}><a onClick={this.props.previous !== null ? linkEvent(this.props.previous, this.props.change): null}><i class="material-icons">chevron_left</i></a></li>

            {this.pageList()}

            <li class={this.props.next !== null ? "waves-effect" : "disabled"}><a onClick={this.props.next !== null ? linkEvent(this.props.next, this.props.change): null}><i class="material-icons">chevron_right</i></a></li>
            <li class="waves-effect"><a onClick={linkEvent(this.props.total - 1, this.props.change)}>last</a></li>
        </ul>
      </div>
    )
  }
}