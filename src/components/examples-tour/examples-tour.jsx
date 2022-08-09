import {useEffect, useState} from 'react';
import {
  Button,
  ButtonGroup,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import YesNoDialog from '../dialogs/yesno-dialog';
import {connect} from 'react-redux';
import * as actions from '../../actions/index.js';
import {changeStatistic} from '../../actions/index.js';
import {bindActionCreators} from 'redux';
import {getScore} from '../../utils/score.js';

function ExamplesTour(props) {
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(
      {title: '', content: '', action: null});
  const [examples] = useState(props.examples);
  const [answers, setAnswers] = useState(props.examples.map(
      x => {return {id: x.id, value: '', isCorrect: null};}));
  const [currInd, setInd] = useState(0);
  const [currValue, setCurrValue] = useState('');
  const [fixMode, setFixMode] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  const examplesChunks = [];
  const chunkSize = 5;
  for (let i = 0; i < examples.length; i += chunkSize) {
    const chunk = examples.slice(i, i + chunkSize);
    examplesChunks.push(chunk);
  }

  useEffect(() => {
    setCurrValue(answers.find(x => x.id === currInd + 1).value);
  }, [currInd]);

  function saveAnswer() {
    const a = [...answers];
    a.find(x => x.id === (currInd + 1)).value = currValue;
    setAnswers([...a]);

    if (currInd + 1 < examples.length) {
      setInd(currInd + 1);
    } else {
      setInd(0);
    }
  }

  function handleCloseExamplesTour(ans) {
    setOpen(false);
    if (ans) {
      props.onClose();
    }
  }

  function fixAnswers() {
    if (firstTime) {
      props.changeStatistic({
        level: props.level,
        examplesCount: examples.length,
        correctCount: answers.filter(x => x.isCorrect).length,
        createdDatetime: new Date(),
      });
    }

    setFirstTime(false);
    setOpen(false);
    setFixMode(true);
  }

  function handleOpenDialog(title, content, action) {
    setDialogContent({title, content, action});
    setOpen(true);
  }

  function finishTour() {
    if (answers.some(x => x.value === '')) {
      handleOpenDialog('Не все примеры решены 🤨', '', () => {setOpen(false);});
      return;
    }

    function handleShowResult() {
      for (let i = 0; i < examples.length; i++) {
        const originalAnswer = examples[i].correctValue;
        const userAnswer = answers[i].value;
        answers[i].isCorrect = originalAnswer === userAnswer;
      }
      const done = answers.every(x => x.isCorrect === true);
      const title = done ? 'Ты молодец! 😊' : 'Есть ошибки 😔';
      const content = `Твоя оценка: ${getScore(answers.filter(
          x => x.isCorrect).length / answers.length)}\n`;

      handleOpenDialog(title, content, () => {fixAnswers();});
    }

    handleOpenDialog('Ты уверен?', '', handleShowResult);
  }

  return (
      <Container fixed>
        <Stack spacing={2}>
          <YesNoDialog open={open} title={dialogContent.title}
                       content={dialogContent.content}
                       onAction={dialogContent.action}/>
          <ButtonGroup>
            <Button color="error" variant="contained"
                    onClick={() => handleOpenDialog('Ты уверен?',
                        firstTime ? 'Весь твой прогресс исчезнет!!!' : '',
                        handleCloseExamplesTour)}>Выйти</Button>
            <Button color="success" variant="contained" onClick={finishTour}>Завершить
              тест</Button>
          </ButtonGroup>
          <Typography variant="h5">Пример №{examples[currInd].id}</Typography>
          <Typography variant="h5">{examples[currInd].str}</Typography>
          <TextField
              onChange={(event) => {
                const value = event.target.value;
                if (isNaN(parseInt(value))) {
                  setCurrValue('');
                } else {
                  setCurrValue(parseInt(value));
                }
              }}
              value={currValue}
              inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
              variant="outlined" size="small" label="Ответ"/>
          <Button onClick={saveAnswer} variant="contained">Подтвердить
            ответ</Button>
          <Stack spacing={1} alignItems="center">
            {examplesChunks.map((chunk, i) => {
              return (<ButtonGroup key={i}>
                {chunk.map(element => {
                  return <Button key={element.id}
                                 variant={`${(element.id - 1 !== currInd
                                     ? 'contained'
                                     : 'text')}`}
                                 color={fixMode ?
                                     answers.find(
                                         x => x.id === element.id).isCorrect
                                         ? 'success'
                                         : 'error'
                                     : answers.find(
                                         x => x.id === element.id).value !==
                                     '' ? 'info' : 'inherit'}
                                 onClick={() => setInd(
                                     element.id - 1)}>{element.id}</Button>;
                })}
              </ButtonGroup>);
            })}
          </Stack>

        </Stack>
      </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  const {changeStatistic} = bindActionCreators(actions, dispatch);
  return {changeStatistic};
};

export default connect(null, mapDispatchToProps)(ExamplesTour);