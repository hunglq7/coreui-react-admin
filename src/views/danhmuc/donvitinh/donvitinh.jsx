
import React, { useState, useEffect,useRef  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listDonvitinh } from './donvitinhSlice'
import { donvitinhService } from '../../../service/donvitinhService'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';
import {  CCard,
    CCardBody,
    CCardHeader,
    CCol,
} from '@coreui/react'
import 'primeicons/primeicons.css';
// import { PrimeReactProvider } from 'primereact/api'
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
const donvitinh = () => {
  let emptyDonvitinh = {
    id: null,
    tenDonViTinh: '',
 trangThai:true
};
 const donvitinhs = useSelector((state) => state.donvitinhs.data)
  const dispatch = useDispatch()
  // const [donvitinhs, setDonvitinhs] = useState(null);
  const [donvitinhDialog, setDonvitinhDialog] = useState(false);
  const [deleteDonvitinhDialog, setDeleteDonvitinhDialog] = useState(false);
  const [deleteDonvitinhsDialog, setDeleteDonvitinhsDialog] = useState(false);
  const [donvitinh, setDonvitinh] = useState(emptyDonvitinh);
  const [selectedDonvitinhs, setSelectedDonvitinhs] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const editDonvitinh = () => {
    const dvt={
      id:111,
      tenDonViTinh:'Thêm mới',
      trangThai:true
    }
    donvitinhService.putDonvitinh(dvt)
    setDonvitinh({ ...donvitinh });
    toast.current.show({ severity: 'success', summary: 'Thông báo', detail: `Cập nhậ ID: ${donvitinh.id} thành công `, life: 3000 });
    console.log(donvitinh);
    setDonvitinhDialog(true);
};
const confirmDeleteDonvitinh = (donvitinh) => {
  setDonvitinh(donvitinh);
  toast.current.show({ severity: 'success', summary: 'Thông báo', detail: `Xóa ID: ${donvitinh.id} thành công `, life: 3000 });
  console.log(donvitinh)
  setDeleteDonvitinhDialog(true);
};


  const actionBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <Button  icon="pi pi-pencil" rounded outlined className="mr-2 " onClick={() => editDonvitinh()}/>
            <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteDonvitinh(rowData)} />
        </React.Fragment>
    );
};

 const statusBodyTemplate = (rowData) => {
  return <Tag value={rowData.trangThai?"Đang dùng":"Niêm cất"} severity={getSeverity(rowData)}></Tag>;
};

 const getSeverity = (donvitinh) => {
  switch (donvitinh.trangThai) {
      case true:
          return 'success';
      case false:
          return 'warning';
      default:
          return null;
  }
};


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
  }, [])
 
  return (
    <>
  <Toast ref={toast} />     
        <CCol xs={12} >
        <CCard className='mb-4'>
        <CCardHeader>
            <strong>React Table</strong> <small>Hoverable rows</small>
          </CCardHeader>
          <CCardBody>
          <DataTable stripedRows rowHover  size='small' value={donvitinhs} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}     
          >
                <Column field="id" header="ID" style={{ width: '25%' }}></Column>
                <Column filter filterPlaceholder="lọc theo tên" sortable field="tenDonViTinh" header="Đơn vị tính" style={{ width: '25%' }}></Column>
                <Column field="trangThai" header="Trạng thái" body={statusBodyTemplate}  style={{ width: '25%' }}></Column> 
                <Column field='hanhDong' header="Hành động" body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>             
            </DataTable>
          </CCardBody>
        </CCard>        
    </CCol> 
  
      
    </>
  )
}

export default donvitinh
