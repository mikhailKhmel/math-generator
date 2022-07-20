import {Button, Stack, TextField, Typography} from '@mui/material';
import {useState} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index.js';
import {bindActionCreators} from 'redux';

function FirstTime({addUser}) {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [error, setError] = useState({name: false, age: false});

  function checkErrors() {
    const e = {...error};
    e.name = name === '';
    e.age = age < 5 || age > 10;
    setError(e);
    return !e.name || !e.age;
  }

  function handleAddNewUser() {
    if (!checkErrors()) {
      return;
    }
    addUser({name, age});
  }

  return (
      <Stack spacing={2}>
        <Typography variant="h4">Привет! Ты первый раз здесь?</Typography>
        <TextField helperText={error.name && 'Имя не может быть пустым'}
                   error={error.name}
                   onChange={(event) => setName(event.target.value)}
                   label="Как тебя зовут?" variant="filled" size="small"/>
        <TextField helperText={error.age && 'Доступный возраст от 5 до 10 лет'}
                   error={error.age}
                   onChange={(event) => setAge(parseInt(event.target.value))}
                   type="number" label="Сколько тебе лет?" variant="filled"
                   size="small"/>
        <Button onClick={handleAddNewUser}
                variant="contained">Продолжить</Button>
      </Stack>

  );
}

const mapDispatchToProps = (dispatch) => {
  const {addUser} = bindActionCreators(actions, dispatch);
  return {addUser};
};

export default connect(null, mapDispatchToProps)(FirstTime);