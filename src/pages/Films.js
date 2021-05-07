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

export default class Films extends Component {
    render() {
        const { history } = this.props;

        let tableData = [];

        function firstLetterUpperCase(str) {
            if (!str) return str;

            return str[0].toUpperCase() + str.slice(1);
        }

        const getData = fetch('https://swapi.dev/api/films/')
            .then((response) => response.json())
            .then((data) => {
                return data;
            })

        const setData = async () => {
            const a = await getData;
            localStorage.setItem('data-films', JSON.stringify(a));
        };

        setData();
        
        const tableDataObject = JSON.parse(localStorage.getItem('data-films'));
        
        let id = 1;
        
        for (let i = 0; i < tableDataObject.results.length; i++) {
            
                let element = {
                    key: id.toString(),
                    title: firstLetterUpperCase(tableDataObject.results[i].title.toString()),
                    episode: firstLetterUpperCase(tableDataObject.results[i].episode_id.toString()),
                    director: firstLetterUpperCase(tableDataObject.results[i].director.toString()),
                    producer: firstLetterUpperCase(tableDataObject.results[i].producer.toString()),
                    release: tableDataObject.results[i].release_date,
                };
                tableData.push(element);
                id++;
             
        }

        const columns = [{
            title: 'Название',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Эпизод',
            dataIndex: 'episode',
            key: 'episode',

        },
        {
            title: 'Режиссёр',
            dataIndex: 'director',
            key: 'director',

        },
        {
            title: 'Продюссер(ы)',
            dataIndex: 'producer',
            key: 'producer',    
        },
        {
            title: 'Дата выхода',
            dataIndex: 'release',
            key: 'release',
        },
    ];


        console.log(tableData);
        return (
            <div className="container">
                <Table columns={columns} dataSource={tableData} bordered />
                <Button type='primary'>
                <Link to="/">Назад</Link>
                </Button>
                
            </div>
        );
    }
}