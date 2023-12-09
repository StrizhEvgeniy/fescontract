import React, {useState, useEffect} from "react";
import {Input, Table, Tooltip} from "antd";


const SeaferesList = () => {
  const [data, setdata] = useState([{
    key: 1,
    name: 'Иванов Иван Иванович',
    email: 'Iva@nov.ru',
    points: 32,
    level: 'B1',
    testType: 'LevelTest',
    date: '2021-03-20'
    }]);

    useEffect(() => {
      console.log('in useEffect')
        fetch("http://127.0.0.1:5000/get_data").then((res) =>
            res.json().then((data) => {
                console.log('got data')
                setdata(data);
            })
        );
    }, []);

  const [dataSource, setDataSource] = useState(data)
  const [value, setValue] = useState({
    name: '',
    email: ''
  })

  const filterInput = (field) => (
    <Input
      placeholder='Поиск'
      value={value[field]}
      onChange={e => {
        const currentValue = e.target.value.toLowerCase()
        setValue({field: currentValue})
        const filteredData = data.filter(entry => entry[field].toLowerCase().includes(currentValue))
        setDataSource(filteredData)
      }}
    />
  )

  const columns = [
    {
      title: filterInput('name'),
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: filterInput('email'),
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Баллы',
      dataIndex: 'points',
      key: 'points'
    },
    {
      title: 'Уровень',
      dataIndex: 'level',
      key: 'level'
    },
    {
      title: 'Тип теста',
      dataIndex: 'testType',
      key: 'testType'
    },
    {
      title: 'Дата теста',
      dataIndex: 'date',
      key: 'date',
      render: (text, record) => <Tooltip placement="right" title='YYYY-MM-DD'>{text}</Tooltip>,
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    },
  ]

  return <div><Table columns={columns} dataSource={dataSource}/></div>;
}

export default SeaferesList;
