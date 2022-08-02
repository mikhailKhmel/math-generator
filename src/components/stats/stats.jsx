import {connect} from 'react-redux';
import {
  Button,
  Paper, Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

function Stats({statistic, onClose}) {
  const easyLevel = statistic.filter(x => x.level === 0);
  const easyExamplesCount = easyLevel.reduce(
      (sum, value) => sum + value.examplesCount, 0);
  const easyCorrectCount = easyLevel.reduce(
      (sum, value) => sum + value.correctCount, 0);
  let easyProc = NaN;
  if (easyLevel.length !== 0) {
    const easyProcList = [];
    for (let i = 0; i < easyLevel.length; i++) {
      const el = easyLevel[i];
      easyProcList.push(el.correctCount / el.examplesCount);
    }
    easyProc = easyProcList.reduce((sum, value) => sum + value, 0) /
        easyProcList.length;
  }
  const easyProcStr = isNaN(easyProc) ? '-' : `${Number(easyProc * 100).
      toFixed(0)}%`;

  const mediumLevel = statistic.filter(x => x.level === 1);
  const mediumExamplesCount = mediumLevel.reduce(
      (sum, value) => sum + value.examplesCount, 0);
  const mediumCorrectCount = mediumLevel.reduce(
      (sum, value) => sum + value.correctCount, 0);
  let mediumProc = NaN;
  if (mediumLevel.length !== 0) {
    const mediumProcList = [];
    for (let i = 0; i < mediumLevel.length; i++) {
      const el = mediumLevel[i];
      mediumProcList.push(el.correctCount / el.examplesCount);
    }
    mediumProc = mediumProcList.reduce((sum, value) => sum + value, 0) /
        mediumProcList.length;
  }
  const mediumProcStr = isNaN(mediumProc) ? '-' : `${Number(mediumProc * 100).
      toFixed(0)}%`;

  const hardLevel = statistic.filter(x => x.level === 2);
  const hardExamplesCount = hardLevel.reduce(
      (sum, value) => sum + value.examplesCount, 0);
  const hardCorrectCount = hardLevel.reduce(
      (sum, value) => sum + value.correctCount, 0);
  let hardProc = NaN;
  if (hardLevel.length !== 0) {
    const hardProcList = [];
    for (let i = 0; i < hardLevel.length; i++) {
      const el = hardLevel[i];
      hardProcList.push(el.correctCount / el.examplesCount);
    }
    hardProc = hardProcList.reduce((sum, value) => sum + value, 0) /
        hardProcList.length;
  }
  const hardProcStr = isNaN(hardProc) ? '-' : `${Number(hardProc * 100).
      toFixed(0)}%`;

  return (
      <Stack spacing={2}>
        <Button onClick={onClose} variant="outlined">Назад</Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Уровень сложности</TableCell>
                <TableCell>Всего решенных примеров</TableCell>
                <TableCell>Всего правильно решенных примеров</TableCell>
                <TableCell>Процент успеха</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Легкий</TableCell>
                <TableCell>{easyExamplesCount}</TableCell>
                <TableCell>{easyCorrectCount}</TableCell>
                <TableCell>{easyProcStr}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Средний</TableCell>
                <TableCell>{mediumExamplesCount}</TableCell>
                <TableCell>{mediumCorrectCount}</TableCell>
                <TableCell>{mediumProcStr}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Сложный</TableCell>
                <TableCell>{hardExamplesCount}</TableCell>
                <TableCell>{hardCorrectCount}</TableCell>
                <TableCell>{hardProcStr}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

  );
}

const mapStateToProps = (state) => {
  return {
    statistic: state.statistic,
  };
};

export default connect(mapStateToProps)(Stats);