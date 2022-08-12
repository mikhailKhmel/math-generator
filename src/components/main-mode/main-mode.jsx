import {
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
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
import ProfileDialog from '../dialogs/profile-dialog.jsx';

function MainMode(props) {
  const [examplesCount, setExamplesCount] = useState(20);
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startExamplesTour, setStartExamplesTour] = useState(false);
  const [openStats, setOpenStats] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  function handleAnswer(answer) {
    setOpen(false);
    if (!answer) return;
    setStartExamplesTour(answer);
  }

  if (startExamplesTour) {
    const params = modeParams(props.user.age);
    const examples = Generate(params.maxResult, 0, params.maxTerms, ['+', '-'],
        examplesCount);
    return <ExamplesTour onClose={() => setStartExamplesTour(false)}
                         examples={examples}/>;
  }

  if (openStats) {
    return <Stats onClose={() => setOpenStats(false)}/>;
  }

  return (
      <Container maxWidth="md">
        <YesNoDialog open={open} title={'Ты готов начать?'}
                     onAction={handleAnswer}/>
        <ProfileDialog open={openProfile} action={() => setOpenProfile(false)}/>
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6"></Typography>
            <IconButton onClick={handleOpenMenu}><MenuIcon/></IconButton>
            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
              <MenuItem onClick={() => {
                handleCloseMenu();
                setOpenProfile(true);
              }}>Профиль</MenuItem>
              <MenuItem onClick={() => {
                handleCloseMenu();
                setOpenStats(true);
              }}>Статистика и история</MenuItem>
            </Menu>
          </Stack>

          <Stack alignItems="center">
            <Typography variant="h6">Сколько примеров будем решать?</Typography>
            <ButtonGroup>
              <Button variant={examplesCount === 10 ? 'contained' : 'outlined'}
                      color="error"
                      onClick={() => setExamplesCount(10)}>10</Button>
              <Button variant={examplesCount === 15 ? 'contained' : 'outlined'}
                      onClick={() => setExamplesCount(15)}
                      color="warning">15</Button>
              <Button variant={examplesCount === 20 ? 'contained' : 'outlined'}
                      onClick={() => setExamplesCount(20)}
                      color="success">20</Button>
            </ButtonGroup>
          </Stack>
          <Button onClick={() => setOpen(true)}
                  color="primary"
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