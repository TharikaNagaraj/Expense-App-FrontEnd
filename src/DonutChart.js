import React, { useState,useEffect } from "react";
import {Chart} from 'react-google-charts'

const DonutChart = (props) => 
{
    const {google,donutChartData,donutChartOptions,width,height} = props
    const [chart,setChart] = useState(null)

    useEffect(() => 
    {
        if(google && !chart)
        {
            // const data = new google.visualization.DataTable();
            // data.addColumn('string', 'Topping');
            // data.addColumn('number', 'Slices');
            // data.addRows([
            //     ['Mushrooms', 3],
            //     ['Onions', 1],
            //     ['Olives', 1],
            //     ['Zucchini', 1],
            //     ['Pepperoni', 2]
            // ]);
            const data = donutChartData
            const options = donutChartOptions
            width = "55%"
            height="40px"

            // Set chart options
            // var options = {'title':'How Much Pizza I Ate Last Night',
            //             'width':400,
            //             'height':300};

            // Instantiate and draw our chart, passing in some options.
            const newChart = new google.visualization.PieChart(document.getElementById('pizzaChart'));
            newChart.draw(data, options);

            setChart(newChart)
        }
    },[chart])
    return(
        <div>
            <div id="pizzaChart" className={!google ? 'd-none' : ''} />
            {/* <Chart
                chartType="PieChart"
                data={donutChartData}
                options={donutChartOptions}
                width={"55%"}
                height={"400px"}
            /> */}
        </div>
    )
}
export default DonutChart