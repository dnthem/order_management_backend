import { useEffect, useRef, useState } from "react";
import CardInfoDB from "../../components/CardInfoDB";
import Header from "../../components/Header";
import AreaChart from "./AreaChart";
import LoadBarChart from "./BarChart";
import { dataConverterIncome, dataConverterMenu, getIncomeUpToDate, getTotalItemSold, getIncomeTrending } from "./DataConverter";
import {BsCurrencyDollar, BsFillBarChartFill} from 'react-icons/bs';
import {RiDashboard3Line} from 'react-icons/ri';
import { useData } from "../../customHooks/useData";
import Loader from "../../components/Loader";
import { dateFormat } from "../../utils";
import {BiTrendingUp ,BiTrendingDown} from 'react-icons/bi';
function Dashboard(props) {
    const [menu, ] = useData({
        store:'Menu',
        index:'id',
    })

    const [orders, ] = useData({
        store:'OrdersV2',
        index:'orderID',
    })

    const [customers, ] = useData({
        store:'Customers',
        index:'customerID'
    })

    const [income, ] = useData({
        store:'Income',
        index:'Date'
    })

    const [loader, setLoader] = useState(false);
    const [customerSortBy, setCustomerSortBy] = useState(0);
    const [sortedCustomers, setSortedCustomers] = useState([]);
    const incomeChart = useRef();
    const mostOrderedChart = useRef();

    const incomeUptoDate = getIncomeUpToDate(income);
    const incomeTrending = getIncomeTrending(income);  
    const totalItemsSold =  getTotalItemSold(menu);
    const totalCustomers = customers.length;
    const revenueToday = orders.filter(order => order.status && order.deliverDate === dateFormat()).reduce((acc, order) => acc + order.total??0, 0); 
      

    const selectOnChange = (e) => {
        const value = Number(e.target.value);
        setCustomerSortBy(value);
        let sortedCustomers = [...customers];
        
        if (value === 1) {
            sortedCustomers.sort((a, b) => b.orderCount - a.orderCount);
        } else if (value === 2) {
            sortedCustomers.sort((a, b) => b.totalSpent - a.totalSpent);
        }
        setSortedCustomers(sortedCustomers);
    }


    useEffect(() => {
        const loadChart = () => {

            setLoader(true);
           
            const dataIncomeChart =  dataConverterIncome(income);
            AreaChart(incomeChart.current, dataIncomeChart);
        
            const dataMenu = dataConverterMenu(menu);
            LoadBarChart(mostOrderedChart.current, dataMenu);
            

            setLoader(false);
            
        }
        loadChart();
        setSortedCustomers(customers); 
    },[menu, customers])


    const handleIncomeOnChange = (e) => {
        const dataIncome = dataConverterIncome(income, Number(e.target.value));
        AreaChart(incomeChart.current, dataIncome); 
    }

    
    return (
        <>
        {loader && <Loader/>}
        <div className="row">
            <div className="col-8">
                <Header icon={<RiDashboard3Line/>} title='Dashboard'/>
            </div>
            <div className="col-4">
                
                {/* <div className="d-flex justify-content-evenly align-items-center">
                <style>
                    {
                        `
                        .spinning {
                            animation: spin-animation 2s infinite;
                            animation-timing-function: linear; 
                            display: inline-block;
                          }
                          
                          @keyframes spin-animation {
                            0% {
                              transform: rotate(0deg);
                            }
                            100% {
                              transform: rotate(359deg);
                            }
                          }
                          `
                    }
                </style>
                    <button className="btn mt-4">Run Analysis <span className="spinning"><BiAnalyse/></span></button>
                </div> */}
            </div>
                
        </div>
        <div className="row">
            <CardInfoDB title='Income Up to Date' value={Intl.NumberFormat('en-us',{style: 'currency', currency: 'USD'}).format(incomeUptoDate)} icon={<BsCurrencyDollar size={30}/>}/>

            <CardInfoDB title={`Revenue Today ` + dateFormat()} value={Intl.NumberFormat('en-us',{style: 'currency', currency: 'USD'}).format(revenueToday)} icon={<BsCurrencyDollar size={30}/>}/>

            <CardInfoDB title='Total items sold' value={Intl.NumberFormat('en-us').format(totalItemsSold)} icon={<BsFillBarChartFill size={30}/>}/>
            <CardInfoDB title='Total Customers' value={Intl.NumberFormat('en-us').format(totalCustomers)} icon={<BsFillBarChartFill size={30}/>}/>

            <CardInfoDB title='Trending' value={incomeTrending + '%'} icon={incomeTrending >= 0? <BiTrendingUp/> : <BiTrendingDown/>}/>

        </div>
        <div className="row">
            <div className="col-xl-6">
                <div className="d-flex justify-content-end my-2">
                    <div onChange={handleIncomeOnChange} className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="income" id="income1" autoComplete="off" value='0' defaultChecked={true}/>
                        <label className="btn btn-outline-primary" htmlFor="income1">Last 7 days</label>

                        <input type="radio" className="btn-check" name="income" id="income2" autoComplete="off" value='1'/>
                        <label className="btn btn-outline-primary" htmlFor="income2">Last 30 days</label>

                        <input type="radio" className="btn-check" name="income" id="income3" autoComplete="off" value='2'/>
                        <label className="btn btn-outline-primary" htmlFor="income3">All</label>
                    </div>
                </div>
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
        
        <div className="row">
        <h3>Customers</h3>
        <div className="col-12">
            sort by:
            
                <select className="btn btn-outline-primary" value={customerSortBy} onChange={selectOnChange}>
                    <option value="0">Default</option>
                    <option value="1">Total Orders</option>
                    <option value="2">Total Spent</option>
                    
                </select>
        </div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Total Orders</th>
                        <th scope="col">Total Spent</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedCustomers.map(customer => (
                            <tr key={customer.id}>
                                <td>{customer.customerName}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.orderCount}</td>
                                <td>{Intl.NumberFormat('en-us',{style: 'currency', currency: 'USD'}).format(customer.totalSpent)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
        </> 
        
     );
}

export default Dashboard;