import React, { Component, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from '@coreui/react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { DocsComponents } from 'src/components'
import { listChucvu } from './chucvuSlice'
import { chucvuService } from '../../../service/chucvuService'

function Chucvu() {
  const customVars = {
    '--cui-btn-padding-y': '.35rem',
    '--cui-btn-padding-x': '.25rem',
    '--cui-btn-font-size': '.75rem',
  }

  const [visible, setVisible] = useState(false)
  const data = useSelector((state) => state.chucvus.data)
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await chucvuService.getChucvu()
        dispatch(listChucvu(response.data))
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
                  {data.map((items) => (
                    <tr key={items.id}>
                      <td>{items.id}</td>
                      <td>{items.tenChucVu}</td>
                      <td>{items.trangThai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Danh mục chức vụ</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormLabel htmlFor="inputEmail4">Email</CFormLabel>
              <CFormInput type="email" id="inputEmail4" />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputPassword4">Password</CFormLabel>
              <CFormInput type="password" id="inputPassword4" />
            </CCol>
            <CCol xs={12}>
              <CFormLabel htmlFor="inputAddress">Address</CFormLabel>
              <CFormInput id="inputAddress" placeholder="1234 Main St" />
            </CCol>
            <CCol xs={12}>
              <CFormLabel htmlFor="inputAddress2">Address 2</CFormLabel>
              <CFormInput id="inputAddress2" placeholder="Apartment, studio, or floor" />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputCity">City</CFormLabel>
              <CFormInput id="inputCity" />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="inputState">State</CFormLabel>
              <CFormSelect id="inputState">
                <option>Choose...</option>
                <option>...</option>
              </CFormSelect>
            </CCol>
            <CCol md={2}>
              <CFormLabel htmlFor="inputZip">Zip</CFormLabel>
              <CFormInput id="inputZip" />
            </CCol>
            <CCol xs={12}>
              <CFormCheck type="checkbox" id="gridCheck" label="Check me out" />
            </CCol>
            <CCol xs={12}>
              <CButton color="primary" type="submit">
                Sign in
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Chucvu
