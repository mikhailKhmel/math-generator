import {
  Button,
  ButtonGroup,
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
  const {name, age, sex, open, action, updateUser} = props;
  const [nameValue, setNameValue] = useState(name);
  const [ageValue, setAgeValue] = useState(age);
  const [sexValue, setSexValue] = useState(sex);
  const [errors, setErrors] = useState({nameError: false, ageError: false});

  function handleSubmit() {
    const err = {...errors};
    err.nameError = nameValue === '';
    err.ageError = ageValue < 5 || ageValue > 10;
    if (err.nameError || err.ageError) {
      setErrors({...err});
      return;
    }
    updateUser({name: nameValue, age: ageValue, sex: sexValue});
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
                   label="Как тебя зовут?"/>
        <TextField error={errors.ageError}
                   helperText={errors.ageError &&
                       'Доступный возраст от 5 до 10 лет'}
                   value={ageValue} type="number"
                   onChange={(event) => setAgeValue(
                       parseInt(event.target.value))}
                   label="Сколько тебе лет?"/>
        <ButtonGroup>
          <Button
              variant={sexValue === 'M' ? 'contained' : 'outlined'}
              onClick={() => setSexValue('M')}>Мальчик</Button>
          <Button variant={sexValue === 'W' ? 'contained' : 'outlined'}
                  onClick={() => setSexValue('W')}>Девочка</Button>
        </ButtonGroup>
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
    name: state.user.name,
    age: state.user.age,
    sex: state.user.sex,
  };
};

const mapDispatchToProps = (dispatch) => {
  const {updateUser} = bindActionCreators(actions, dispatch);
  return {
    updateUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDialog);