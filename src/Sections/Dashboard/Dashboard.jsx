import { useEffect, useRef } from "react";
import { GetDataBaseContext } from "../../App";
import Header from "../../components/Header";
import indexedDBController from "../../indexedDB/indexedDB";
import AreaChart from "./AreaChart";
import LoadBarChart from "./BarChart";

async function dataConverterIncome(db) {
    const data = await indexedDBController.getAllDataFromStore(db, 'Income');
    const res = {};
    const maxLen = data.length - 7<0 ? 0: data.length;
    res.labels = data.map(e => e.Date).slice(maxLen-7);
    res.data = data.map(e => e.Income).slice(maxLen-7);
    res.max = Math.max(...res.data);


    return res;
}

async function dataConverterMenu(db) {
    const data = await indexedDBController.getAllDataFromStore(db, 'Menu');
    const res = {};
    res.labels = data.map(e => e.Title);
    res.data = data.map(e => e.Count);
    res.max = Math.max(...res.data);
    return res;
}


function Dashboard(props) {
    const {db} = GetDataBaseContext();
    const incomeChart = useRef();
    const mostOrderedChart = useRef();
    useEffect(() => {
        const loadChart = async () => {
            const dataIncome = await dataConverterIncome(db);
            AreaChart(incomeChart.current, dataIncome);
            const dataMenu = await dataConverterMenu(db);
            LoadBarChart(mostOrderedChart.current, dataMenu);
        }
        loadChart();
    },[])

    return (
        <>
        <div className="row">
            <div className="col-8">
                <Header title='Dashboard'/>
            </div>
                
        </div>
        <div className="row">
            <div className="col-xl-6">
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