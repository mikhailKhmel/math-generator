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
  const easyProc = (easyCorrectCount / easyExamplesCount) * 100;
  const easyProcStr = isNaN(easyProc) ? '-' : `${Number((easyCorrectCount / easyExamplesCount) * 100).
      toFixed(0)}%`;

  const mediumLevel = statistic.filter(x => x.level === 1);
  const mediumExamplesCount = mediumLevel.reduce(
      (sum, value) => sum + value.examplesCount, 0);
  const mediumCorrectCount = mediumLevel.reduce(
      (sum, value) => sum + value.correctCount, 0);
  const mediumProc = (mediumCorrectCount / mediumExamplesCount) * 100;
  const mediumProcStr = isNaN(mediumProc) ? '-' : `${Number((mediumCorrectCount / mediumExamplesCount) * 100).
      toFixed(0)}%`;

  const hardLevel = statistic.filter(x => x.level === 2);
  const hardExamplesCount = hardLevel.reduce(
      (sum, value) => sum + value.examplesCount, 0);
  const hardCorrectCount = hardLevel.reduce(
      (sum, value) => sum + value.correctCount, 0);
  const hardProc = (hardCorrectCount / hardExamplesCount) * 100;
  const hardProcStr = isNaN(hardProc) ? '-' : `${Number((hardCorrectCount / hardExamplesCount) * 100).
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