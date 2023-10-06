import { useState } from 'react';
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Analise() {

    const optipo = [
        { label: 'Todos', value: 1 },
        { label: 'Serviços de TI', value: 2 },
        { label: 'Obras', value: 3 },
        { label: 'Mão Obra', value: 4 },
        { label: 'Instalação de produtos', value: 5 },
    ]

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div style={{
            width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'aliceblue', padding: '20px', margin: '20px'
        }}>
            <div>
                <div>
                    <span>Defina o periodo. </span>
                    <br />
                    <span>Dê: </span>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    <span> até </span>
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '220px' }}>
                    <Dropdown
                        placeholder="Tipo de contratação"
                        fluid
                        multiple
                        search
                        selection
                        options={optipo}
                        style={{ minWidth: '200px' }}
                    />
                </div>
                <span style={{ margin: '10px' }}></span>
                <button>
                    Confirmar
                </button>
            </div>

            {/* grid of charts */}
            <span> Grid of charts </span>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '50%', height: '50%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={[
                                { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
                                { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
                                { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
                                { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
                                { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
                                { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
                                { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
                            ]}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '50%', height: '50%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    width={500}
                                    height={300}
                                    data={[
                                        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
                                        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
                                        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
                                        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
                                        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
                                        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
                                        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
                                    ]}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}