import * as React from 'react';
import './App.css';
class App extends React.Component {
    render() {
        let env = process.env.NODE_ENV;
        console.log('env:%s REACT_APP_APIHOST:%s', env, process.env.REACT_APP_APIHOST);
        return (React.createElement("div", null, "Test"));
    }
}
export default App;
//# sourceMappingURL=App.js.map