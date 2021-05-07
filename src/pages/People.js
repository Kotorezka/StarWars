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

import moment from 'moment';

import '../../src/antd.css';

export default class People extends Component {
    render() {
        const { history } = this.props;

        let tableData = [];

        function firstLetterUpperCase(str) {
            if (!str) return str;

            return str[0].toUpperCase() + str.slice(1);
        }

        const getData = fetch('https://swapi.dev/api/people/')
            .then((response) => response.json())
            .then((data) => {
                return data;
            })

        const setData = async () => {
            const a = await getData;
            localStorage.setItem('data-people', JSON.stringify(a));
        };

        setData();
        
        const tableDataObject = JSON.parse(localStorage.getItem('data-people'));
        
        let id = 1;

        const maleIcon = `https://img.icons8.com/android/24/000000/male.png`;
        const femaleIcon = `https://img.icons8.com/android/24/000000/female.png`;

        
        
        for (let i = 0; i < tableDataObject.results.length; i++) {
            
                let element = {
                    key: id.toString(),
                    name: firstLetterUpperCase(tableDataObject.results[i].name.toString()),
                    gender: `${
                        firstLetterUpperCase(tableDataObject.results[i].gender.toString()) === "Male" ? maleIcon : firstLetterUpperCase(tableDataObject.results[i].gender.toString()) === "Female" ? femaleIcon : 'n/a'
                    }`,
                    height: `${tableDataObject.results[i].height} см`,
                    birth: tableDataObject.results[i].birth_year,
                    created: moment(tableDataObject.results[i].created).format('MMMM Do YYYY, h:mm:ss a'),
                    edited: moment(tableDataObject.results[i].edited).format('MMMM Do YYYY, h:mm:ss a'),
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
            title: 'Пол',
            dataIndex: 'gender',
            key: 'gender',
            render: (text, record) => { 
                return (
                <img src={record.gender} alt={record.gender} />
                )
            },

        },
        {
            title: 'Рост',
            dataIndex: 'height',
            key: 'height',

        },
        {
            title: 'Дата рождения',
            dataIndex: 'birth',
            key: 'birth',    
        },
        {
            title: 'Поле *created*',
            dataIndex: 'created',
            key: 'created',
        },
        {
            title: 'Поле *edited*',
            dataIndex: 'edited',
            key: 'edited'
        }
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