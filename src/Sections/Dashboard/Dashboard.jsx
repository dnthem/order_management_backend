import { useEffect, useRef, useState } from "react";
import { GetDataBaseContext } from "../../App";
import CardInfoDB from "../../components/CardInfoDB";
import Header from "../../components/Header";
import AreaChart from "./AreaChart";
import LoadBarChart from "./BarChart";
import { dataConverterIncome, dataConverterMenu, getIncomeUpToDate, getTotalItemSold } from "./DataConverter";
import {BsCurrencyDollar, BsFillBarChartFill} from 'react-icons/bs'


function Dashboard(props) {
    const {db} = GetDataBaseContext();
    const incomeChart = useRef();
    const mostOrderedChart = useRef();
    const [incomeUpToDate, setIncomeUpToDate] = useState(0);
    const [totalItemsSold, setTotalItemsSold] = useState(0);
    useEffect(() => {
        const loadChart = async () => {
            const dataIncome = await dataConverterIncome(db);
            AreaChart(incomeChart.current, dataIncome);
            const dataMenu = await dataConverterMenu(db);
            LoadBarChart(mostOrderedChart.current, dataMenu);

            const income = await getIncomeUpToDate(db);
            setIncomeUpToDate(income);

            const total = await getTotalItemSold(db);
            setTotalItemsSold(total);
        }
        loadChart();
    },[])


    const handleIncomeOnChange = async (e) => {
        const dataIncome = await dataConverterIncome(db, Number(e.target.value));
        AreaChart(incomeChart.current, dataIncome); 
    }
    return (
        <>
        <div className="row">
            <div className="col-8">
                <Header title='Dashboard'/>
            </div>
                
        </div>
        <div className="row">
            <CardInfoDB title='Income Up to Date' value={Intl.NumberFormat('en-us',{style: 'currency', currency: 'USD'}).format(incomeUpToDate)} icon={<BsCurrencyDollar size={30}/>}/>
            <CardInfoDB title='Total items sold' value={Intl.NumberFormat('en-us').format(totalItemsSold)} icon={<BsFillBarChartFill size={30}/>}/>
        </div>

        <div className="row">
            <div className="col-xl-6">
                <div className="d-flex justify-content-end my-2">
                    <div onChange={handleIncomeOnChange} className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="income" id="income1" autoComplete="off" value='0' defaultChecked={true}/>
                        <label className="btn btn-outline-primary" for="income1">Last 7 days</label>

                        <input type="radio" className="btn-check" name="income" id="income2" autoComplete="off" value='1'/>
                        <label className="btn btn-outline-primary" for="income2">Last 30 days</label>

                        <input type="radio" className="btn-check" name="income" id="income3" autoComplete="off" value='2'/>
                        <label className="btn btn-outline-primary" for="income3">All</label>
                    </div>
                </div>
            

                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-chart-area me-1"></i>
                        Income Chart
                    </div>
                    <div className="card-body"><canvas ref={incomeChart} width="100%" height="40"></canvas></div>
                </div>
            </div>
            <div className="col-xl-6">
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-chart-bar me-1"></i>
                        Most ordered Items
                    </div>
                    <div className="card-body"><canvas ref={mostOrderedChart} width="100%" height="40"></canvas></div>
                </div>
            </div>
        </div>
        </> 
        
     );
}

export default Dashboard;