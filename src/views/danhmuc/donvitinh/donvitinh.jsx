
import React, { useState, useEffect,useRef  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  readAllDonvitinhs,createDonvitinh } from './donvitinhSlice';
import { donvitinhService } from '../../../service/donvitinhService'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
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
    id: 0,
    tenDonViTinh: '',
    trangThai:true
};
 const data= useSelector((state) => state.donvitinhs.data)
  const dispatch = useDispatch()
  const [donvitinhs, setDonvitinhs] = useState(null);
  const [donvitinhDialog, setDonvitinhDialog] = useState(false);
  const [deleteDonvitinhDialog, setDeleteDonvitinhDialog] = useState(false);
  const [deleteDonvitinhsDialog, setDeleteDonvitinhsDialog] = useState(false);
  const [donvitinh, setDonvitinh] = useState(emptyDonvitinh);
  const [selectedDonvitinhs, setSelectedDonvitinhs] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [title,setTitle]=useState('')
  const toast = useRef(null);
  const dt = useRef(null);
// const onChangeHandler=(e)=>{
//   setDonvitinh({...donvitinh,[e.target.tenDonViTinh]:e.target.value})
// }

useEffect(() => {
  async function fetchData() {
    try {
      // const response = await donvitinhService.getDonvitinh()       
      dispatch(readAllDonvitinhs()) 
      setDonvitinhs(data)    
    } catch (error) {
      console.log(error)
    }
  }
  fetchData()
}, [])

  const editDonvitinh = () => {
    setTitle("Sửa đơn vị tính")
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
  toast.current.show({ severity: 'warn', summary: 'Thông báo', detail: `Xóa ID: ${donvitinh.id} thành công `, life: 3000 });
  console.log(donvitinh)
  setDeleteDonvitinhDialog(true);
};


  const actionBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2 " onClick={() => editDonvitinh()}/>
            <Button  icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteDonvitinh(rowData)} />
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

const onInputChange = (e, name) => {
  const val = (e.target && e.target.value) || '';
  let _donvitinh = { ...donvitinh };

  _donvitinh[`${name}`] = val;

  setDonvitinh(_donvitinh);
};


const onTrangthaiChange = (e) => {
  let _donvitinh = { ...donvitinh };

  _donvitinh[true] = e.value;
  setProduct(_donvitinh);
};

const leftToolbarTemplate = () => {
  return (
      <div className="flex flex-wrap gap-2">          
          <Button  label="Thêm" icon="pi pi-plus" severity="success" onClick={openNew} />
          <Button label="Xóa" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedDonvitinhs || !selectedDonvitinhs.length} />
      </div>
  );
};

const rightToolbarTemplate = () => {
  return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
};

const confirmDeleteSelected = () => {
  setDeleteDonvitinhsDialog(true);
};

const hideDialog = () => {
  setSubmitted(false);
  setDonvitinhDialog(false);
};

const donvitinhDialogFooter = (
  <React.Fragment>
      <Button className='mr-2' label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button  label="Save" icon="pi pi-check"  />
  </React.Fragment>
);

const saveDonvitinh = () => {
//   setSubmitted(true);
//   console.log(donvitinh)
//   if (donvitinh.tenDonViTinh.trim()) {
//     let _donvitinhs = [...donvitinhs];
//     let _donvitinh = { ...donvitinh };

//     if (donvitinh.id) {
//         const index = findIndexById(donvitinh.id);

//         _donvitinhs[index] = _donvitinh;
//         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Đơn vị tính Updated', life: 3000 });
//     } else {
//         _donvitinh.id = createId();
//         _donvitinhs.push(_donvitinh);
//         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Đơn vị tính Created', life: 3000 });
//     }

//     setDonvitinhs(_donvitinhs);
//     setDonvitinhtDialog(false);
//     setDonvitinh(emptyDonvitinh);
// }
 
};

const createId = () => {
  let id = '';
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return id;
};

const exportCSV = () => {
  dt.current.exportCSV();
};

const openNew = () => {
  setTitle("Thêm đơn vị tính")
  setDonvitinh(emptyDonvitinh);
  setSubmitted(false);
  setDonvitinhDialog(true);
};
const submitFormHandle=(e)=>{
  e.preventDefault();
  dispatch(createDonvitinh(donvitinh))
}

  return (
    <>
  <Toast ref={toast} />     
        <CCol xs={12} >
        <CCard className='mb-4'>
        <CCardHeader>
            <strong>React Table</strong> <small>Hoverable rows</small>
          </CCardHeader>
          <CCardBody>
          <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
          <DataTable stripedRows rowHover  size='small' value={data} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}     
          >
                <Column field="id" header="ID" style={{ width: '25%' }} ></Column>
                <Column filter filterPlaceholder="lọc theo tên" sortable field="tenDonViTinh" header="Đơn vị tính" style={{ width: '50%' }} ></Column>
                <Column field="trangThai" header="Trạng thái" body={statusBodyTemplate}  style={{ width: '25%' }} ></Column> 
                <Column field='hanhDong' header="Hành động" body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>             
            </DataTable>
          </CCardBody>
        </CCard>        
    </CCol> 

    <Dialog visible={donvitinhDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header={title} modal className="p-fluid" footer={donvitinhDialogFooter} onHide={hideDialog}>
               <form onSubmit={submitFormHandle}>
               <div className="field">
                    <label htmlFor="name" className="font-bold">
                       Id
                    </label>
                    <InputText  id="id" value={donvitinh.id} onChange={(e) => onInputChange(e, 'id')} required autoFocus />               
                </div>
                <div className="field">
                    <label htmlFor="tenDonViTinh" className="font-bold">
                        Tên đơn vị tính
                    </label>
                    <InputText id="tenDonViTinh" value={donvitinh.tenDonViTinh} onChange={(e) => onInputChange(e, 'tenDonViTinh')} required rows={3} cols={20} />
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Trạng thái</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="trangThai" value={donvitinh.trangThai} onChange={onTrangthaiChange} checked={donvitinh.trangThai === true} />
                            <label htmlFor="category1">Đang dùng</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="trangThai" value={donvitinh.trangThai} onChange={onTrangthaiChange} checked={donvitinh.trangThai === false} />
                            <label htmlFor="category1">Không dùng</label>
                        </div>
                        
                    </div>
                </div>

                <div className='flex justify-content-end'>
      <Button className='mr-2' label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button type='submit' label="Save" icon="pi pi-check"  />
  </div>
               </form>
                

                
            </Dialog>

  
      
    </>
  )
}

export default donvitinh
