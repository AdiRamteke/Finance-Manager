import React from "react";
import { Container, Row } from "react-bootstrap";
import LineProgressBar from "../../components/LineProgressBar";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Analytics = ({ transactions }) => {
  const TotalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (item) => item.transactionType === "credit"
  );
  const totalExpenseTransactions = transactions.filter(
    (item) => item.transactionType === "expense"
  );

  let totalIncomePercent =
    (totalIncomeTransactions.length / TotalTransactions) * 100;
  let totalExpensePercent =
    (totalExpenseTransactions.length / TotalTransactions) * 100;

  const totalTurnOver = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalTurnOverIncome = transactions
    .filter((item) => item.transactionType === "credit")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalTurnOverExpense = transactions
    .filter((item) => item.transactionType === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const TurnOverIncomePercent = (totalTurnOverIncome / totalTurnOver) * 100;
  const TurnOverExpensePercent = (totalTurnOverExpense / totalTurnOver) * 100;

  return (
    <>
      <Container className="py-5">
        <Row className="justify-content-center">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow-lg border-0 rounded-lg overflow-hidden">
              <div className="card-header" style={{ background: "linear-gradient(135deg, #FFA500, #FF4500)", color: "black" }}>
                <h5 className="mb-0 text-center">Total Transactions</h5>
                <h2 className="text-center">{TotalTransactions}</h2>
              </div>
              <div className="card-body bg-light text-center">
                <h5 className="text-success">
                  Income: <ArrowDropUpIcon /> {totalIncomeTransactions.length}
                </h5>
                <h5 className="text-danger">
                  Expense: <ArrowDropDownIcon /> {totalExpenseTransactions.length}
                </h5>
                <div className="mt-3">
                  <LineProgressBar percentage={totalIncomePercent.toFixed(0)} color="#28a745" />
                </div>
                <div className="mt-3">
                  <LineProgressBar percentage={totalExpensePercent.toFixed(0)} color="#dc3545" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow-lg border-0 rounded-lg overflow-hidden">
              <div className="card-header" style={{ background: "linear-gradient(135deg, #32CD32, #008000)", color: "black" }}>
                <h5 className="mb-0 text-center">Total TurnOver</h5>
                <h2 className="text-center"><CurrencyRupeeIcon /> {totalTurnOver}</h2>
              </div>
              <div className="card-body bg-light text-center">
                <h5 className="text-success">
                  Income: <ArrowDropUpIcon /> {totalTurnOverIncome} <CurrencyRupeeIcon />
                </h5>
                <h5 className="text-danger">
                  Expense: <ArrowDropDownIcon /> {totalTurnOverExpense} <CurrencyRupeeIcon />
                </h5>
                <div className="mt-3">
                  <LineProgressBar percentage={TurnOverIncomePercent.toFixed(0)} color="#ffc107" />
                </div>
                <div className="mt-3">
                  <LineProgressBar percentage={TurnOverExpensePercent.toFixed(0)} color="#ff6b6b" />
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Analytics;