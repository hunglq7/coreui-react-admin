import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsComponents } from 'src/components'

function Chucvu() {
  const [data, setData] = useState([])

  const URL_API = 'http://103.156.47.16:5005/api'
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${URL_API}/Chucvu`)
        setData(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <CCol xs={12}>
        <DocsComponents href="components/table/" />
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cập nhật bảng</strong> <small>Chức vụ</small>
          </CCardHeader>
          <CCardBody>
            <table className="table table-hover  ">
              <thead>
                <tr className="primary">
                  <th>Id</th>
                  <th>Chức vụ</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {data.map((country) => (
                  <tr key={country.id}>
                    <td>{country.id}</td>
                    <td>{country.tenChucVu}</td>
                    <td>{country.trangThai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}

export default Chucvu
