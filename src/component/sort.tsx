import { linkEvent, Component } from 'inferno';

export default class Sort extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    newSort(): string {
        let newSort = '';
        if(this.props.sort === 'asc') {
            newSort = 'desc';
        } else if(this.props.sort === 'desc') {
            newSort = 'asc';
        }
        return newSort;
    }

    displayString(): string {
        let displayString = '';
        if(this.props.sort === 'asc') {
            displayString = 'Lower Rank';
        } else if(this.props.sort === 'desc') {
            displayString = 'Higher Rank';
        }
        return displayString;
    }

    displayIcon(): string {
        let displayString = '';
        if(this.props.sort === 'asc') {
            displayString = 'arrow_drop_up';
        } else if(this.props.sort === 'desc') {
            displayString = 'arrow_drop_down';
        }
        return displayString;
    }

    render() {
        return (
            <div className="center-align">
                <a class="waves-effect waves-light btn" onClick={linkEvent(this.newSort.bind(this), this.props.change)}>
                    {this.displayString()}
                    <i class="material-icons right">{this.displayIcon()}</i>
                </a>
            </div>
        )
    }
}