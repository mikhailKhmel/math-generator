import {
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {useState} from 'react';
import YesNoDialog from '../dialogs/yesno-dialog';
import ExamplesTour from '../examples-tour/examples-tour.jsx';
import {modeParams} from '../../utils/mode-params.js';
import {connect} from 'react-redux';
import {Generate} from '../../utils/generator.js';
import Stats from '../stats/stats.jsx';
import MenuIcon from '@mui/icons-material/Menu';

function MainMode(props) {
  const [examplesCount, setExamplesCount] = useState(10);
  const [level, setLevel] = useState(0);
  const [open, setOpen] = useState(false);
  const [startExamplesTour, setStartExamplesTour] = useState(false);
  const [error, setError] = useState('');
  const [openStats, setOpenStats] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const levelNames = ['Легкий', 'Средний', 'Сложный'];

  function checkExamplesCount() {
    if (examplesCount > 50 || examplesCount < 1) {
      setError('Количество примеров не может быть больше 50 и меньше 1');
      return false;
    }
    setError('');
    return true;
  }

  function handleAnswer(answer) {
    setOpen(false);
    if (!answer) return;
    setStartExamplesTour(answer);
  }

  if (startExamplesTour) {
    const params = modeParams(props.user.age, level);
    const examples = Generate(params.maxResult, 0, params.maxTerms, ['+', '-'],
        examplesCount);
    return <ExamplesTour onClose={() => setStartExamplesTour(false)}
                         examples={examples} level={level}/>;
  }

  if (openStats) {
    return <Stats onClose={() => setOpenStats(false)}/>;
  }

  return (
      <Container maxWidth="xs">
        <YesNoDialog open={open} title={'Ты готов начать?'}
                     onAction={handleAnswer}/>
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">Выбери уровень сложности</Typography>
            <IconButton onClick={handleOpenMenu}><MenuIcon/></IconButton>
            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
              <MenuItem>Профиль</MenuItem>
              <MenuItem onClick={() => {
                handleCloseMenu();
                setOpenStats(true);
              }}>Статистика</MenuItem>
            </Menu>
          </Stack>

          <TextField
              error={error !== ''}
              helperText={error}
              onChange={(event) => setExamplesCount(
                  parseInt(event.target.value))}
              InputLabelProps={{
                shrink: true,
              }} value={examplesCount || ''} type="number" variant="standard"
              label="Сколько примеров?"/>
          <Stack direction="row" justifyContent="center">
            <ButtonGroup>
              {
                levelNames.map((x, i) => {
                  return <Button key={i} variant={`${(i !== level
                      ? 'outlined'
                      : 'contained')}`}
                                 onClick={() => setLevel(i)}>{x}</Button>;
                })
              }
            </ButtonGroup>

          </Stack>
          <Button onClick={() => checkExamplesCount() ? setOpen(true) : null}
                  color="success"
                  variant="contained">ПОЕХАЛИ!</Button>

        </Stack>
      </Container>);
}

const mapStateToProps = (state) => {
  return {
    user: {...state},
  };
};

export default connect(mapStateToProps)(MainMode);