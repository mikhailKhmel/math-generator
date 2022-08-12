import {connect} from 'react-redux';
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import History from './history.jsx';
import {getScore} from '../../utils/score.js';

function Stats({statistic, onClose}) {
  const overallCorrectCount = statistic.map(x => x.correctCount).
      reduce((sum, value) => sum + value, 0);
  const overallExamplesCount = statistic.map(x => x.examplesCount).
      reduce((sum, value) => sum + value, 0);
  let overallResult = [];
  for (let i = 0; i < statistic.length; i++) {
    const el = statistic[i];
    overallResult.push(getScore(el.correctCount / el.examplesCount));
  }
  const overallProc = overallResult.reduce((sum, value) => sum + value, 0) /
      overallResult.length;
  const overallProcStr = isNaN(overallProc) ? '-' : `${Number(overallProc).
      toFixed(2)}`;

  const textColor = overallProc >= 4 ? 'green' : 'red';
  const styleClass = {fontWeight: 'bold', color: textColor};

  return (
      <Stack spacing={2}>
        <Button onClick={onClose} variant="outlined">Назад</Button>
        <Typography variant="h5">Статистика</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Всего решенных примеров</TableCell>
                <TableCell>Всего правильно решенных примеров</TableCell>
                <TableCell>Средняя оценка</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{overallExamplesCount}</TableCell>
                <TableCell>{overallCorrectCount}</TableCell>
                <TableCell><Typography sx={styleClass}>{overallProcStr}</Typography></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <History/>
      </Stack>

  );
}

const mapStateToProps = (state) => {
  return {
    statistic: state.statistic,
  };
};

export default connect(mapStateToProps)(Stats);