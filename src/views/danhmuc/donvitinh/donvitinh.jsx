
import React, { useState, useEffect } from 'react'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
import { useDispatch, useSelector } from 'react-redux'
import { listDonvitinh } from './donvitinhSlice'
import { donvitinhService } from '../../../service/donvitinhService'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button'
import {  CCard,
    CCardBody,
    CCardHeader,
    CCol,
} from '@coreui/react'
 
ModuleRegistry.registerModules([AllCommunityModule])

const donvitinh = () => {
 
  const data = useSelector((state) => state.donvitinhs.data)
  const dispatch = useDispatch()
const  handleClick=()=>{
  alert("Thêm thành công")
}
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
 
  return (
    <>
<Button className='btn btn-primary small' small label='Thêm' onClick={handleClick}/>
        <CCol xs={12} >
        <CCard className='mb-4'>
        <CCardHeader>
            <strong>React Table</strong> <small>Hoverable rows</small>
          </CCardHeader>
          <CCardBody>
          <DataTable small rowHover  value={data} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}     
          >
                <Column field="id" header="ID" style={{ width: '25%' }}></Column>
                <Column filter filterPlaceholder="lọc theo tên" sortable field="tenDonViTinh" header="Đơn vị tính" style={{ width: '25%' }}></Column>
                <Column field="trangThai" header="Trạng thái" style={{ width: '25%' }}></Column>              
            </DataTable>
          </CCardBody>
        </CCard>        
    </CCol> 
  
      
    </>
  )
}

export default donvitinh
