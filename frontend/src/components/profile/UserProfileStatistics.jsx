import { CChart } from '@coreui/react-chartjs';
import { React, useState, useEffect } from 'react'
import DataService from 'services/auth/user.service'
import AuthService from 'services/auth/auth.service'

const currentUser = AuthService.getCurrentUser();

const UserProfileStatistics = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  useEffect(() => {
    DataService.getStatistics(currentUser.id).then(data => {
      data.map((e) => {
        labels.push('Luna '+e.month.toString() + ' ' + e.year.toString())
        values.push(e.n_id)
      })
      setData(data)
    }
    )
  }, []);

  return (
    <div className='container mt-5'>
      <CChart
        type="bar"
        data={{
          labels: labels,
          datasets: [
            {
              label: 'Numar produse listate',
              backgroundColor: '#f87979',
              data: values,
            },
          ],
        }}
        labels="months"
      />
    </div>
  )
}

export default UserProfileStatistics