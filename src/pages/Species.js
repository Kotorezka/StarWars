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

export default class Species extends Component {
    render() {
        const { history } = this.props;

        let tableData = [];

        function firstLetterUpperCase(str) {
            if (!str) return str;

            return str[0].toUpperCase() + str.slice(1);
        }

        const getData = fetch('https://swapi.dev/api/species/')
            .then((response) => response.json())
            .then((data) => {
                return data;
            })

        const setData = async () => {
            const a = await getData;
            localStorage.setItem('data-species', JSON.stringify(a));
        };

        setData();
        
        const tableDataObject = JSON.parse(localStorage.getItem('data-species'));
        
        let id = 1;
        
        for (let i = 0; i < tableDataObject.results.length; i++) {
            
                let element = {
                    key: id.toString(),
                    name: firstLetterUpperCase(tableDataObject.results[i].name.toString()),
                    language: firstLetterUpperCase(tableDataObject.results[i].language.toString()),
                    designation: firstLetterUpperCase(tableDataObject.results[i].designation.toString()),
                    classification: firstLetterUpperCase(tableDataObject.results[i].classification.toString()),
                    height: `${tableDataObject.results[i].average_height} см.`,
                };
                tableData.push(element);
                id++;
             
        }

        const columns = [{
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Язык',
            dataIndex: 'language',
            key: 'language',

        },
        {
            title: 'Назначение',
            dataIndex: 'designation',
            key: 'designation',

        },
        {
            title: 'Классификация',
            dataIndex: 'classification',
            key: 'classification',    
        },
        {
            title: 'Средний рост',
            dataIndex: 'height',
            key: 'height',
        },
    ];


        
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