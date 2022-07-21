import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import {connect} from 'react-redux';
import {useState} from 'react';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/index.js';

function ProfileDialog(props) {
  const {name, age, open, action, updateUser} = props;
  const [nameValue, setNameValue] = useState(name);
  const [ageValue, setAgeValue] = useState(age);
  const [errors, setErrors] = useState({nameError: false, ageError: false});

  function handleSubmit() {
    const err = {...errors};
    err.nameError = nameValue === '';
    err.ageError = ageValue < 5 || ageValue > 10;
    if (err.nameError || err.ageError) {
      setErrors({...err});
      return;
    }
    updateUser({name: nameValue, age: ageValue});
    action();
  }

  return (<Dialog open={open}>
    <DialogTitle>
      Профиль
    </DialogTitle>
    <DialogContent>
      <Stack spacing={2} marginTop={1}>
        <TextField error={errors.nameError}
                   helperText={errors.nameError && 'Имя не может быть пустым'}
                   value={nameValue}
                   onChange={(event) => setNameValue(event.target.value)}
                   label="Имя профиля"/>
        <TextField error={errors.ageError}
                   helperText={errors.ageError &&
                       'Доступный возраст от 5 до 10 лет'}
                   value={ageValue} type="number"
                   onChange={(event) => setAgeValue(
                       parseInt(event.target.value))} label="Возраст"/>
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button onClick={action}>Отмена</Button>
      <Button onClick={handleSubmit} variant="contained">Подтвердить</Button>
    </DialogActions>
  </Dialog>);
}

const mapStateToProps = (state) => {
  return {
    name: state.name,
    age: state.age,
  };
};

const mapDispatchToProps = (dispatch) => {
  const {updateUser} = bindActionCreators(actions, dispatch);
  return {
    updateUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDialog);