import React, { Component } from "react";

import { Table, Button } from 'antd';

import '../../src/antd.css';
import { Route, Link } from "react-router-dom";

export default class Home extends Component {
    render() {
        const { history } = this.props;

        let tableData = [];

        function firstLetterUpperCase(str) {
            if (!str) return str;

            return str[0].toUpperCase() + str.slice(1);
        }

        const getData = fetch('https://swapi.dev/api/')
            .then((response) => response.json())
            .then((data) => {
                return data;
            })

        const setData = async () => {
            const a = await getData;
            localStorage.setItem('data', JSON.stringify(a));
        };

        setData();
        const tableDataObject = JSON.parse(localStorage.getItem('data'));
        let id = 1;
        for (let key in tableDataObject) {
            let element = {
                key: id.toString(),
                number: id.toString(),
                name: firstLetterUpperCase(key.toString()),
                api: tableDataObject[key],
                link: `${firstLetterUpperCase(key.toString())}`,
            };
            tableData.push(element);
            id++;
        }

        const columns = [{
                title: '№',
                dataIndex: 'number',
                key: 'nymber',
            },
            {
                title: 'Название',
                dataIndex: 'name',
                key: 'name',

            },
            {
                title: 'АПИ',
                dataIndex: 'api',
                key: 'api',

            },
            {
                title: 'Cсылка',
                dataIndex: 'link',
                key: 'link',
                render: (text, record) => ( 
                    <Button type='primary'>
                    <Link to={record.link}>Открыть страницу</Link>
                    <Route history={history} path={record.link} component={record.link} />
                    </Button>
                ),
            },
        ];



        return ( 
        <div className='container'>
            <Table columns={columns} dataSource={tableData} bordered/>
        </div>
        );
    }
}