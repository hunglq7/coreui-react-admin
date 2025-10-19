import { AgGridReact } from 'ag-grid-react'
import React, { useState, useEffect } from 'react'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
import { useDispatch, useSelector } from 'react-redux'
import { listDonvitinh } from './donvitinhSlice'
import { donvitinhService } from '../../../service/donvitinhService'
import { useMemo } from 'react'
import {  CCard,
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
    CTableRow,} from '@coreui/react'
ModuleRegistry.registerModules([AllCommunityModule])

const donvitinh = () => {
  const data = useSelector((state) => state.donvitinhs.data)
  const dispatch = useDispatch()
  const [rowData, setRowData] = useState(data)
  console.log('data mới', data)
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: 'id', filter: true },
    {
      field: 'tenDonViTinh',
      headerName: 'Dơn vị tính',
      filter: true,
      floatingFilter: true,
      editable: true,      
    },
    { field: 'trangThai' },
  ])
  const pagination = true
  const paginationPageSize = 100
  const paginationPageSizeSelector = [10, 50, 100]
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await donvitinhService.getDonvitinh()       
        dispatch(listDonvitinh(response.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [dispatch])
  const rowSelection = useMemo(() => {
    return {
      mode: 'multiRow',
    }
  }, [])
  return (
    <>
    <CCol xs={12} >
        <CCard className='mb-4'>
        <CCardHeader>
            <strong>React Table</strong> <small>Hoverable rows</small>
          </CCardHeader>
          <CCardBody>
          <CTable hover>
                <CTableHead>
                  <CTableRow>                   
                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Đơn vị tính</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Trạng thái</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  
     {data.map((items)=>( 
        <CTableRow>
        <CTableDataCell>{items.id}</CTableDataCell>
        <CTableDataCell>{items.tenDonViTinh}</CTableDataCell>
        <CTableDataCell>{items.tranghai}</CTableDataCell>
        </CTableRow>
    )
     )}               
        </CTableBody>
              </CTable>
          </CCardBody>
        </CCard>
    </CCol>    
      <div style={{ height: 600 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          rowSelection={rowSelection}
          pagination={pagination}          
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </>
  )
}

export default donvitinh
