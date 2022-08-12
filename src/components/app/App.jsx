import {connect} from 'react-redux';
import FirstTime from '../first-time/first-time.jsx';
import MainMode from '../main-mode/main-mode.jsx';

function App({data}) {
  if (data.user === undefined && data['name'] === undefined) {
    return (
        <FirstTime/>
    );
  }
  return (
      <MainMode/>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

export default connect(mapStateToProps)(App);
