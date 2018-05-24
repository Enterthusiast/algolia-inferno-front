// inferno module
import { Component, render } from 'inferno';

// css
import '../src/main.css';

// component
import Faceting from './component/faceting';
import Hits from './component/hits';
import SearchBox from './component/searchBox';

// service
import algoliaService from './service/algoliaService';

interface appState {
	search: string;
	hits: any[];
	facets: any[];
}

class App extends Component<any, appState> {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			hits: [],
			facets: []
		};
	}

	componentDidMount() {
		// Initialize with an empty search
		// this way the user has some data to start from
		this.search();
	}

	// This is an easy way to get the isRefined param
	// This param is not available in facet.data by default
	facetsData(algoliaSearch) {
		return algoliaSearch['disjunctiveFacets'].map((facet) => {
			const refinedData = algoliaSearch.getFacetValues(facet.name).reduce((accumulator, data) => {
				accumulator[data.name] = data.isRefined;
				return accumulator;
			}, {});

			return {
				...facet,
				refined: refinedData
			}
		})
	}

	update(algoliaSearch) {
		console.log('facetsData', this.facetsData(algoliaSearch));
		this.setState((prevState, props) => {
			return {					
				...prevState,
				hits: algoliaSearch['hits'],
				facets: this.facetsData(algoliaSearch)
			};
		});
	}

	search(searchValue?: string) {
		algoliaService.search(searchValue).then((algoliaSearch) => {
			console.log(algoliaSearch);

			this.update(algoliaSearch);
		});
	}

	facetToggle(facetName: string) {
		return algoliaService.facetToggle('category', facetName).then((algoliaSearch) => {
			console.log(algoliaSearch);

			this.update(algoliaSearch);
		})
	}
	
	render() {
		return (
			<div className="container">
				<div className="row">
					<h1>AppStore Search</h1>
					<SearchBox search={this.search.bind(this)} />
				</div>
				<div className="row">
					<div class="col s12 m3 l4">
						<Faceting facets={this.state.facets} toggle={this.facetToggle.bind(this)}/>
					</div>
					<div class="col s12 m9 l8">
						<Hits hits={this.state.hits} />
					</div>
				</div>
			</div>
		)
	}
}

render(<App />, document.getElementById('app'));
