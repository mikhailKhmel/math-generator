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
import {getScore} from '../../utils/score.js';

function History({statistic}) {

  return (
      <>
        <Typography variant="h5">История</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Номер попытки</TableCell>
                <TableCell>Правильные решения</TableCell>
                <TableCell>Всего решений</TableCell>
                <TableCell>Когда была попытка?</TableCell>
                <TableCell>Оценка</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {statistic.map((el, i) => {
                const score = getScore(el.correctCount / el.examplesCount);
                const textColor = score >= 4 ? 'green' : 'red';
                const styleClass = {fontWeight: 'bold', color: textColor};
                return (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{el.correctCount}</TableCell>
                      <TableCell>{el.examplesCount}</TableCell>
                      <TableCell>{el.createdDatetime !== undefined
                          ? el.createdDatetime.toString() : ''}</TableCell>
                      <TableCell>
                        <Typography sx={styleClass}>{score}</Typography></TableCell>
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