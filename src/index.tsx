// inferno module
import {render} from 'inferno';

// css
import '../src/main.css';

// component
import Faceting from './component/faceting';
import HitList from './component/hitList';
import Search from './component/search';


function App() {
    return (
		<div>
			<h1>Algolia technical test - Inferno - Frontend</h1>
			<Search />
			<HitList />
			<Faceting />
		</div>
    )
}

render(<App />, document.getElementById('app'));
