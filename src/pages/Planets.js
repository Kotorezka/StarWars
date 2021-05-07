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

export default class Planets extends Component {
    
    render() {
        const { history } = this.props;

        let tableData = [];

        function firstLetterUpperCase(str) {
            if (!str) return str;

            return str[0].toUpperCase() + str.slice(1);
        }

        const getData = fetch('https://swapi.dev/api/planets/')
            .then((response) => response.json())
            .then((data) => {
                return data;
            })

        const setData = async () => {
            const a = await getData;
            localStorage.setItem('data-planets', JSON.stringify(a));
        };

        setData();
        
        const tableDataObject = JSON.parse(localStorage.getItem('data-planets'));
        
        let id = 1;
        
        for (let i = 0; i < tableDataObject.results.length; i++) {
            
                let element = {
                    key: id.toString(),
                    name: firstLetterUpperCase(tableDataObject.results[i].name.toString()),
                    population: tableDataObject.results[i].population,
                    climate: firstLetterUpperCase(tableDataObject.results[i].climate.toString()),
                    terrain: firstLetterUpperCase(tableDataObject.results[i].terrain.toString()),
                    
                };
                tableData.push(element);
                id++;
        
        }

        const columns = [{
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            
        },
        {
            title: 'Популяция',
            dataIndex: 'population',
            key: 'population',
            sorter: (a, b) => a.population.length - b.population.length,
            

        },
        {
            title: 'Климат',
            dataIndex: 'climate',
            key: 'climate',
            sorter: (a, b) => a.climate.length - b.climate.length,
            

        },
        {
            title: 'Ландшафт',
            dataIndex: 'terrain',
            key: 'terrain',
            sorter: (a, b) => a.terrain.length - b.terrain.length,
                
        },
    ];
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
      }
        console.log(tableDataObject);
        return (
            <div className="container">
                <Table columns={columns} dataSource={tableData} onChange={onChange} bordered/>
                <Button type='primary'>
                    <Link to="/">Назад</Link>
                </Button>
            </div>
        );
    }
}