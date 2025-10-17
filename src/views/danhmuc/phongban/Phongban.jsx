import React, { Component, useEffect, useState } from 'react'
import api from '../../../Utils/Api'
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
import { useDispatch, useSelector } from 'react-redux';
import { phongbanService } from '../../../service/phongbanService';
import { listPhongban } from './phongbanSlice';
function Phongban() {
  const data=useSelector(state=>state.phongbans.data)
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await phongbanService.getPhongban()     
        dispatch(listPhongban(response.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [dispatch])

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <DocsComponents href="components/table/" />
          <CCard className="mb-4">
            <CCardHeader>
              <small>Cập nhật bảng </small> <strong>Phòng ban</strong>
            </CCardHeader>
            <CCardBody>
              <table className="table table-hover  ">
                <thead>
                  <tr className="primary">
                    <th>Id</th>
                    <th>Tên Phòng</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((items) => (
                    <tr key={items.id}>
                      <td>{items.id}</td>
                      <td>{items.tenPhong}</td>
                      <td>{items.trangThai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Phongban
