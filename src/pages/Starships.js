import React, { Component } from "react";

import { Table, Tag, Space, Button } from 'antd';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    BrowserRouter,
    withRouter
} from "react-router-dom";

import '../../src/antd.css';

export default class Starships extends Component {
    render() {
        const { history } = this.props;

        let tableData = [];

        function firstLetterUpperCase(str) {
            if (!str) return str;

            return str[0].toUpperCase() + str.slice(1);
        }

        const getData = fetch('https://swapi.dev/api/starships/')
            .then((response) => response.json())
            .then((data) => {
                return data;
            })

        const setData = async () => {
            const a = await getData;
            localStorage.setItem('data-starships', JSON.stringify(a));
        };

        setData();
        
        const tableDataObject = JSON.parse(localStorage.getItem('data-starships'));
        
        let id = 1;
        
        for (let i = 0; i < tableDataObject.results.length; i++) {
            
                let element = {
                    key: id.toString(),
                    name: firstLetterUpperCase(tableDataObject.results[i].name.toString()),
                    model: firstLetterUpperCase(tableDataObject.results[i].model.toString()),
                    cargo: `${firstLetterUpperCase(tableDataObject.results[i].cargo_capacity.toString())} кг.`,
                    crew: firstLetterUpperCase(tableDataObject.results[i].crew.toString()),
                    passengers: tableDataObject.results[i].passengers,
                    cost: `${tableDataObject.results[i].cost_in_credits} кредитов`,
                };
                tableData.push(element);
                id++;
             
        }

        const columns = [{
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Модель',
            dataIndex: 'model',
            key: 'model',

        },
        {
            title: 'Грузоподъемность',
            dataIndex: 'cargo',
            key: 'cargo',

        },
        {
            title: 'Экпипаж',
            dataIndex: 'crew',
            key: 'crew',    
        },
        {
            title: 'Вместимость',
            dataIndex: 'passengers',
            key: 'passengers',
        },
        {
            title: 'Стоимость',
            dataIndex: 'cost',
            key: 'cost',
        },
    ];


        console.log(tableDataObject);
        return (
            <div className="container">
                <Table columns={columns} dataSource={tableData} bordered/>
                <Button type='primary'>
                    <Link to="/">Назад</Link>
                </Button>
            </div>
        );
    }
}