import React from 'react';

// import Cards from './components/Cards/Cards';
// import Chart from './components/Chart/Chart';
// import CountryPicker from './components/CountryPicker/CountryPicker';

// Alternate import method (vs above) paired with components index.js export, which facilitates a more simple App.js
import { Cards, Chart, CountryPicker } from './components';

import styles from './App.module.css';
import { fetchData } from './api';


// Components are class based, not functional components with hooks, which is a bit simpler to use with App.js in this case
class App extends React.Component {

    // no need for constructer - it creates unneccessary code, as it will run automatically in the backend
    state = {
        data: {},
        country: '',
    }

    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData });
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);

        this.setState({ data: fetchedData, country: country });

    }

    render() {
        const {data, country} = this.state;

        return (
           
            <div className={styles.container}>
                <h1>COVID-19 Tracker</h1>
               <Cards data={data}/>
               <CountryPicker handleCountryChange={this.handleCountryChange} />
               <Chart data={data} country={country} />
            </div>
        );
    }
}

export default App;