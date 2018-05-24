// inferno module
import { Component, render } from 'inferno';

// css
import '../src/main.css';

// component
import Faceting from './component/faceting';
import Hits from './component/hits';
import Pagination from './component/Pagination';
import SearchBox from './component/searchBox';

// service
import algoliaService from './service/algoliaService';

interface appState {
	search: string;
	hits: any[];
	facets: any[];
	pagination: {
		previous: number,
		list: number[],
		next: number,
		current: number,
		total: number
	}
}

class App extends Component<any, appState> {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			hits: [],
			facets: [],
			pagination: {
				previous: 1,
				list: [],
				next: 1,
				current: 1,
				total: 1
			}
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
		this.setState((prevState, props) => {
			return {					
				...prevState,
				hits: algoliaSearch['hits'],
				facets: this.facetsData(algoliaSearch)
			};
		});
	}

	paginationStateUpdate(algoliaSearch) {
		this.setState((prevState, props) => {

			const pagePrevious = (algoliaSearch.page - 1) >= 0 ? algoliaSearch.page - 1 : null;
			const pageNext = (algoliaSearch.page + 1) < algoliaSearch.nbPages ? algoliaSearch.page + 1 : null;
			
			let pageList = [];
			if(algoliaSearch.page - 2 < 0) {
				for(let i = 0; i < Math.min(5, algoliaSearch.nbPages); i++) {
					pageList.push(i);
				}
			} else if (algoliaSearch.page + 2 >= algoliaSearch.nbPages) {
				for(let i = Math.max(0, algoliaSearch.nbPages - 5); i < algoliaSearch.nbPages; i++) {
					pageList.push(i);
				}
			} else {
				for(let i = algoliaSearch.page - 2; i <= algoliaSearch.page + 2; i++) {
					pageList.push(i);
				}
			}

			return {
				...prevState,
				pagination: {
					previous: pagePrevious,
					list: pageList,
					next: pageNext,
					current: algoliaSearch.page,
					total: algoliaSearch.nbPages
				},
			}
		});
	}

	search(searchValue?: string) {
		this.setState((prevState, props) => {
			return {
				...prevState,
				search: searchValue
			}
		});

		algoliaService.search(searchValue).then((algoliaSearch: any) => {
			this.paginationStateUpdate(algoliaSearch);
			this.update(algoliaSearch);
		});
	}

	pageChange(pageNumber: number) {
		algoliaService.search(this.state.search, pageNumber).then((algoliaSearch: any) => {
			this.paginationStateUpdate(algoliaSearch);
			this.update(algoliaSearch);
		});
	}

	facetToggle(facetName: string) {
		return algoliaService.facetToggle('category', facetName).then((algoliaSearch) => {
			this.paginationStateUpdate(algoliaSearch);
			this.update(algoliaSearch);
		})
	}
	
	render() {
		return (
			<div className="container">
				<div className="row">
					<h3>AppStore Search</h3>
					<SearchBox search={this.search.bind(this)} />
				</div>
				<div className="row">
					<div class="col s12 m3 l4">
						<Faceting facets={this.state.facets} toggle={this.facetToggle.bind(this)}/>
					</div>
					<div class="col s12 m9 l8">
						<Pagination {...this.state.pagination} change={this.pageChange.bind(this)}/>
						<Hits hits={this.state.hits} />
					</div>
				</div>
			</div>
		)
	}
}

render(<App />, document.getElementById('app'));
