import {connect} from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

function History({statistic}) {
  console.log(statistic);
  return (
      <>
        <Typography variant="h5">История</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Номер попытки</TableCell>
                <TableCell>Уровень сложности</TableCell>
                <TableCell>Правильные решения</TableCell>
                <TableCell>Всего решений</TableCell>
                <TableCell>Когда была попытка?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {statistic.map((el, i) => {
                return (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{el.level === 0 ? 'Легкий' : el.level === 1
                          ? 'Средний'
                          : el.level === 2 ? 'Сложный' : ''}</TableCell>
                      <TableCell>{el.correctCount}</TableCell>
                      <TableCell>{el.examplesCount}</TableCell>
                      <TableCell>{el.createdDatetime !== undefined
                          ? el.createdDatetime.toString() : ''}</TableCell>
                    </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </>
  );
}

const mapStateToProps = (state) => {
  return {
    statistic: state.statistic,
  };
};

export default connect(mapStateToProps)(History);