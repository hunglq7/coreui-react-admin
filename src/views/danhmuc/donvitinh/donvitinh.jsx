
import React, { useState, useEffect,useRef  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  readAllDonvitinhs,createDonvitinh, updateDonvitinh, deleteDonvitinh } from './donvitinhSlice';
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
import { InputSwitch } from "primereact/inputswitch";
import {  CCard,
    CCardBody,
    CCardHeader,
    CCol,
} from '@coreui/react'
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


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
  const [checked, setChecked] = useState(false);
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
}, [dispatch])

  const editDonvitinh = (donvitinh) => {
    setTitle("Sửa đơn vị tính")
   setDonvitinh({...donvitinh})
    setDonvitinhDialog(true);
};
// const confirmDeleteDonvitinh = (donvitinh) => {
//   setDonvitinh(donvitinh);
//   toast.current.show({ severity: 'warn', summary: 'Thông báo', detail: `Xóa ID: ${donvitinh.id} thành công `, life: 3000 });
//   console.log(donvitinh)
//   setDeleteDonvitinhDialog(true);
// };


  const actionBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2 " onClick={() => editDonvitinh(rowData)}/>
            <Button  icon="pi pi-trash" rounded outlined severity="danger" onClick={confirmDeleteDonvitinh(rowData)} />
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
  _donvitinh['trangThai'] = e.value;
  setDonvitinh(_donvitinh);
};

const leftToolbarTemplate = () => {
  return (
      <div className="flex flex-wrap gap-2">          
          <Button size='small'  label="Thêm" icon="pi pi-plus" severity="success" onClick={openNew} />
          <Button size='small' label="Xóa" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedDonvitinhs || !selectedDonvitinhs.length} />
      </div>
  );
};

const rightToolbarTemplate = () => {
  return <Button size='small' label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
};

const confirmDeleteSelected = () => {
  setDeleteDonvitinhsDialog(true);
};

const hideDialog = () => {
  setSubmitted(false);
  setDonvitinhDialog(false);
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
  const id=donvitinh.id
  if(id==0) {
    dispatch(createDonvitinh(donvitinh))
    setDonvitinh(emptyDonvitinh)
    toast.current.show({ severity: 'success', summary: 'Thông báo', detail: `Thêm bản ghi thành công `, life: 3000 });
  } else{
    dispatch(updateDonvitinh(donvitinh))
    toast.current.show({ severity: 'success', summary: 'Thông báo', detail: `Sửa bản gi ${donvitinh.id} thành công `, life: 3000 });
    setDonvitinhDialog(false)
  }
 
  fetchData()
}
const onDelete=(donvitinh)=>{
  dispatch(deleteDonvitinh(donvitinh))
  toast.current.show({ severity: 'success', summary: 'Thông báo', detail: `Xóa bản gi ${donvitinh.id} thành công `, life: 3000 });
    setDonvitinhDialog(false)
}
const hideDeleteDonvitinhDialog = () => {
  setDeleteDonvitinhDialog(false);
};

const deleteDonvitinhDialogFooter = (
  <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteDonvitinhDialog} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={onDelete} />
  </React.Fragment>
);

const confirmDeleteDonvitinh = (donvitinh) => {
  setDonvitinh(donvitinh);
  setDeleteDonvitinhDialog(true);
};

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

    <Dialog visible={donvitinhDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header={title} modal className="p-fluid"  onHide={hideDialog}>
               <form onSubmit={submitFormHandle}>
               <div className="field">
                    <label htmlFor="name" className="font-bold">
                       Id
                    </label>
                    <InputText disabled  id="id" value={donvitinh.id} onChange={(e) => onInputChange(e, 'id')} required autoFocus />               
                </div>
                <div className="field">
                    <label htmlFor="tenDonViTinh" className="font-bold">
                        Tên đơn vị tính
                    </label>
                    <InputText id="tenDonViTinh" value={donvitinh.tenDonViTinh} onChange={(e) => onInputChange(e, 'tenDonViTinh')} required rows={3} cols={20} />
                </div>

                <div className="field flex flex-wrap gap-2">
                    <label className="mb-3 font-bold">Trạng thái</label>
                    <InputSwitch checked={donvitinh.trangThai} onChange={onTrangthaiChange} />
                </div>                     
    
                <div className='row'>
                  <div className='col'>
                  </div>
                  <div className='col flex align-items-center justify-content-end'>
                  <Button size='small' className='mr-2' label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
                  <Button size='small' type='submit' label="Save" icon="pi pi-check"  />
                  </div>
                </div>
              
               </form>    

                
            </Dialog>

            <Dialog visible={deleteDonvitinhDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteDonvitinhDialogFooter} onHide={hideDeleteDonvitinhDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {donvitinh && (
                        <span>
                            Are you sure you want to delete <b>{donvitinh.tenDonvitinh}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

  
      
    </>
  )
}

export default donvitinh
